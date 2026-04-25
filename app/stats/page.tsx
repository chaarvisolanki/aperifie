"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Flame, Target, Zap, Calendar } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { FocusScoreCard } from "@/components/stats/FocusScoreCard";
import { ProductivityChart } from "@/components/stats/ProductivityChart";
import { useTaskStore } from "@/hooks/useTaskStore";
import { cn } from "@/lib/utils";

export default function StatsPage() {
  const { tasks, user, streakData } = useTaskStore();
  const completedTasks = tasks.filter((t) => t.completed);
  const incompleteTasks = tasks.filter((t) => !t.completed);

  // Calculate category breakdown
  const categoryMap = new Map<string, number>();
  completedTasks.forEach((t) => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + 1);
  });
  const categoryBreakdown = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count, percentage: Math.round((count / completedTasks.length) * 100) || 0 }))
    .sort((a, b) => b.count - a.count);

  const statCards = [
    {
      label: "Tasks Completed",
      value: completedTasks.length,
      subtext: `of ${tasks.length} total`,
      icon: Target,
      color: "emerald",
      bgColor: "bg-emerald/10",
    },
    {
      label: "Current Streak",
      value: `${user?.streak || 0}`,
      subtext: "days",
      icon: Flame,
      color: "amber",
      bgColor: "bg-amber/10",
    },
    {
      label: "Longest Streak",
      value: `${streakData?.longest || 0}`,
      subtext: "days",
      icon: TrendingUp,
      color: "violet",
      bgColor: "bg-violet/10",
    },
    {
      label: "Focus Score",
      value: user?.focusScore ?? 0,
      subtext: "out of 100",
      icon: Zap,
      color: "cyan",
      bgColor: "bg-cyan/10",
    },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <TopBar />

      <div className="max-w-lg mx-auto px-4 pt-4 lg:pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-violet" />
            <span className="text-text-secondary text-sm font-medium">Analytics</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary">
            Your Stats
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Track your productivity journey
          </p>
        </motion.div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-2xl p-4 bg-surface border border-border-subtle",
                  "hover:border-border-default transition-colors"
                )}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bgColor)}>
                  <Icon className={cn("w-5 h-5", `text-${stat.color}`)} />
                </div>
                <p className="font-mono text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
                <p className="text-[10px] text-text-tertiary">{stat.subtext}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Focus Score */}
        <FocusScoreCard score={user?.focusScore ?? 0} className="mb-6" />

        {/* Productivity Chart */}
        <ProductivityChart history={streakData?.history ?? []} className="mb-6" />

        {/* Category breakdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-5 bg-surface border border-border-subtle"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-text-secondary" />
            <span className="text-text-secondary text-sm font-medium">Category Breakdown</span>
          </div>

          {categoryBreakdown.length > 0 ? (
            <div className="space-y-3">
              {categoryBreakdown.map((cat, index) => {
                const emojis: Record<string, string> = {
                  Work: "💼", Study: "📚", Health: "💪", Personal: "✨",
                  Creative: "🎨", Finance: "💰", Social: "👥",
                };
                return (
                  <div key={cat.name} className="flex items-center gap-3">
                    <span className="text-lg">{emojis[cat.name] || "📌"}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-text-primary font-medium">{cat.name}</span>
                        <span className="text-xs text-text-tertiary">{cat.count} tasks</span>
                      </div>
                      <div className="h-2 bg-elevated rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.percentage}%` }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-violet to-cyan rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-text-tertiary text-sm text-center py-4">
              Complete tasks to see your category breakdown
            </p>
          )}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
