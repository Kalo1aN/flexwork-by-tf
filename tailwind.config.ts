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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Surfaces & borders (aligned to design-reference.html)
        surface: {
          DEFAULT: "var(--surface)",
          off: "var(--off)",
        },
        line: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        // Text tones
        muted: {
          DEFAULT: "var(--muted)",
          soft: "var(--muted-soft)",
        },
        // Brand green tokens
        brand: {
          DEFAULT: "var(--green)",
          dark: "var(--green-dark)",
          darker: "var(--green-darker)",
          light: "var(--green-light)",
          mid: "var(--green-mid)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        pill: "var(--radius-pill)",
        card: "var(--radius-lg)",
        panel: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
};
export default config;
