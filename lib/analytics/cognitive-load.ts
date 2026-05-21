import prisma from "@/lib/prisma";

export type EnergyLevel = "high" | "medium" | "low";
export type FlowState = "deep-flow" | "flow" | "neutral" | "scattered" | "blocked";

export interface CognitiveLoadResult {
  score: number; // 0-100
  energyLevel: EnergyLevel;
  flowState: FlowState;
  flowStateScore: number; // 0-100
  fatigueIndicators: string[];
  recommendations: string[];
  optimalBreakDuration: number; // minutes
  nextOptimalTaskTime: string; // "morning" | "afternoon" | "evening"
  optimalTimes: { hour: number; avgTasks: number }[];
  currentFlowStreak: number; // consecutive hours in flow
  recommendedTaskTypes: string[]; // suggested based on energy
}

interface HourlyStats {
  hour: number;
  completedCount: number;
  totalMinutes: number;
}

export async function calculateCognitiveLoad(userId: string): Promise<CognitiveLoadResult> {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const currentHour = today.getHours();

  // Get today's analytics
  const todayAnalytics = await prisma.taskAnalytics.findMany({
    where: { userId, date: todayStr },
    orderBy: { hour: "asc" },
  });

  // Get last 7 days for pattern analysis
  const last7Days: HourlyStats[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const dayAnalytics = await prisma.taskAnalytics.findMany({
      where: { userId, date: dateStr },
    });
    last7Days.push(...dayAnalytics.map(a => ({
      hour: a.hour,
      completedCount: a.completedCount,
      totalMinutes: a.totalMinutes,
    })));
  }

  // Get streak data
  const streakData = await prisma.streakData.findUnique({
    where: { userId },
  });

  // Calculate metrics
  const tasksCompletedToday = todayAnalytics.reduce((sum, a) => sum + a.completedCount, 0);
  const avgTasksPerHour = last7Days.length > 0
    ? last7Days.reduce((sum, a) => sum + a.completedCount, 0) / Math.max(last7Days.filter(a => a.completedCount > 0).length, 1)
    : 0;

  // Recent completion rate (last 2 hours)
  const recentHours = todayAnalytics.filter(a => a.hour >= currentHour - 2);
  const recentCompletionRate = recentHours.reduce((sum, a) => sum + a.completedCount, 0);

  // Calculate cognitive load score
  let score = 100;
  const fatigueIndicators: string[] = [];
  const recommendations: string[] = [];

  // Factor 1: Recent vs average completion rate
  if (recentCompletionRate > avgTasksPerHour * 2) {
    score -= 20;
    fatigueIndicators.push("High recent activity - risk of burnout");
  }

  // Factor 2: Total tasks completed today
  if (tasksCompletedToday > 8) {
    score -= 15;
    fatigueIndicators.push("Completed many tasks today");
  } else if (tasksCompletedToday > 5) {
    score -= 8;
    fatigueIndicators.push("Moderate task load");
  }

  // Factor 3: Current hour - energy patterns
  if (currentHour >= 14 && currentHour <= 16) {
    // Afternoon slump
    score -= 10;
    fatigueIndicators.push("Afternoon energy dip detected");
    recommendations.push("Take a 15-minute break to reset");
  } else if (currentHour >= 20) {
    score -= 20;
    fatigueIndicators.push("Late in the day - cognitive decline expected");
    recommendations.push("Consider wrapping up for today");
  }

  // Factor 4: Streak pressure
  if (streakData && streakData.currentStreak >= 7) {
    score -= 10;
    fatigueIndicators.push("High streak pressure");
    recommendations.push("Remember: quality over quantity");
  }

  // Factor 5: No breaks taken
  const lastRest = await prisma.restSession.findFirst({
    where: { userId, endTime: { not: null } },
    orderBy: { endTime: "desc" },
  });

  if (lastRest) {
    const hoursSinceBreak = (today.getTime() - new Date(lastRest.endTime!).getTime()) / (1000 * 60 * 60);
    if (hoursSinceBreak > 3) {
      score -= 15;
      fatigueIndicators.push(`${Math.round(hoursSinceBreak)} hours since last break`);
      recommendations.push("Take a break to refresh your mind");
    }
  } else {
    // First session of the day
    if (tasksCompletedToday > 3) {
      score -= 5;
      recommendations.push("Consider a short break soon");
    }
  }

  // Factor 6: Declining completion rate
  if (todayAnalytics.length >= 3) {
    const recent = todayAnalytics.slice(-2).reduce((sum, a) => sum + a.completedCount, 0);
    const earlier = todayAnalytics.slice(0, Math.min(2, todayAnalytics.length)).reduce((sum, a) => sum + a.completedCount, 0);
    if (earlier > 0 && recent < earlier * 0.5) {
      score -= 15;
      fatigueIndicators.push("Declining completion rate");
      recommendations.push("Your focus is waning - take a break");
    }
  }

  // Ensure score bounds
  score = Math.max(0, Math.min(100, score));

  // Determine energy level
  let energyLevel: EnergyLevel = "high";
  if (score < 40) {
    energyLevel = "low";
  } else if (score < 70) {
    energyLevel = "medium";
  }

  // Calculate optimal break duration
  let optimalBreakDuration = 5;
  if (score < 40) {
    optimalBreakDuration = 20;
  } else if (score < 60) {
    optimalBreakDuration = 15;
  } else if (score < 80) {
    optimalBreakDuration = 10;
  }

  // Determine next optimal task time
  let nextOptimalTaskTime = "morning";
  if (currentHour >= 9 && currentHour < 12) {
    nextOptimalTaskTime = "afternoon";
  } else if (currentHour >= 13 && currentHour < 17) {
    nextOptimalTaskTime = "evening";
  } else if (currentHour >= 17) {
    nextOptimalTaskTime = "tomorrow morning";
  }

  // Calculate optimal task times
  const optimalTimes = await getOptimalTaskTimes(userId);

  // Detect flow state
  const flowStateScore = calculateFlowStateScore(todayAnalytics, recentCompletionRate, avgTasksPerHour);
  const flowState = getFlowStateFromScore(flowStateScore);
  const currentFlowStreak = calculateFlowStreak(todayAnalytics);

  // Determine recommended task types based on energy
  const recommendedTaskTypes = getRecommendedTaskTypes(energyLevel, flowState);

  // Default recommendations if none generated
  if (recommendations.length === 0) {
    if (energyLevel === "high") {
      if (flowState === "deep-flow" || flowState === "flow") {
        recommendations.push("You're in the zone! Keep up the great work.");
      } else {
        recommendations.push("Great energy! Tackle your most important tasks now.");
      }
    } else if (energyLevel === "medium") {
      recommendations.push("Good progress. Consider a short break soon.");
    } else {
      recommendations.push("Time for a break - you've earned it!");
    }
  }

  return {
    score,
    energyLevel,
    flowState,
    flowStateScore,
    fatigueIndicators,
    recommendations,
    optimalBreakDuration,
    nextOptimalTaskTime,
    optimalTimes: optimalTimes.slice(0, 5),
    currentFlowStreak,
    recommendedTaskTypes,
  };
}

