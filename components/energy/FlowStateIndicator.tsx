"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowStateIndicatorProps {
  flowState: 'deep-flow' | 'flow' | 'neutral' | 'scattered' | 'blocked';
  flowStateScore: number;
  currentFlowStreak: number;
  className?: string;
}

export function FlowStateIndicator({
  flowState,
  flowStateScore,
  currentFlowStreak,
  className,
}: FlowStateIndicatorProps) {
  const getConfig = () => {
    switch (flowState) {
      case "deep-flow":
        return {
          icon: Sparkles,
          label: "Deep Flow",
          color: "text-emerald",
          bgColor: "bg-emerald/20",
          borderColor: "border-emerald/30",
          description: "You're in the zone!",
        };
      case "flow":
        return {
          icon: Sparkles,
          label: "In Flow",
          color: "text-cyan",
          bgColor: "bg-cyan/20",
          borderColor: "border-cyan/30",
          description: "Great momentum",
        };
      case "neutral":
        return {
          icon: Brain,
          label: "Neutral",
          color: "text-amber",
          bgColor: "bg-amber/20",
          borderColor: "border-amber/30",
          description: " Steady pace",
        };
      case "scattered":
        return {
          icon: Zap,
          label: "Scattered",
          color: "text-orange-500",
          bgColor: "bg-orange-500/20",
          borderColor: "border-orange-500/30",
          description: "Focus fading",
        };
      case "blocked":
        return {
          icon: AlertTriangle,
          label: "Blocked",
          color: "text-rose",
          bgColor: "bg-rose/20",
          borderColor: "border-rose/30",
          description: "Take a break",
        };
      default:
        return {
          icon: Brain,
          label: "Unknown",
          color: "text-text-tertiary",
          bgColor: "bg-surface",
          borderColor: "border-border-subtle",
          description: "",
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-2xl border",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.bgColor)}>
        <Icon className={cn("w-5 h-5", config.color)} />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-semibold", config.color)}>
            {config.label}
          </p>
          <span className="text-xs text-text-tertiary font-mono">
            {flowStateScore}%
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-0.5">
          {config.description}
          {currentFlowStreak > 0 && (
            <span className="ml-1 text-emerald">
              • {currentFlowStreak}h streak
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
