import {
  Calendar,
  CalendarAdd,
  CalendarRemove,
  CalendarTick,
  Man,
  Woman
} from "iconsax-react-native"
import {
  BicepsFlexed,
  Scale,
  TrendingDown,
  TrendingUp
} from "lucide-react-native"

import {
  GenderEnum,
  StatusBookingEnum,
  StatusScheduleEnum,
  TypeDishEnum,
  TypeGoalEnum,
  TypeMealEnum
} from "./enums"

export const DATA = {
  MEALS: [
    {
      label: "Bữa sáng",
      eLabel: "Breakfast",
      value: TypeMealEnum.Breakfast,
      ratio: 30,
      icon: require("../../public/icons/meals/sandwich.png")
    },
    {
      label: "Bữa trưa",
      eLabel: "Lunch",
      value: TypeMealEnum.Lunch,
      ratio: 35,
      icon: require("../../public/icons/meals/rice.png")
    },
    {
      label: "Bữa tối",
      eLabel: "Dinner",
      value: TypeMealEnum.Dinner,
      ratio: 25,
      icon: require("../../public/icons/meals/roast-chicken.png")
    },
    {
      label: "Bữa phụ",
      eLabel: "Snack",
      value: TypeMealEnum.Snack,
      ratio: 10,
      icon: require("../../public/icons/meals/cupcake.png")
    }
  ],
  DISHES: [
    { label: "Món chính", value: TypeDishEnum.MainDish },
    { label: "Món phụ", value: TypeDishEnum.SideDish },
    { label: "Món canh", value: TypeDishEnum.Soup },
    { label: "Món tráng miệng", value: TypeDishEnum.Dessert },
    { label: "Đồ uống", value: TypeDishEnum.Drink }
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
      description: "Mục tiêu giảm cân và duy trì vóc dáng",
      value: TypeGoalEnum.WeightLoss,
      icon: TrendingDown
    },
    {
      label: "Duy trì cân nặng",
      description: "Mục tiêu duy trì cân nặng hiện tại",
      value: TypeGoalEnum.Maintenance,
      icon: Scale
    },
    {
      label: "Tăng cân",
      description: "Mục tiêu tăng cân và cải thiện cơ thể",
      value: TypeGoalEnum.WeightGain,
      icon: TrendingUp
    }
    // {
    //   label: "Tăng cơ",
    //   description: "Mục tiêu tăng cơ và giảm mỡ",
    //   value: TypeGoalEnum.MuscleGain,
    //   icon: BicepsFlexed
    // }
  ],
  CALORIES_RATIO: [
    { label: "Giảm cân chậm", description: "0.25kg / tuần", value: 0.9 },
    { label: "Giảm cân trung bình", description: "0.5kg / tuần", value: 0.8 },
    { label: "Giảm cân nhanh", description: "0.75kg / tuần", value: 0.7 },
    { label: "Duy trì cân nặng", description: "Không thay đổi", value: 1 },
    { label: "Tăng cân chậm", description: "0.25kg / tuần", value: 1.1 },
    { label: "Tăng cân trung bình", description: "0.5kg / tuần", value: 1.2 },
    { label: "Giảm cân nhanh", description: "0.75kg / tuần", value: 1.3 }
  ],
  SCHEDULES: [
    { label: "Có sẵn", value: StatusScheduleEnum.Available, color: "#16a34a" },
    {
      label: "Không có sẵn",
      value: StatusScheduleEnum.Unavailable,
      color: "#ef4444"
    },
    { label: "Đã đặt", value: StatusScheduleEnum.Booked, color: "#ca8a04" }
  ],
  BOOKINGS: [
    {
      label: "Chờ xác nhận",
      value: StatusBookingEnum.Pending,
      icon: CalendarAdd,
      color: "#ca8a04"
    },
    {
      label: "Đã xác nhận",
      value: StatusBookingEnum.Confirmed,
      icon: Calendar,
      color: "#16a34a"
    },
    {
      label: "Hoàn thành",
      value: StatusBookingEnum.Completed,
      icon: CalendarTick,
      color: "#3b82f6"
    },
    {
      label: "Đã hủy",
      value: StatusBookingEnum.Cancelled,
      icon: CalendarRemove,
      color: "#ef4444"
    }
  ]
}
