"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FocusScoreCardProps {
  score: number;
  className?: string;
}

export function FocusScoreCard({ score, className }: FocusScoreCardProps) {
  const isGood = score >= 75;
  const isWarning = score >= 50 && score < 75;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 bg-surface border border-border-subtle",
        className
      )}
    >
      {/* Glow effect for high scores */}
      {isGood && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-transparent pointer-events-none" />
      )}

      <div className="relative flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className={cn("w-4 h-4", isGood ? "text-emerald" : isWarning ? "text-amber" : "text-rose")} />
            <span className="text-text-secondary text-sm font-medium">
              Focus Score
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-4xl font-bold text-text-primary"
            >
              {score}
            </motion.span>
            <span className="text-text-tertiary text-sm">/ 100</span>
          </div>

          <div className={cn(
            "flex items-center gap-1 mt-2 text-sm",
            isGood ? "text-emerald" : isWarning ? "text-amber" : "text-rose"
          )}>
            {isGood ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">
              {isGood ? "+8% from yesterday" : isWarning ? "-3% from yesterday" : "-15% from yesterday"}
            </span>
          </div>
        </div>

        {/* Circular progress */}
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-border-default"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className={cn(
                isGood ? "text-emerald" : isWarning ? "text-amber" : "text-rose"
              )}
              initial={{ strokeDasharray: "0 264" }}
              animate={{ strokeDasharray: `${(score / 100) * 264} 264` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              style={{
                filter: isGood ? "drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))" : "none",
              }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn(
              "text-2xl font-bold",
              isGood ? "text-emerald" : isWarning ? "text-amber" : "text-rose"
            )}>
              {score >= 75 ? "🔥" : score >= 50 ? "⚡" : "💤"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
