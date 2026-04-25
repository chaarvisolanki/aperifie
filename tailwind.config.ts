import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#09090B",
        surface: "#0F0F12",
        elevated: "#18181B",
        "bg-hover": "#27272A",
        "border-subtle": "#1F1F23",
        "border-default": "#27272A",
        "border-focus": "#3F3F46",
        "text-primary": "#FAFAFA",
        "text-secondary": "#A1A1AA",
        "text-tertiary": "#71717A",
        violet: {
          DEFAULT: "#8B5CF6",
          glow: "rgba(139, 92, 246, 0.4)",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          glow: "rgba(6, 182, 212, 0.3)",
        },
        emerald: {
          DEFAULT: "#10B981",
          glow: "rgba(16, 185, 129, 0.4)",
        },
        amber: {
          DEFAULT: "#F59E0B",
        },
        rose: {
          DEFAULT: "#F43F5E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "shimmer": "shimmer 2s infinite linear",
        "pulse-glow": "pulse-glow 2s infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "glow-violet": "0 0 20px rgba(139, 92, 246, 0.4)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.4)",
        "glow-amber": "0 0 20px rgba(245, 158, 11, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
