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
  const { addAIMessage, lastInteraction, updateLastInteraction } = useTaskStore();
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastCheckRef = useRef<Date>(new Date());

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
        refreshMessage,
      }}
    >
      {children}
    </CoachContext.Provider>
  );
}
