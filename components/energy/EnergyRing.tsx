"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnergyRingProps {
  score: number; // 0-100
  className?: string;
}

export function EnergyRing({ score, className }: EnergyRingProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 70) return "#10b981"; // emerald
    if (score >= 40) return "#f59e0b"; // amber
    return "#ef4444"; // rose
  };

  const getLabel = () => {
    if (score >= 70) return "Energized";
    if (score >= 40) return "Moderate";
    return "Fatigued";
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg className="w-32 h-32 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-border-subtle"
        />
        {/* Progress circle */}
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1"
        >
          <Zap
            className="w-5 h-5"
            style={{ color: getColor() }}
          />
          <span
            className="text-2xl font-bold font-mono"
            style={{ color: getColor() }}
          >
            {score}
          </span>
        </motion.div>
        <span className="text-xs text-text-tertiary mt-1">
          {getLabel()}
        </span>
      </div>
    </div>
  );
}
