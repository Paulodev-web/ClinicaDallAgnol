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
        // Azul de marca Dallagnol — identidade
        primary: {
          DEFAULT: "#2A5F8F",
          hover: "#1D4A72",
          mid: "#4A90C4",
          light: "#7FB3D8",
          xlight: "#EBF4FA",
        },
        brand: {
          primary: "#2A5F8F",
          hover: "#1D4A72",
          mid: "#4A90C4",
          light: "#7FB3D8",
          xlight: "#EBF4FA",
        },
        // Superfícies
        page: "#F2F2F0",
        surface: "#FFFFFF",
        "section-alt": "#EDF3F8",
        // Neutros frios
        silver: "#8A9BB0",
        graysoft: "#C2C8D0",
        // Texto (papéis semânticos)
        ink: {
          DEFAULT: "#1A2A38",
          secondary: "#4A5A6A",
          muted: "#8A9BB0",
        },
        gold: {
          600: "#b8860b",
        },
        light: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
        },
        dark: {
          900: "#0a0a0a",
          800: "#0f0f0f",
          700: "#1a1a1a",
          600: "#262626",
        },
      },
      fontFamily: {
        // Corpo = Inter · Headings = Raleway (peso leve)
        sans: ["var(--font-inter)", "var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-raleway)", "Georgia", "serif"],
        heading: ["var(--font-raleway)", "system-ui", "sans-serif"],
        display: ["var(--font-raleway)", "system-ui", "sans-serif"],
        signature: ["var(--font-signature)", "cursive"],
      },
      boxShadow: {
        // Sombras com tom azulado (nunca preto puro)
        "brand-sm": "0 1px 4px rgba(42, 95, 143, 0.08)",
        "brand-md": "0 2px 12px rgba(42, 95, 143, 0.10)",
        "brand-lg": "0 4px 24px rgba(42, 95, 143, 0.14)",
        "brand-hover": "0 6px 28px rgba(42, 95, 143, 0.18)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
