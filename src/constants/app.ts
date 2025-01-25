import { Alarm, NotificationBing, Reserve } from "iconsax-react-native"

export const APP = {
  name: "Monhealth -  Healthcare App",
  description: "A healthcare app for Vietnamese people",
  version: "1.0.0"
}

export const DATA = {
  MEALS: [
    { label: "Bữa sáng", value: "Breakfast", dishes: ["Main Dish (70%)"] },
    { label: "Bữa trưa", value: "Lunch", dishes: ["Main Dish (50%)", "Side Dish (30%)", "Dessert (10%)"] },
    { label: "Bữa tối", value: "Dinner", dishes: ["Main Dish (50%)", "Side Dish (30%)", "Dessert (10%)"] },
    { label: "Bữa phụ", value: "Snack", dishes: ["Snack (70%)"] },
  ],
  DISHES: [
    { label: "Món chính", value: "Main Dish" },
    { label: "Món phụ", value: "Side Dish" },
    { label: "Món tráng miệng", value: "Dessert" },
    { label: "Đồ uống", value: "Drink" },
    { label: "Đồ ăn vặt", value: "Snack" }
  ],
  UNITS: [
    { label: "g (gram)", value: "g" },
    { label: "ml (mililit)", value: "ml" }
  ]
}

export const COLORS = {
  primary: "#334155",
  secondary: "#64748b",
  accent: "#94a3b8",
  destructive: "#ef4444",

  PRIMARY: {
    nutrition: "#f59e0b",
    water: "#0ea5e9",
    workout: "#f43f5e",
    lemon: "#eab308"
  },

  BMI: {
    low: "#22c55e",
    normal: "#eab308",
    high: "#ef4444"
  },

  NUTRITION: {
    protein: "#eab308",
    carbs: "#a855f7",
    fat: "#ef4444",
    fiber: "#f97316",
    sugar: "#60a5fa"
  },

  WORKOUT: {
    caloriesIntake: "#16a34a",
    caloriesBurned: "#ef4444",
    duration: "#f97316",
    steps: "#3b82f6"
  },

  NOTIFICATIONS: {
    reminder: "#ca8a04",
    suggestion: "#16a34a",
    warning: "#dc2626"
  }
}

export const ICONS = {
  NOTIFICATIONS: {
    reminder: NotificationBing,
    suggestion: Reserve,
    warning: Alarm
  }
}
