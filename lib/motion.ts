import { Variants } from "framer-motion";

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const smoothTransition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
};

export const quickTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15,
};

// Card entrance animations
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springTransition,
      delay: i * 0.05,
    },
  }),
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: smoothTransition,
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Fade animations
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: smoothTransition },
  exit: { opacity: 0, transition: quickTransition },
};

// Slide animations
export const slideVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: springTransition },
  exit: { opacity: 0, x: 20, transition: quickTransition },
};

// Scale animations
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: springTransition },
  exit: { opacity: 0, scale: 1.1, transition: quickTransition },
};

// Pop with bounce
export const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: quickTransition,
  },
};

// Celebration burst
export const burstVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: [0, 1, 1, 0],
    scale: [0, 1.2, 1, 1],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Slide up from bottom
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: quickTransition,
  },
};

// Hover scale effect
export const hoverScaleVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: springTransition },
  pressed: { scale: 0.98, transition: quickTransition },
};

// Swipe feedback
export const swipeFeedbackVariants = {
  initial: { x: 0 },
  swiping: { x: 0 },
  complete: { x: 100, opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
  snooze: { x: -100, opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
};
