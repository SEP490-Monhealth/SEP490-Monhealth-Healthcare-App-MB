/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D97706",
        background: "F3F4F6",
        text: "#212121",
        input: "#FDFDFD",
        description: "#888"
      }
    }
  },
  plugins: []
}
