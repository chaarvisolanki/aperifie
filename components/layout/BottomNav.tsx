"use client";

import { motion } from "framer-motion";
import { Flame, Calendar, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "feed", label: "Feed", icon: Flame },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const activeTab = "feed";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-void/90 backdrop-blur-lg border-t border-border-subtle">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors min-w-[64px]",
                isActive
                  ? "text-violet"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "drop-shadow-lg")} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -bottom-0.5 w-12 h-0.5 bg-violet rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
