import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pearl & Platinum palette (locked by intake)
        bg: "var(--bg-color)",
        surface: "var(--surface-color)",
        accent: "var(--accent-color)",
        contrast: "var(--contrast-color)",
        ink: "var(--text-primary)",
        muted: "var(--text-muted)",
        eyebrow: "var(--text-eyebrow)",
        hairline: "var(--hairline)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.4em",
      },
    },
  },
  plugins: [],
};

export default config;