function calculateFlowStateScore(
  todayAnalytics: Awaited<ReturnType<typeof prisma.taskAnalytics.findMany>>,
  recentCompletionRate: number,
  avgTasksPerHour: number
): number {
  if (todayAnalytics.length === 0) return 50;

  // Score based on recent completion rate vs average
  let score = 50;

  if (recentCompletionRate >= avgTasksPerHour * 1.5) {
    score += 30; // Well above average
  } else if (recentCompletionRate >= avgTasksPerHour) {
    score += 15; // At or above average
  } else if (recentCompletionRate > 0) {
    score -= 10; // Below average
  } else {
    score -= 20; // No recent completions
  }

  // Check for consistency (all hours with similar output)
  const hoursWithCompletions = todayAnalytics.filter(a => a.completedCount > 0);
  if (hoursWithCompletions.length >= 2) {
    const avgCompletion = hoursWithCompletions.reduce((sum, a) => sum + a.completedCount, 0) / hoursWithCompletions.length;
    const variance = hoursWithCompletions.reduce((sum, a) => sum + Math.pow(a.completedCount - avgCompletion, 2), 0) / hoursWithCompletions.length;
    const cv = Math.sqrt(variance) / avgCompletion; // Coefficient of variation

    if (cv < 0.3) {
      score += 15; // Consistent output = flow
    } else if (cv > 0.8) {
      score -= 10; // Inconsistent = scattered
    }
  }

  // Time since last task matters
  const lastHourWithTask = todayAnalytics.filter(a => a.completedCount > 0).pop();
  if (lastHourWithTask) {
    const currentHour = new Date().getHours();
    const hoursSinceLastTask = currentHour - lastHourWithTask.hour;
    if (hoursSinceLastTask > 2) {
      score -= 15;
    } else if (hoursSinceLastTask <= 1) {
      score += 10;
    }
  }

  return Math.max(0, Math.min(100, score));
}

