"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Zap, Plus } from "lucide-react";
import { useTaskStore, useIncompleteTasks } from "@/hooks/useTaskStore";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { TaskFeed } from "@/components/task/TaskFeed";
import { AddTaskModal } from "@/components/task/AddTaskModal";
import { AICoachBubble } from "@/components/ai/AICoachBubble";
import { CelebrationOverlay } from "@/components/ai/celebration/CelebrationOverlay";
import { FocusScoreCard } from "@/components/stats/FocusScoreCard";
import { ProductivityChart } from "@/components/stats/ProductivityChart";
import { QuickStats } from "@/components/stats/QuickStats";

export default function Home() {
  const { data: session, status } = useSession();
  const incompleteTasks = useIncompleteTasks();
  const { isAddModalOpen, setAddModalOpen, streakData, user, fetchTasks, fetchUserData } = useTaskStore();

  // Fetch data on mount
  useEffect(() => {
    if (status === "authenticated") {
      fetchTasks();
      fetchUserData();
    }
  }, [status, fetchTasks, fetchUserData]);

  // Show loading while auth is being checked
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet to-violet/60 shadow-glow-violet flex items-center justify-center animate-pulse">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <p className="text-text-secondary text-sm">Loading your focus feed...</p>
        </div>
      </div>
    );
  }

  const userName = user?.name || session?.user?.name || "there";

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <TopBar />

      <div className="max-w-lg mx-auto px-4 pt-4 lg:pt-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-violet" />
            <span className="text-text-secondary text-sm font-medium">Focus Feed</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-1">
            Good {getTimeOfDay()}, {userName.split(" ")[0]}
          </h1>
          <p className="text-text-secondary text-sm">
            You have {incompleteTasks.length} tasks waiting. Let&apos;s engineer some flow.
          </p>
        </motion.div>

        {/* Quick Stats Row */}
        <QuickStats streak={streakData?.current || 0} focusScore={user?.focusScore || 0} />

        {/* Task Feed */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-text-primary">
              Today&apos;s Focus
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-violet/10 hover:bg-violet/20 text-violet rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </motion.button>
          </div>

          <TaskFeed tasks={incompleteTasks} />
        </section>

        {/* Secondary Stats Section */}
        <section className="mt-8 grid grid-cols-1 gap-4">
          <FocusScoreCard score={user?.focusScore || 0} />
          <ProductivityChart history={streakData?.history || []} />
        </section>
      </div>

      <BottomNav />
      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      <AICoachBubble />
      <CelebrationOverlay />
    </div>
  );
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
}
