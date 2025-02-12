import {
  Alarm,
  Man,
  NotificationBing,
  Reserve,
  Woman
} from "iconsax-react-native"
import { Scale, TrendingDown, TrendingUp } from "lucide-react-native"

import { DishEnum, GenderEnum, GoalEnum, MealEnum } from "./enums"

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
      value: MealEnum.Breakfast,
      ratio: 30,
      dishes: ["MainDish (100%)"]
    },
    {
      label: "Bữa trưa",
      eLabel: "Lunch",
      value: MealEnum.Lunch,
      ratio: 35,
      dishes: ["MainDish (55%)", "SideDish (30%)", "Dessert (15%)"]
    },
    {
      label: "Bữa tối",
      eLabel: "Dinner",
      value: MealEnum.Dinner,
      ratio: 25,
      dishes: ["MainDish (60%)", "SideDish (30%)", "Dessert (10%)"]
    },
    {
      label: "Bữa phụ",
      eLabel: "Snack",
      value: MealEnum.Snack,
      ratio: 10,
      dishes: ["MainDish (80%)", "SideDish (20%)"]
    }
  ],
  DISHES: [
    { label: "Món chính", value: DishEnum.MainDish },
    { label: "Món phụ", value: DishEnum.SideDish },
    { label: "Món canh", value: DishEnum.Soup },
    { label: "Món tráng miệng", value: DishEnum.Dessert },
    { label: "Đồ uống", value: DishEnum.Drink }
  ],
  UNITS: [
    { label: "g (gram)", value: "g" },
    { label: "ml (mililit)", value: "ml" }
  ],
  GENDERS: [
    { label: "Nam", value: GenderEnum.Male, icon: Man },
    { label: "Nữ", value: GenderEnum.Female, icon: Woman }
  ],
  GOALS: [
    {
      label: "Giảm cân",
      value: GoalEnum.WeightLoss,
      description: "Mục tiêu giảm cân và duy trì vóc dáng",
      icon: TrendingDown
    },
    {
      label: "Duy trì cân nặng",
      value: GoalEnum.Maintenance,
      description: "Mục tiêu duy trì cân nặng hiện tại",
      icon: Scale
    },
    {
      label: "Tăng cân",
      value: GoalEnum.WeightGain,
      description: "Mục tiêu tăng cân và cải thiện cơ thể",
      icon: TrendingUp
    }
  ],
  CALORIES_RATIO: [
    {
      label: "Giảm cân chậm",
      description: "0.25kg / tuần",
      value: 0.9
    },
    {
      label: "Giảm cân trung bình",
      description: "0.5kg / tuần",
      value: 0.8
    },
    {
      label: "Giảm cân nhanh",
      description: "0.75kg / tuần",
      value: 0.7
    },
    {
      label: "Duy trì cân nặng",
      description: "Không thay đổi",
      value: 1
    },
    {
      label: "Tăng cân chậm",
      description: "0.25kg / tuần",
      value: 1.1
    },
    {
      label: "Tăng cân trung bình",
      description: "0.5kg / tuần",
      value: 1.2
    },
    {
      label: "Giảm cân nhanh",
      description: "0.75kg / tuần",
      value: 1.3
    }
  ]
}

export const COLORS = {
  primary: "#334155",
  secondary: "#64748b",
  accent: "#94a3b8",
  border: "#e2e8f0",
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
