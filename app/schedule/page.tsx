"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { useTaskStore } from "@/hooks/useTaskStore";
import { cn } from "@/lib/utils";

const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SchedulePage() {
  const { tasks } = useTaskStore();

  // Group tasks by deadline day (simplified)
  const today = new Date();
  const getDayIndex = (date: Date) => {
    const d = new Date(date);
    return (d.getDay() + 6) % 7; // Monday = 0
  };

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
            <Calendar className="w-5 h-5 text-violet" />
            <span className="text-text-secondary text-sm font-medium">Schedule</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary">
            Weekly Overview
          </h1>
        </motion.div>

        {/* Week navigation */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </motion.button>

          <div className="text-center">
            <p className="text-text-primary font-semibold">April 2026</p>
            <p className="text-xs text-text-tertiary">Week 17</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </motion.button>
        </div>

        {/* Week view */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map((day, index) => {
            const isToday = index === (today.getDay() + 6) % 7;
            const hasTasks = tasks.some((t) => t.deadline && getDayIndex(new Date(t.deadline)) === index);

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex flex-col items-center py-3 rounded-xl transition-colors",
                  isToday
                    ? "bg-violet/20 border border-violet/30"
                    : "bg-surface border border-border-subtle hover:border-border-default"
                )}
              >
                <span className={cn("text-xs font-medium", isToday ? "text-violet" : "text-text-tertiary")}>
                  {day}
                </span>
                <span className={cn("text-lg font-bold mt-1", isToday ? "text-violet" : "text-text-primary")}>
                  {21 + index}
                </span>
                {hasTasks && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald mt-1" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {timeSlots.slice(0, 8).map((hour, index) => {
            const tasksInSlot = tasks.filter((t) => {
              if (!t.deadline) return false;
              const taskHour = new Date(t.deadline).getHours();
              return taskHour >= hour && taskHour < hour + 1;
            });

            return (
              <motion.div
                key={hour}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4"
              >
                {/* Time */}
                <div className="w-14 flex-shrink-0">
                  <span className="text-xs text-text-tertiary font-mono">
                    {hour > 12 ? `${hour - 12}PM` : hour === 12 ? "12PM" : `${hour}AM`}
                  </span>
                </div>

                {/* Slot */}
                <div className={cn(
                  "flex-1 min-h-[60px] rounded-xl border transition-colors relative",
                  tasksInSlot.length > 0
                    ? "bg-violet/10 border-violet/30"
                    : "bg-surface border-border-subtle"
                )}>
                  {tasksInSlot.map((task) => (
                    <div
                      key={task.id}
                      className="px-3 py-2 text-xs"
                    >
                      <p className="text-text-primary font-medium truncate">{task.title}</p>
                      <p className="text-text-tertiary">{task.category}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
