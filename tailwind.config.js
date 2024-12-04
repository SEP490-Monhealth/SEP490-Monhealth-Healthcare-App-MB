/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F1F5F9", // Slate 100
        foreground: "#0F172A", // Slate 900
        primary: {
          DEFAULT: "#334155", // Slate 700
          foreground: "#F1F5F9" // Slate 100
        },
        secondary: {
          DEFAULT: "#E2E8F0", // Slate 200
          foreground: "#64748B" // Slate 500
        },
        card: {
          DEFAULT: "#F1F5F9", // Slate 100
          foreground: "#334155" // Slate 700
        },
        accent: {
          DEFAULT: "#64748B", // Slate 500
          foreground: "#F1F5F9" // Slate 100
        },
        muted: {
          DEFAULT: "#94A3B8", // Slate 400
          foreground: "#475569" // Slate 600
        },
        typography: {
          DEFAULT: "#0F172A", // Slate 900
          primary: "#94A3B8", // Slate 400
          foreground: "#FFFFFF",
          description: "#888888"
        },
        destructive: {
          DEFAULT: "#DC2626", // Red 600
          foreground: "#FEE2E2" // Red 100
        }
      },
      fontFamily: {
        tregular: ["TikTokText-Regular", "sans-serif"],
        tmedium: ["TikTokText-Medium", "sans-serif"],
        tbold: ["TikTokText-Bold", "sans-serif"],

        dregular: ["TikTokDisplay-Regular", "sans-serif"],
        dmedium: ["TikTokDisplay-Medium", "sans-serif"],
        dbold: ["TikTokDisplay-Bold", "sans-serif"],

        pregular: ["Pacifico-Regular", "sans-serif"]
      }
    }
  },
  plugins: []
}
