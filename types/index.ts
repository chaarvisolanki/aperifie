export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type FlowTag = 'deep-work' | 'quick-win' | 'admin' | 'creative';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category: string;
  deadline?: Date;
  estimatedMinutes?: number;
  completed: boolean;
  snoozedUntil?: Date;
  createdAt: Date;
  completedAt?: Date;
  flowTag?: FlowTag;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  streak: number;
  longestStreak: number;
  freezesAvailable: number;
  focusScore: number;
  preferences: {
    soundEnabled: boolean;
    hapticsEnabled: boolean;
    aiCoachEnabled: boolean;
  };
}

export interface StreakData {
  current: number;
  longest: number;
  history: { date: string; completed: number }[];
  freezesAvailable: number;
}

export interface AICoachMessage {
  id: string;
  text: string;
  timestamp: Date;
  type: 'encouragement' | 'warning' | 'celebration' | 'tip' | 'procrastination';
}

export interface CelebrationState {
  isActive: boolean;
  type: 'completion' | 'streak-milestone' | 'daily-goal';
  taskId?: string;
}

export interface ProductivityStats {
  focusScore: number;
  tasksCompleted: number;
  totalFocusMinutes: number;
  currentStreak: number;
  weekOverWeekChange: number;
  categoryBreakdown: { category: string; count: number; percentage: number }[];
}
