"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { Sparkles, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useCoach } from "./CoachProvider";

export function AICoachBubble() {
  const { data: session, status } = useSession();
  const { aiMessages: messages, clearAIMessages } = useTaskStore();
  const { refreshMessage } = useCoach();
  const latestMessage = messages[messages.length - 1];
  const prevMessagesLength = useRef(messages.length);

  // Auto-hide messages after 8 seconds
  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      const timer = setTimeout(() => {
        clearAIMessages();
      }, 8000);
      prevMessagesLength.current = messages.length;
      return () => clearTimeout(timer);
    }
  }, [messages.length, clearAIMessages]);

  // Don't render if not authenticated or loading
  if (status === "loading" || status === "unauthenticated") return null;

  // Don't render if no message
  if (!latestMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="fixed bottom-24 right-4 z-50 lg:bottom-28 lg:right-8 max-w-[280px]"
      >
        <div className="bg-elevated border border-border-default rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-violet/20 to-cyan/10 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet to-cyan flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">APERIFY Coach</p>
                <p className="text-[10px] text-text-tertiary">Your AI productivity buddy</p>
              </div>
            </div>
            <button
              onClick={clearAIMessages}
              className="w-6 h-6 rounded-lg hover:bg-bg-hover flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-text-tertiary" />
            </button>
          </div>

          {/* Message */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-violet/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-3 h-3 text-violet" />
              </div>
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  latestMessage.type === "celebration"
                    ? "text-emerald"
                    : ["warning", "procrastination"].includes(latestMessage.type)
                    ? "text-amber"
                    : "text-text-primary"
                )}
              >
                {latestMessage.text}
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="px-4 pb-4 flex gap-2">
            <button
              onClick={() => {
                clearAIMessages();
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-violet/20 text-violet text-xs font-medium hover:bg-violet/30 transition-colors"
            >
              Got it!
            </button>
            <button
              onClick={() => {
                refreshMessage();
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-surface text-text-secondary text-xs font-medium hover:bg-bg-hover transition-colors"
            >
              More tips
            </button>
          </div>
        </div>

        {/* Speech bubble tail */}
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-elevated border-r border-b border-border-default rotate-45" />
      </motion.div>
    </AnimatePresence>
  );
}
