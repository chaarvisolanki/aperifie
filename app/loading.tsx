import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet to-violet/60 shadow-glow-violet flex items-center justify-center animate-pulse">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <p className="text-text-secondary text-sm">Loading...</p>
      </div>
    </div>
  );
}
