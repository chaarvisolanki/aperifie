"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Flame, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/hooks/useTaskStore";
import { fireCelebration, fireStreakCelebration } from "@/lib/confetti";

export function CelebrationOverlay() {
  const { celebration, clearCelebration, user } = useTaskStore();
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (celebration.isActive && !hasShownRef.current) {
      hasShownRef.current = true;

      if (celebration.type === "completion") {
        fireCelebration();
      }

      if (celebration.type === "streak-milestone") {
        fireStreakCelebration();
      }

      // Auto-clear after animation
      const timer = setTimeout(() => {
        hasShownRef.current = false;
        clearCelebration();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [celebration.isActive, celebration.type, clearCelebration]);

  // Determine milestone info
  const streak = user?.streak || 0;
  const isMilestone = streak === 7 || streak === 30 || streak === 100 || streak === 365;
  const milestoneMessage = {
    7: "One week strong! You're building a habit!",
    30: "30 days! You're unstoppable!",
    100: "100 DAYS?! You're legendary!",
    365: "ONE YEAR! You've mastered productivity!",
  }[streak];

  return (
    <AnimatePresence>
      {celebration.isActive && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none"
          >
            {/* Radial gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* Celebration card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-sm"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl p-8 text-center",
                "bg-gradient-to-br from-violet/20 via-surface to-cyan/20",
                "border border-violet/30",
                "shadow-2xl shadow-violet/20"
              )}
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet/10 to-transparent" />

              <div className="relative">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center"
                >
                  {celebration.type === "streak-milestone" ? (
                    <Trophy className="w-10 h-10 text-white" />
                  ) : (
                    <Star className="w-10 h-10 text-white" />
                  )}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-display font-bold text-text-primary mb-2"
                >
                  {celebration.type === "streak-milestone"
                    ? "MILESTONE REACHED!"
                    : "TASK CRUSHED!"}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-text-secondary mb-6"
                >
                  {celebration.type === "streak-milestone"
                    ? milestoneMessage
                    : "Another step closer to your best self. Keep the momentum!"}
                </motion.p>

                {/* Streak display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Flame className="w-6 h-6 text-amber" />
                  <span className="font-mono text-4xl font-bold text-text-primary">
                    {streak}
                  </span>
                  <span className="text-text-tertiary text-sm">day streak</span>
                </motion.div>

                {/* Particle trail effect */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"].map((color, i) => (
                    <motion.div
                      key={color}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
