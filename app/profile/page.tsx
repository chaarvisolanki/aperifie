"use client";

import { motion } from "framer-motion";
import {
  User,
  Settings,
  Bell,
  Volume2,
  Vibrate,
  Sparkles,
  LogOut,
  ChevronRight,
  Flame,
  Trophy,
  Star,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { useTaskStore } from "@/hooks/useTaskStore";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, streakData } = useTaskStore();

  const achievements = [
    { icon: Flame, label: "7-Day Streak", earned: (user?.streak || 0) >= 7, color: "text-amber", bg: "bg-amber/10" },
    { icon: Trophy, label: "30-Day Streak", earned: (user?.streak || 0) >= 30, color: "text-violet", bg: "bg-violet/10" },
    { icon: Star, label: "100-Day Streak", earned: (user?.streak || 0) >= 100, color: "text-cyan", bg: "bg-cyan/10" },
  ];

  const settings = [
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage push notifications",
      value: true,
      type: "toggle" as const,
    },
    {
      icon: Volume2,
      label: "Sound Effects",
      description: "Completion sounds & celebrations",
      value: user?.preferences?.soundEnabled ?? true,
      type: "toggle" as const,
    },
    {
      icon: Vibrate,
      label: "Haptic Feedback",
      description: "Vibration on mobile",
      value: user?.preferences?.hapticsEnabled ?? true,
      type: "toggle" as const,
    },
    {
      icon: Sparkles,
      label: "AI Coach",
      description: "Encouraging AI assistant",
      value: user?.preferences?.aiCoachEnabled ?? true,
      type: "toggle" as const,
    },
  ];

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
            <User className="w-5 h-5 text-violet" />
            <span className="text-text-secondary text-sm font-medium">Profile</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary">
            Settings & Profile
          </h1>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 bg-surface border border-border-subtle mb-6"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-3xl font-bold text-white">
              {(user?.name || "U").charAt(0)}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-display font-bold text-text-primary">
                {user?.name || "User"}
              </h2>
              <p className="text-sm text-text-secondary">{user?.email || ""}</p>

              {/* Streak badge */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber/10 border border-amber/20">
                  <Flame className="w-4 h-4 text-amber" />
                  <span className="text-sm font-semibold text-amber">{user?.streak || 0} day streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border-subtle">
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-text-primary">{user?.streak || 0}</p>
              <p className="text-xs text-text-tertiary">Current Streak</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-text-primary">{streakData?.longest || 0}</p>
              <p className="text-xs text-text-tertiary">Best Streak</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-text-primary">{user?.focusScore || 0}</p>
              <p className="text-xs text-text-tertiary">Focus Score</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-secondary mb-3">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <div
                  key={ach.label}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors",
                    ach.earned
                      ? `${ach.bg} border-${ach.color}/20`
                      : "bg-surface border-border-subtle opacity-50"
                  )}
                >
                  <Icon className={cn("w-6 h-6", ach.earned ? ach.color : "text-text-tertiary")} />
                  <span className={cn("text-xs font-medium", ach.earned ? "text-text-primary" : "text-text-tertiary")}>
                    {ach.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-surface border border-border-subtle overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-text-secondary" />
              <span className="text-sm font-medium text-text-secondary">Preferences</span>
            </div>
          </div>

          <div className="divide-y divide-border-subtle">
            {settings.map((setting) => {
              const Icon = setting.icon;
              return (
                <div key={setting.label} className="flex items-center justify-between px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-elevated flex items-center justify-center">
                      <Icon className="w-5 h-5 text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{setting.label}</p>
                      <p className="text-xs text-text-tertiary">{setting.description}</p>
                    </div>
                  </div>

                  {/* Toggle */}
                  <div
                    className={cn(
                      "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                      setting.value ? "bg-violet" : "bg-elevated border border-border-subtle"
                    )}
                  >
                    <motion.div
                      animate={{ x: setting.value ? 22 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Sign out */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-2xl bg-rose/10 text-rose font-medium hover:bg-rose/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
