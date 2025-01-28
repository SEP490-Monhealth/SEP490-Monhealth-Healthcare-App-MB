import { Alarm, NotificationBing, Reserve } from "iconsax-react-native"

import { DishTypeEnum, MealTypeEnum } from "./enums"

export const APP = {
  name: "Monhealth -  Healthcare App",
  description: "A healthcare app for Vietnamese people",
  version: "1.0.0"
}

export const DATA = {
  MEALS: [
    {
      label: "Bữa sáng",
      eLabel: "Breakfast",
      value: MealTypeEnum.Breakfast,
      dishes: ["MainDish (80%)"]
    },
    {
      label: "Bữa trưa",
      eLabel: "Lunch",
      value: MealTypeEnum.Lunch,
      dishes: ["MainDish (50%)", "SideDish (30%)", "Dessert (10%)"]
    },
    {
      label: "Bữa tối",
      eLabel: "Dinner",
      value: MealTypeEnum.Dinner,
      dishes: ["MainDish (50%)", "SideDish (30%)", "Dessert (10%)"]
    },
    {
      label: "Bữa phụ",
      eLabel: "Snack",
      value: MealTypeEnum.Snack,
      dishes: ["Snack (70%)"]
    }
  ],
  DISHES: [
    { label: "Món chính", value: DishTypeEnum.MainDish },
    { label: "Món phụ", value: DishTypeEnum.SideDish },
    { label: "Món tráng miệng", value: DishTypeEnum.Dessert },
    { label: "Đồ uống", value: DishTypeEnum.Drink },
    { label: "Đồ ăn vặt", value: DishTypeEnum.Snack }
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
