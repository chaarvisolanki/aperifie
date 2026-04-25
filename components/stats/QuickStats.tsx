"use client";

import { motion } from "framer-motion";
import { Check, Clock, TrendingUp, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStatsProps {
  streak?: number;
  focusScore?: number;
  className?: string;
}

export function QuickStats({ streak = 0, focusScore = 0, className }: QuickStatsProps) {
  const stats = [
    {
      label: "Streak",
      value: streak.toString(),
      subtext: "days🔥",
      icon: Flame,
      color: "text-amber",
      bgColor: "bg-amber/10",
    },
    {
      label: "Focus Time",
      value: "4.2h",
      subtext: "today",
      icon: Clock,
      color: "text-cyan",
      bgColor: "bg-cyan/10",
    },
    {
      label: "Flow Score",
      value: focusScore.toString(),
      subtext: "+12%",
      icon: TrendingUp,
      color: "text-violet",
      bgColor: "bg-violet/10",
    },
  ];

  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={cn(
              "relative overflow-hidden rounded-2xl p-3 bg-surface border border-border-subtle",
              "hover:border-border-default transition-colors"
            )}
          >
            {/* Background icon */}
            <div
              className={cn(
                "absolute -right-2 -bottom-2 w-16 h-16 opacity-5 rounded-full",
                stat.bgColor
              )}
            >
              <Icon className="w-full h-full" />
            </div>

            <div className="relative">
              <div
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center mb-2",
                  stat.bgColor
                )}
              >
                <Icon className={cn("w-4 h-4", stat.color)} />
              </div>

              <div className="font-mono font-bold text-xl text-text-primary">
                {stat.value}
              </div>
              <div className="text-[10px] text-text-tertiary font-medium">
                {stat.label}
              </div>
              <div className="text-[10px] text-text-tertiary mt-0.5">
                {stat.subtext}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
