"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useTaskStore } from "@/hooks/useTaskStore";

interface CoachProviderProps {
  children: ReactNode;
}

interface CoachContextType {
  triggerProcrastinationCheck: () => void;
  triggerCelebration: (taskTitle: string, streak: number) => void;
  triggerFlowStateMessage: (flowState: string, score: number) => void;
  triggerLongTaskWarning: (estimatedMinutes: number) => void;
  refreshMessage: () => void;
}

const CoachContext = createContext<CoachContextType | null>(null);

export function useCoach() {
  const context = useContext(CoachContext);
  if (!context) {
    throw new Error("useCoach must be used within a CoachProvider");
  }
  return context;
}

export function CoachProvider({ children }: CoachProviderProps) {
  const { data: session } = useSession();
  const { addAIMessage, lastInteraction, updateLastInteraction, cognitiveLoad } = useTaskStore();
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastCheckRef = useRef<Date>(new Date());
  const lastFlowStateRef = useRef<string>("");

  const fetchCoachMessage = async (isProcrastinating = false) => {
    if (!session?.user) return;

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "coach", isProcrastinating }),
      });

      if (res.ok) {
        const data = await res.json();
        addAIMessage(data);
      }
    } catch (error) {
      console.error("Failed to fetch coach message:", error);
    }
  };

  const triggerProcrastinationCheck = () => {
    fetchCoachMessage(true);
  };

  const triggerCelebration = async (taskTitle: string, streak: number) => {
    if (!session?.user) return;

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "celebration", taskTitle, streak }),
      });

      if (res.ok) {
        const data = await res.json();
        addAIMessage(data);
      }
    } catch (error) {
      console.error("Failed to fetch celebration:", error);
    }
  };

  const triggerFlowStateMessage = (flowState: string, score: number) => {
    // Only trigger when flow state changes significantly
    if (flowState === lastFlowStateRef.current) return;
    lastFlowStateRef.current = flowState;

    const messages: Record<string, { text: string; type: string }> = {
      "deep-flow": {
        text: "🔥 You're in the zone! This is the perfect time for deep, challenging work.",
        type: "celebration",
      },
      flow: {
        text: "You're flowing well today. Keep up the momentum!",
        type: "encouragement",
      },
      neutral: {
        text: "Feeling neutral? Try starting with a quick win to build momentum.",
        type: "tip",
      },
      scattered: {
        text: "Your focus seems scattered. Maybe take a short break and come back refreshed?",
        type: "warning",
      },
      blocked: {
        text: "You're hitting a wall. Step away for a bit - sometimes distance brings clarity.",
        type: "warning",
      },
    };

    const message = messages[flowState];
    if (message) {
      addAIMessage({
        text: message.text,
        type: message.type as any,
      });
    }
  };

  const triggerLongTaskWarning = (estimatedMinutes: number) => {
    if (estimatedMinutes >= 90) {
      addAIMessage({
        text: `That's a ${estimatedMinutes}-minute task! Consider breaking it into smaller chunks or scheduling a break in the middle to maintain focus.`,
        type: "tip",
      });
    } else if (estimatedMinutes >= 60) {
      addAIMessage({
        text: `A ${estimatedMinutes}-minute block coming up! Make sure to take a 5-minute break halfway through.`,
        type: "tip",
      });
    }
  };

  const refreshMessage = () => {
    fetchCoachMessage(false);
  };

  // Procrastination detection: check if user hasn't interacted in 5+ minutes
  useEffect(() => {
    if (!session?.user) return;

    checkIntervalRef.current = setInterval(() => {
      const now = new Date();
      const idleTime = now.getTime() - lastInteraction.getTime();
      const fiveMinutes = 5 * 60 * 1000;

      // Only trigger if idle for 5+ minutes and it's been at least 10 mins since last check
      if (idleTime >= fiveMinutes && now.getTime() - lastCheckRef.current.getTime() >= 10 * 60 * 1000) {
        lastCheckRef.current = now;
        fetchCoachMessage(true);
      }
    }, 60000); // Check every minute

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [session?.user, lastInteraction]);

  return (
    <CoachContext.Provider
      value={{
        triggerProcrastinationCheck,
        triggerCelebration,
        triggerFlowStateMessage,
        triggerLongTaskWarning,
        refreshMessage,
      }}
    >
      {children}
    </CoachContext.Provider>
  );
}