function getFlowStateFromScore(score: number): FlowState {
  if (score >= 80) return "deep-flow";
  if (score >= 60) return "flow";
  if (score >= 40) return "neutral";
  if (score >= 20) return "scattered";
  return "blocked";
}

function calculateFlowStreak(
  todayAnalytics: Awaited<ReturnType<typeof prisma.taskAnalytics.findMany>>
): number {
  // Count consecutive hours with task completions at or above average
  const hoursWithTasks = todayAnalytics
    .filter(a => a.completedCount > 0)
    .sort((a, b) => b.hour - a.hour); // Sort descending by hour

  if (hoursWithTasks.length === 0) return 0;

  let streak = 0;
  let currentHour = new Date().getHours();

  for (const hourData of hoursWithTasks) {
    if (hourData.hour >= currentHour - 1) {
      // Within the last 2 hours, count as continuing streak
      if (hourData.completedCount >= 2) {
        streak++;
      }
    } else {
      break;
    }
  }

  return streak;
}

function getRecommendedTaskTypes(
  energyLevel: EnergyLevel,
  flowState: FlowState
): string[] {
  if (flowState === "deep-flow" || (energyLevel === "high" && flowState === "flow")) {
    return ["deep-work", "creative", "complex"];
  }
  if (energyLevel === "high" || flowState === "flow") {
    return ["deep-work", "quick-win", "admin"];
  }
  if (energyLevel === "medium" || flowState === "neutral") {
    return ["quick-win", "admin", "meeting"];
  }
  return ["quick-win", "routine"];
}

export async function trackTaskCompletion(
  userId: string,
  estimatedMinutes: number
): Promise<void> {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const hour = now.getHours();

  // Upsert hourly analytics
  await prisma.taskAnalytics.upsert({
    where: {
      userId_date_hour: { userId, date: dateStr, hour },
    },
    update: {
      completedCount: { increment: 1 },
      totalMinutes: { increment: estimatedMinutes },
    },
    create: {
      userId,
      date: dateStr,
      hour,
      completedCount: 1,
      totalMinutes: estimatedMinutes,
    },
  });
}

export async function startRestSession(userId: string, reason: string = "manual"): Promise<string> {
  const session = await prisma.restSession.create({
    data: {
      userId,
      startTime: new Date(),
      reason,
    },
  });
  return session.id;
}

export async function endRestSession(sessionId: string): Promise<number> {
  const endTime = new Date();
  const session = await prisma.restSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) return 0;

  const duration = Math.round((endTime.getTime() - new Date(session.startTime).getTime()) / (1000 * 60));

  await prisma.restSession.update({
    where: { id: sessionId },
    data: {
      endTime,
      duration,
    },
  });

  return duration;
}

export async function getOptimalTaskTimes(userId: string): Promise<{ hour: number; avgTasks: number }[]> {
  // Get last 7 days of hourly data
  const today = new Date();
  const results: { hour: number; avgTasks: number }[] = [];

  for (let hour = 8; hour <= 20; hour++) {
    let totalTasks = 0;
    let daysWithData = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const analytics = await prisma.taskAnalytics.findUnique({
        where: {
          userId_date_hour: { userId, date: dateStr, hour },
        },
      });

      if (analytics && analytics.completedCount > 0) {
        totalTasks += analytics.completedCount;
        daysWithData++;
      }
    }

    results.push({
      hour,
      avgTasks: daysWithData > 0 ? totalTasks / daysWithData : 0,
    });
  }

  return results.sort((a, b) => b.avgTasks - a.avgTasks);
}
