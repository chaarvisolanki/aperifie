import confetti from "canvas-confetti";

export function fireConfetti(options?: confetti.Options) {
  if (typeof window !== "undefined") {
    confetti(options);
  }
}

export function fireCelebration() {
  if (typeof window !== "undefined") {
    // Big celebration burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#F43F5E"],
      disableForReducedMotion: true,
    });

    // Side bursts
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ["#8B5CF6", "#06B6D4"],
      disableForReducedMotion: true,
    });

    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ["#8B5CF6", "#06B6D4"],
      disableForReducedMotion: true,
    });
  }
}

export function fireStreakCelebration() {
  if (typeof window !== "undefined") {
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.4 },
      colors: ["#F59E0B", "#F43F5E", "#8B5CF6", "#06B6D4"],
      disableForReducedMotion: true,
    });
  }
}
