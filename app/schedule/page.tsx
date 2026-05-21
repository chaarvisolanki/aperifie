"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ChevronRight, Zap, Brain, Sparkles, Plus } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { useTaskStore } from "@/hooks/useTaskStore";
import { AddTaskModal } from "@/components/task/AddTaskModal";
import { useCoach } from "@/components/ai/CoachProvider";
import { cn } from "@/lib/utils";
import { Task } from "@/types";

const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

interface OptimalTimeSlot {
  hour: number;
  avgTasks: number;
}

export default function SchedulePage() {
  const { status } = useSession();
  const { tasks, fetchTasks, fetchUserData, fetchCognitiveLoad, cognitiveLoad, isAddModalOpen, setAddModalOpen } = useTaskStore();
  const { triggerFlowStateMessage } = useCoach();
  const [optimalTimes, setOptimalTimes] = useState<OptimalTimeSlot[]>([]);
  const [currentFlowStreak, setCurrentFlowStreak] = useState(0);
  const [flowState, setFlowState] = useState<string>("neutral");
  const [modalInitialDate, setModalInitialDate] = useState<Date | undefined>(undefined);
  const [modalInitialHour, setModalInitialHour] = useState<number | undefined>(undefined);
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    return new Date(today.setDate(diff));
  });

  // Calculate week days
  const weekDays = useMemo(() => {
    const days = [];
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + i);
      days.push({
        name: dayNames[i],
        date: date,
        dateNum: date.getDate(),
        isToday: isToday(date),
      });
    }
    return days;
  }, [currentWeekStart]);

  const monthYear = useMemo(() => {
    return currentWeekStart.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [currentWeekStart]);

  const weekNumber = useMemo(() => {
    const startOfYear = new Date(currentWeekStart.getFullYear(), 0, 1);
    const days = Math.floor((currentWeekStart.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  }, [currentWeekStart]);

  function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  function goToPreviousWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  }

  function goToNextWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  }

  function goToToday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const newDate = new Date(today);
    newDate.setDate(diff);
    setCurrentWeekStart(newDate);
  }

  // Get tasks for current week
  const weekTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.deadline) return false;
      const deadline = new Date(task.deadline);
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      return deadline >= currentWeekStart && deadline < weekEnd;
    });
  }, [tasks, currentWeekStart]);

  // Check for long intervals and trigger AI coach
  useEffect(() => {
    const checkLongIntervals = () => {
      if (weekTasks.length < 2) return;

      // Sort by deadline
      const sorted = [...weekTasks].sort((a, b) =>
        new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()
      );

      for (let i = 0; i < sorted.length - 1; i++) {
        const current = new Date(sorted[i].deadline!);
        const next = new Date(sorted[i + 1].deadline!);
        const diffHours = (next.getTime() - current.getTime()) / (1000 * 60 * 60);

        // If more than 2 hours gap between tasks
        if (diffHours > 2 && diffHours < 5) {
          triggerFlowStateMessage("scattered", 30);
          return;
        }
      }
    };

    if (status === "authenticated" && weekTasks.length > 0) {
      // Only check once when tasks load
      const timer = setTimeout(checkLongIntervals, 2000);
      return () => clearTimeout(timer);
    }
  }, [weekTasks.length, status]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchTasks();
      fetchUserData();
      fetchCognitiveLoad().then(() => {
        const store = useTaskStore.getState();
        setOptimalTimes(store.cognitiveLoad.optimalTimes || []);
        setCurrentFlowStreak(store.cognitiveLoad.currentFlowStreak || 0);
        setFlowState(store.cognitiveLoad.flowState || "neutral");
      });
    }
  }, [status, fetchTasks, fetchUserData, fetchCognitiveLoad]);

  const getDayIndex = (date: Date) => {
    return (date.getDay() + 6) % 7;
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary">
              Weekly Overview
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setModalInitialDate(undefined);
                setModalInitialHour(undefined);
                setAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-violet/10 hover:bg-violet/20 text-violet rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </motion.button>
          </div>
        </motion.div>

        {/* Week navigation */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPreviousWeek}
            className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center hover:border-violet/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </motion.button>

          <div className="text-center">
            <button
              onClick={goToToday}
              className="text-text-primary font-semibold hover:text-violet transition-colors"
            >
              {monthYear}
            </button>
            <p className="text-xs text-text-tertiary">Week {weekNumber}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNextWeek}
            className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center hover:border-violet/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </motion.button>
        </div>

        {/* Week view */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map((day, index) => {
            const hasTasks = weekTasks.some((t) =>
              t.deadline && getDayIndex(new Date(t.deadline)) === index
            );

            return (
              <motion.div
                key={day.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setModalInitialDate(day.date);
                  setModalInitialHour(9); // Default to 9 AM
                  setAddModalOpen(true);
                }}
                className={cn(
                  "flex flex-col items-center py-3 rounded-xl transition-colors cursor-pointer",
                  day.isToday
                    ? "bg-violet/20 border border-violet/30"
                    : "bg-surface border border-border-subtle hover:border-border-default hover:bg-violet/5"
                )}
              >
                <span className={cn("text-xs font-medium", day.isToday ? "text-violet" : "text-text-tertiary")}>
                  {day.name}
                </span>
                <span className={cn("text-lg font-bold mt-1", day.isToday ? "text-violet" : "text-text-primary")}>
                  {day.dateNum}
                </span>
                {hasTasks && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald mt-1" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Flow State & Optimal Times */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 p-4 rounded-2xl bg-surface border border-border-subtle"
        >
          {/* Flow State Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                flowState === "deep-flow" || flowState === "flow" ? "bg-emerald/20" :
                flowState === "neutral" ? "bg-amber/20" : "bg-rose/20"
              )}>
                {flowState === "deep-flow" || flowState === "flow" ? (
                  <Sparkles className="w-5 h-5 text-emerald" />
                ) : flowState === "neutral" ? (
                  <Brain className="w-5 h-5 text-amber" />
                ) : (
                  <Zap className="w-5 h-5 text-rose" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {flowState === "deep-flow" ? "Deep Flow Zone" :
                   flowState === "flow" ? "In the Flow" :
                   flowState === "neutral" ? "Neutral" :
                   flowState === "scattered" ? "Scattered Focus" : "Blocked"}
                </p>
                <p className="text-xs text-text-tertiary">
                  {currentFlowStreak > 0 ? `${currentFlowStreak} hour streak` : "Start your flow streak"}
                </p>
              </div>
            </div>
            {currentFlowStreak >= 2 && (
              <span className="px-2 py-1 rounded-lg bg-emerald/20 text-emerald text-xs font-medium">
                🔥 Hot Streak
              </span>
            )}
          </div>

          {/* Optimal Task Times */}
          {optimalTimes.length > 0 && (
            <div>
              <p className="text-xs text-text-tertiary mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Best times to tackle tasks today
              </p>
              <div className="flex gap-2">
                {optimalTimes.slice(0, 3).map((slot) => (
                  <div
                    key={slot.hour}
                    className="flex-1 px-3 py-2 rounded-xl bg-violet/10 border border-violet/20 text-center"
                  >
                    <p className="text-sm font-semibold text-violet">
                      {slot.hour > 12 ? `${slot.hour - 12}PM` : slot.hour === 12 ? "12PM" : `${slot.hour}AM`}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {slot.avgTasks.toFixed(1)} avg
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Timeline */}
        <div className="space-y-3">
          {timeSlots.slice(0, 10).map((hour, index) => {
            const tasksInSlot = weekTasks.filter((t) => {
              if (!t.deadline) return false;
              const taskDate = new Date(t.deadline);
              const taskHour = taskDate.getHours();
              const taskDayIndex = getDayIndex(taskDate);
              return taskHour >= hour && taskHour < hour + 1;
            });

            return (
              <motion.div
                key={hour}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex gap-2"
              >
                {/* Time */}
                <div className="w-12 flex-shrink-0 pt-2">
                  <span className="text-xs text-text-tertiary font-mono">
                    {hour > 12 ? `${hour - 12}PM` : hour === 12 ? "12PM" : `${hour}AM`}
                  </span>
                </div>

                {/* Slots for each day */}
                <div className="flex-1 grid grid-cols-7 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                    const dayTasks = weekTasks.filter((t) => {
                      if (!t.deadline) return false;
                      const taskDate = new Date(t.deadline);
                      return getDayIndex(taskDate) === dayIndex &&
                             taskDate.getHours() >= hour &&
                             taskDate.getHours() < hour + 1;
                    });

                    return (
                      <div
                        key={dayIndex}
                        onClick={() => {
                          const clickedDate = new Date(weekDays[dayIndex].date);
                          clickedDate.setHours(hour, 0, 0, 0);
                          setModalInitialDate(clickedDate);
                          setModalInitialHour(hour);
                          setAddModalOpen(true);
                        }}
                        className={cn(
                          "min-h-[40px] rounded-lg border transition-colors cursor-pointer",
                          dayTasks.length > 0
                            ? "bg-violet/20 border-violet/40"
                            : "bg-surface/50 border-border-subtle/50 hover:bg-violet/10 hover:border-violet/30"
                        )}
                      >
                        {dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className="px-1 py-1 text-[8px] leading-tight"
                          >
                            <p className="text-text-primary font-medium truncate">{task.title}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} initialDate={modalInitialDate} initialHour={modalInitialHour} />
    </div>
  );
}
