import {
  Alarm,
  Man,
  NotificationBing,
  Reserve,
  Woman
} from "iconsax-react-native"
import { Scale, TrendingDown, TrendingUp } from "lucide-react-native"

import { DishType, Gender, GoalType, MealType } from "./enums"

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
      value: MealType.Breakfast,
      dishes: ["MainDish (80%)"]
    },
    {
      label: "Bữa trưa",
      eLabel: "Lunch",
      value: MealType.Lunch,
      dishes: ["MainDish (50%)", "SideDish (30%)", "Dessert (10%)"]
    },
    {
      label: "Bữa tối",
      eLabel: "Dinner",
      value: MealType.Dinner,
      dishes: ["MainDish (50%)", "SideDish (30%)", "Dessert (10%)"]
    },
    {
      label: "Bữa phụ",
      eLabel: "Snack",
      value: MealType.Snack,
      dishes: ["Snack (70%)"]
    }
  ],
  DISHES: [
    { label: "Món chính", value: DishType.MainDish },
    { label: "Món phụ", value: DishType.SideDish },
    { label: "Món canh", value: DishType.Soup },
    { label: "Món tráng miệng", value: DishType.Dessert },
    { label: "Đồ uống", value: DishType.Drink }
  ],
  UNITS: [
    { label: "g (gram)", value: "g" },
    { label: "ml (mililit)", value: "ml" }
  ],
  GENDERS: [
    { label: "Nam", value: Gender.Male, icon: Man },
    { label: "Nữ", value: Gender.Female, icon: Woman }
  ],
  GOALS: [
    {
      label: "Giảm cân",
      value: GoalType.WeightLoss,
      description: "Mục tiêu giảm cân và duy trì vóc dáng",
      icon: TrendingDown
    },
    {
      label: "Duy trì cân nặng",
      value: GoalType.Maintenance,
      description: "Mục tiêu duy trì cân nặng hiện tại",
      icon: Scale
    },
    {
      label: "Tăng cân",
      value: GoalType.WeightGain,
      description: "Mục tiêu tăng cân và cải thiện cơ thể",
      icon: TrendingUp
    }
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
