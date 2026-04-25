"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  Check,
  X,
  Flame,
  Zap,
  Brain,
  Coffee,
  ChevronRight,
} from "lucide-react";
import { Task, Priority } from "@/types";
import { cn, formatRelativeTime, getCategoryEmoji } from "@/lib/utils";
import { useTaskStore } from "@/hooks/useTaskStore";
import { fireCelebration } from "@/lib/confetti";

interface TaskCardProps {
  task: Task;
  index: number;
}

const priorityConfig: Record<
  Priority,
  { color: string; bgColor: string; borderColor: string; label: string; icon: typeof Zap }
> = {
  urgent: {
    color: "text-rose",
    bgColor: "bg-rose/10",
    borderColor: "border-l-rose",
    label: "Urgent",
    icon: Flame,
  },
  high: {
    color: "text-violet",
    bgColor: "bg-violet/10",
    borderColor: "border-l-violet",
    label: "High",
    icon: Zap,
  },
  medium: {
    color: "text-cyan",
    bgColor: "bg-cyan/10",
    borderColor: "border-l-cyan",
    label: "Medium",
    icon: Brain,
  },
  low: {
    color: "text-emerald",
    bgColor: "bg-emerald/10",
    borderColor: "border-l-emerald",
    label: "Low",
    icon: Coffee,
  },
};

const flowTagConfig: Record<string, { emoji: string; label: string }> = {
  "deep-work": { emoji: "🧠", label: "Deep Work" },
  "quick-win": { emoji: "⚡", label: "Quick Win" },
  admin: { emoji: "📋", label: "Admin" },
  creative: { emoji: "🎨", label: "Creative" },
};

export function TaskCard({ task, index }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSnoozeMenu, setShowSnoozeMenu] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { completeTask, snoozeTask, deleteTask } = useTaskStore();

  // Motion values for swipe
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
  const scale = useTransform(x, [-100, 0, 100], [0.8, 1, 0.8]);
  const completeOpacity = useTransform(x, [0, 50, 100], [0, 0, 1]);
  const snoozeOpacity = useTransform(x, [-100, -50, 0], [1, 0, 0]);

  const config = priorityConfig[task.priority];
  const flowTag = task.flowTag ? flowTagConfig[task.flowTag] : null;
  const PriorityIcon = config.icon;

  const handleComplete = () => {
    fireCelebration();
    completeTask(task.id);
  };

  const handleSnooze = (duration: "1h" | "1d" | "tomorrow") => {
    snoozeTask(task.id, duration);
    setShowSnoozeMenu(false);
  };

  return (
    <motion.div
      ref={constraintsRef}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.06,
      }}
      style={{ x, opacity }}
      className="relative"
    >
      {/* Drag constraints */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 120 }}
        dragElastic={0.7}
        onDragEnd={(_, info) => {
          if (info.offset.x > 100) {
            handleComplete();
          } else if (info.offset.x < -100) {
            setShowSnoozeMenu(true);
          }
        }}
        style={{ x, cursor: "grab" }}
        whileTap={{ cursor: "grabbing" }}
        className="touch-none"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-surface border border-border-subtle",
            "transition-colors hover:border-border-default",
            "border-l-4",
            config.borderColor
          )}
        >
          {/* Complete indicator (right swipe) */}
          <motion.div
            className="absolute inset-y-0 right-0 w-24 bg-emerald/20 flex items-center justify-center"
            style={{ opacity: completeOpacity }}
          >
            <Check className="w-8 h-8 text-emerald" />
          </motion.div>

          {/* Snooze indicator (left swipe) */}
          <motion.div
            className="absolute inset-y-0 left-0 w-24 bg-amber/20 flex items-center justify-center"
            style={{ opacity: snoozeOpacity }}
          >
            <Clock className="w-8 h-8 text-amber" />
          </motion.div>

          {/* Card content */}
          <div className="relative p-4">
            {/* Header row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* Priority badge */}
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
                    config.bgColor,
                    config.color
                  )}
                >
                  <PriorityIcon className="w-3 h-3" />
                  <span>{config.label}</span>
                </div>

                {/* Flow tag */}
                {flowTag && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-surface border border-border-subtle text-text-secondary">
                    <span>{flowTag.emoji}</span>
                    <span>{flowTag.label}</span>
                  </div>
                )}
              </div>

              {/* Category emoji */}
              <span className="text-lg">
                {getCategoryEmoji(task.category)}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-text-primary font-semibold text-base mb-1 leading-tight">
              {task.title}
            </h3>

            {/* Description (if expanded) */}
            <AnimatePresence>
              {isExpanded && task.description && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-text-secondary text-sm mb-3 overflow-hidden"
                >
                  {task.description}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Meta row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Deadline */}
                {task.deadline && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs",
                      new Date(task.deadline).getTime() - Date.now() < 2 * 60 * 60 * 1000
                        ? "text-rose"
                        : "text-text-tertiary"
                    )}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{formatRelativeTime(new Date(task.deadline))}</span>
                  </div>
                )}

                {/* Estimated time */}
                {task.estimatedMinutes && (
                  <div className="flex items-center gap-1 text-xs text-text-tertiary">
                    <Calendar className="w-3 h-3" />
                    <span>{task.estimatedMinutes}m</span>
                  </div>
                )}
              </div>

              {/* Expand button */}
              {task.description && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-xs text-violet hover:text-violet/80 transition-colors"
                >
                  {isExpanded ? "Less" : "More"}
                  <ChevronRight
                    className={cn(
                      "w-3 h-3 transition-transform",
                      isExpanded && "rotate-90"
                    )}
                  />
                </button>
              )}
            </div>

            {/* Action buttons (shown when expanded) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 mt-4 pt-4 border-t border-border-subtle"
                >
                  {/* Quick complete */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleComplete}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl",
                      "bg-emerald/20 hover:bg-emerald/30 text-emerald font-medium text-sm",
                      "transition-colors"
                    )}
                  >
                    <Check className="w-4 h-4" />
                    Complete
                  </motion.button>

                  {/* Snooze */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSnoozeMenu(!showSnoozeMenu)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl",
                      "bg-amber/20 hover:bg-amber/30 text-amber font-medium text-sm",
                      "transition-colors"
                    )}
                  >
                    <Clock className="w-4 h-4" />
                    Snooze
                  </motion.button>

                  {/* Delete */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => deleteTask(task.id)}
                    className={cn(
                      "w-10 flex items-center justify-center py-2.5 rounded-xl",
                      "bg-rose/10 hover:bg-rose/20 text-rose",
                      "transition-colors"
                    )}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Snooze menu */}
            <AnimatePresence>
              {showSnoozeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute left-4 right-4 top-full mt-2 p-3 bg-elevated border border-border-default rounded-xl z-20 shadow-xl"
                >
                  <p className="text-xs text-text-tertiary mb-2 font-medium">
                    Snooze until...
                  </p>
                  <div className="flex gap-2">
                    {[
                      { label: "1 hour", value: "1h" as const },
                      { label: "Tomorrow", value: "tomorrow" as const },
                      { label: "1 day", value: "1d" as const },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSnooze(option.value)}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-lg text-xs font-medium",
                          "bg-surface hover:bg-bg-hover text-text-secondary",
                          "transition-colors"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowSnoozeMenu(false)}
                    className="w-full mt-2 py-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Swipe hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-text-tertiary"
          >
            ← snooze • complete →
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
