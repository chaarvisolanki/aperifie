"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  Calendar,
  Tag,
  Brain,
  Coffee,
  Zap,
  FileText,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Priority, FlowTag } from "@/types";
import { useTaskStore } from "@/hooks/useTaskStore";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: "Work", emoji: "💼" },
  { value: "Study", emoji: "📚" },
  { value: "Health", emoji: "💪" },
  { value: "Personal", emoji: "✨" },
  { value: "Creative", emoji: "🎨" },
  { value: "Finance", emoji: "💰" },
  { value: "Social", emoji: "👥" },
];

const priorities: { value: Priority; label: string; color: string; icon: typeof Zap }[] = [
  { value: "urgent", label: "Urgent", color: "rose", icon: Zap },
  { value: "high", label: "High", color: "violet", icon: Zap },
  { value: "medium", label: "Medium", color: "cyan", icon: Brain },
  { value: "low", label: "Low", color: "emerald", icon: Coffee },
];

const flowTags: { value: FlowTag; label: string; emoji: string }[] = [
  { value: "deep-work", label: "Deep Work", emoji: "🧠" },
  { value: "quick-win", label: "Quick Win", emoji: "⚡" },
  { value: "admin", label: "Admin", emoji: "📋" },
  { value: "creative", label: "Creative", emoji: "🎨" },
];

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState("Work");
  const [flowTag, setFlowTag] = useState<FlowTag | undefined>(undefined);
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
      flowTag,
      estimatedMinutes,
      deadline: hasDeadline && deadline ? new Date(deadline) : undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCategory("Work");
    setFlowTag(undefined);
    setEstimatedMinutes(30);
    setHasDeadline(false);
    setDeadline("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 bottom-20 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-md z-50"
          >
            <div className="bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet" />
                  <h2 className="font-display font-semibold text-text-primary">
                    New Focus Task
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-bg-hover flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Title */}
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What do you want to focus on?"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-elevated border border-border-subtle",
                      "text-text-primary placeholder:text-text-tertiary text-sm",
                      "focus:outline-none focus:border-violet transition-colors"
                    )}
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details (optional)"
                    rows={2}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-elevated border border-border-subtle",
                      "text-text-primary placeholder:text-text-tertiary text-sm resize-none",
                      "focus:outline-none focus:border-violet transition-colors"
                    )}
                  />
                </div>

                {/* Priority selector */}
                <div>
                  <label className="text-xs text-text-tertiary font-medium mb-2 block">
                    Priority
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {priorities.map((p) => {
                      const Icon = p.icon;
                      const isSelected = priority === p.value;
                      return (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setPriority(p.value)}
                          className={cn(
                            "flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-all text-xs font-medium",
                            isSelected
                              ? `bg-${p.color}/20 border-${p.color} text-${p.color}`
                              : "bg-elevated border-border-subtle text-text-secondary hover:border-border-default"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category selector */}
                <div>
                  <label className="text-xs text-text-tertiary font-medium mb-2 block">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => {
                      const isSelected = category === c.value;
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setCategory(c.value)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all text-xs font-medium",
                            isSelected
                              ? "bg-violet/20 border-violet text-violet"
                              : "bg-elevated border-border-subtle text-text-secondary hover:border-border-default"
                          )}
                        >
                          <span>{c.emoji}</span>
                          <span>{c.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Flow tag */}
                <div>
                  <label className="text-xs text-text-tertiary font-medium mb-2 block">
                    Flow Type (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {flowTags.map((f) => {
                      const isSelected = flowTag === f.value;
                      return (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => setFlowTag(isSelected ? undefined : f.value)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all text-xs font-medium",
                            isSelected
                              ? "bg-cyan/20 border-cyan text-cyan"
                              : "bg-elevated border-border-subtle text-text-secondary hover:border-border-default"
                          )}
                        >
                          <span>{f.emoji}</span>
                          <span>{f.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time estimate */}
                <div>
                  <label className="text-xs text-text-tertiary font-medium mb-2 block">
                    Estimated Time
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="5"
                      max="180"
                      step="5"
                      value={estimatedMinutes}
                      onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                      className="flex-1 accent-violet"
                    />
                    <span className="font-mono text-sm text-text-primary w-14 text-right">
                      {estimatedMinutes}m
                    </span>
                  </div>
                </div>

                {/* Deadline toggle */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setHasDeadline(!hasDeadline)}
                      className={cn(
                        "w-10 h-6 rounded-full transition-colors relative",
                        hasDeadline ? "bg-violet" : "bg-elevated border border-border-subtle"
                      )}
                    >
                      <motion.div
                        animate={{ x: hasDeadline ? 16 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                      />
                    </div>
                    <span className="text-sm text-text-secondary">Set deadline</span>
                  </label>

                  <AnimatePresence>
                    {hasDeadline && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <input
                          type="datetime-local"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                          className={cn(
                            "w-full mt-3 px-4 py-3 rounded-xl bg-elevated border border-border-subtle",
                            "text-text-primary text-sm",
                            "focus:outline-none focus:border-violet transition-colors"
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={!title.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-3.5 rounded-xl font-semibold text-sm transition-all",
                    title.trim()
                      ? "bg-gradient-to-r from-violet to-cyan text-white shadow-glow-violet"
                      : "bg-elevated text-text-tertiary cursor-not-allowed"
                  )}
                >
                  Add to Focus Feed
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
