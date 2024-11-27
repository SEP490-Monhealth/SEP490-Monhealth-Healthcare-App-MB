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
          DEFAULT: "#1E293B", // Slate 800
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
        typography: {
          DEFAULT: "#0F172A", // Slate 900
          primary: "#94A3B8", // Slate 400
          foreground: "#FFFFFF",
          description: "#888888"
        },
        destructive: {
          DEFAULT: "#EF4444", // Red 500
          foreground: "#FEE2E2" // Red 100
        }
      },
      fontFamily: {
        nthin: ["NotoSans-Thin", "sans-serif"],
        nextralight: ["NotoSans-ExtraLight", "sans-serif"],
        nlight: ["NotoSans-Light", "sans-serif"],
        nregular: ["NotoSans-Regular", "sans-serif"],
        nmedium: ["NotoSans-Medium", "sans-serif"],
        nsemibold: ["NotoSans-SemiBold", "sans-serif"],
        nbold: ["NotoSans-Bold", "sans-serif"],
        nextrabold: ["NotoSans-ExtraBold", "sans-serif"],
        nblack: ["NotoSans-Black", "sans-serif"],
        pregular: ["Pacifico-Regular", "sans-serif"]
      }
    }
  },
  plugins: []
}
