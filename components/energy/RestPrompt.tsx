"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Coffee, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RestPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onTakeBreak: () => void;
  breakDuration: number;
  recommendation: string;
}

export function RestPrompt({
  isOpen,
  onClose,
  onTakeBreak,
  breakDuration,
  recommendation,
}: RestPromptProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm rounded-3xl bg-surface border border-border-subtle p-6 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber/20 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-amber" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">Time for a Break</h3>
                  <p className="text-xs text-text-tertiary">Your mind needs rest</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-elevated flex items-center justify-center hover:bg-border-subtle transition-colors"
              >
                <X className="w-4 h-4 text-text-tertiary" />
              </button>
            </div>

            {/* Recommendation */}
            <p className="text-sm text-text-secondary mb-6">
              {recommendation}
            </p>

            {/* Break duration */}
            <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-elevated">
              <Clock className="w-5 h-5 text-text-tertiary" />
              <span className="text-sm text-text-primary">
                Suggested break: <span className="font-semibold text-amber">{breakDuration} minutes</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-elevated text-text-secondary font-medium hover:bg-border-subtle transition-colors"
              >
                Keep Going
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onTakeBreak}
                className="flex-1 py-3 rounded-xl bg-amber text-void font-semibold hover:bg-amber/90 transition-colors"
              >
                Take Break
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
