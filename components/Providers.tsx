"use client";

import { SessionProvider } from "next-auth/react";
import { CoachProvider } from "@/components/ai/CoachProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CoachProvider>{children}</CoachProvider>
    </SessionProvider>
  );
}
