/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC", // Slate 50
        foreground: "#0F172A", // Slate 900
        card: {
          DEFAULT: "#FFF" // White
        },
        primary: {
          DEFAULT: "#334155", // Slate 700
          foreground: "#F8FAFC" // Slate 50
        },
        secondary: {
          DEFAULT: "#64748B" // Slate 500
        },
        muted: {
          DEFAULT: "#F1F5F9", // Slate 100
          foreground: "#475569" // Slate 600
        },
        accent: {
          DEFAULT: "#94A3B8", // Slate 400
          foreground: "#334155" // Slate 700
        },
        border: {
          DEFAULT: "#E2E8F0" // Slate 200
        },
        destructive: {
          DEFAULT: "#EF4444", // Red 500
          foreground: "#FEE2E2" // Red 100
        },
        bmi: {
          underweight: "#3B82F6", // Blue 500
          normal: "#22C55E", // Green 500
          overweight: "#EAB308", // Yellow 500
          obese: "#EF4444" // Red 500
        },
        nutrition: {
          protein: "#EAB308", // Yellow 500
          carbs: "#A855F7", // Purple 500
          fat: "#EF4444", // Red 500
          fiber: "#F97316", // Orange 500
          sugar: "#60A5FA" // Blue 400
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
