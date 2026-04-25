"use client";

import { motion } from "framer-motion";
import { Search, Flame, Bell } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTaskStore } from "@/hooks/useTaskStore";
import { cn } from "@/lib/utils";

export function TopBar() {
  const { user, streakData } = useTaskStore();

  return (
    <header className="sticky top-0 z-40 bg-void/80 backdrop-blur-lg border-b border-border-subtle">
      <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet to-violet/60 flex items-center justify-center shadow-glow-violet">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-text-primary text-lg leading-none">
              APERIFY
            </h1>
            <p className="text-[10px] text-text-tertiary font-mono tracking-wider">
              ENGINEERING FOCUS
            </p>
          </div>
        </motion.div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-surface hover:bg-elevated flex items-center justify-center transition-colors"
          >
            <Search className="w-4 h-4 text-text-secondary" />
          </motion.button>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border-subtle",
              "hover:border-violet/30 transition-colors cursor-pointer"
            )}
          >
            <Flame className="w-4 h-4 text-amber" />
            <span className="font-mono text-sm font-semibold text-text-primary">
              {streakData?.current || user?.streak || 0}
            </span>
          </motion.div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-surface hover:bg-elevated flex items-center justify-center transition-colors relative"
          >
            <Bell className="w-4 h-4 text-text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose rounded-full" />
          </motion.button>

          {/* Avatar / Sign Out */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-sm font-bold text-white"
            title="Sign out"
          >
            {user?.name?.charAt(0) || "U"}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
