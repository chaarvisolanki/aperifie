"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface HistoryEntry {
  date: string;
  completed: number;
}

interface ProductivityChartProps {
  history: HistoryEntry[];
  className?: string;
}

export function ProductivityChart({ history, className }: ProductivityChartProps) {
  // Ensure we have at least 7 days of data
  const last7Days = getLast7Days(history);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className={className}
    >
      <div className="rounded-2xl p-5 bg-surface border border-border-subtle">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-text-secondary" />
            <span className="text-text-secondary text-sm font-medium">
              Weekly Activity
            </span>
          </div>
          <span className="text-xs text-text-tertiary">
            Last 7 days
          </span>
        </div>

        {/* Chart */}
        <div className="flex items-end justify-between gap-2 h-24">
          {last7Days.map((day, index) => {
            const height = day.completed > 0 ? Math.max((day.completed / Math.max(...last7Days.map(d => d.completed), 1)) * 100, 20) : 10;
            const dayLabel = new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
            });

            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                {/* Bar */}
                <div className="relative w-full h-full flex items-end justify-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.6 + index * 0.1,
                    }}
                    className="w-full max-w-[32px] rounded-lg bg-gradient-to-t from-violet/80 to-violet relative overflow-hidden"
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                  </motion.div>
                </div>

                {/* Label */}
                <span className="text-[10px] text-text-tertiary font-medium">
                  {dayLabel}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
          <div>
            <p className="text-text-tertiary text-xs">Total completed</p>
            <p className="text-text-primary font-mono font-bold text-lg">
              {last7Days.reduce((sum, h) => sum + h.completed, 0)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-text-tertiary text-xs">Daily average</p>
            <p className="text-text-primary font-mono font-bold text-lg">
              {Math.round(last7Days.reduce((sum, h) => sum + h.completed, 0) / Math.max(last7Days.length, 1))}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getLast7Days(history: HistoryEntry[]): HistoryEntry[] {
  const days: HistoryEntry[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const found = history.find(h => h.date === dateStr);
    days.push(found || { date: dateStr, completed: 0 });
  }

  return days;
}
