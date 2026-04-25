"use client";

import { AnimatePresence } from "framer-motion";
import { Task } from "@/types";
import { TaskCard } from "./TaskCard";

interface TaskFeedProps {
  tasks: Task[];
}

export function TaskFeed({ tasks }: TaskFeedProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        {/* Empty state illustration */}
        <div className="relative w-32 h-32 mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/20 to-cyan/20 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet/30 to-cyan/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">⚡</span>
          </div>
        </div>

        <h3 className="text-text-primary font-display font-semibold text-lg mb-2">
          All caught up!
        </h3>
        <p className="text-text-secondary text-sm max-w-[260px]">
          You&apos;ve completed all your tasks. Time to add new ones or take a well-deserved break.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
}
