/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        foreground: "#0F172A",
        primary: {
          DEFAULT: "#FF7043",
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#EAEAEA",
          foreground: "#212121"
        },
        typography: {
          DEFAULT: "#212121",
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
        nblack: ["NotoSans-Black", "sans-serif"]
      }
    }
  },
  plugins: []
}
