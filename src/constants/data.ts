import { Dimensions } from "react-native"

import {
  Calendar,
  Calendar1,
  Calendar2,
  CalendarAdd,
  CalendarCircle,
  CalendarRemove,
  CalendarSearch,
  CalendarTick,
  Camera,
  GalleryAdd,
  Man,
  Woman
} from "iconsax-react-native"
import {
  BicepsFlexed,
  Scale,
  TrendingDown,
  TrendingUp
} from "lucide-react-native"

import { BookingStatusEnum } from "./enum/BookingStatus"
import { DifficultyLevelEnum } from "./enum/DifficultyLevel"
import { DishTypeEnum } from "./enum/DishType"
import { GenderEnum } from "./enum/Gender"
import { GoalTypeEnum } from "./enum/GoalType"
import { MealTypeEnum } from "./enum/MealType"
import { RecurringDayEnum } from "./enum/RecurringDay"
import { ScheduleTimeSlotStatusEnum } from "./enum/ScheduleTimeSlotStatus"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

export const DATA = {
  SHEET_HEIGHTS: {
    MIN_HEIGHT: 160,
    MAX_HEIGHT:
      (typeof SCREEN_HEIGHT !== "undefined" ? SCREEN_HEIGHT : 800) * 0.8,
    ITEM_HEIGHT: (length: number) => {
      if (length === 3) return 80
      if (length > 4) return 70
      if (length > 5) return 60
      return 100
    }
  },
  MEALS: [
    {
      label: "Bữa sáng",
      engLabel: "Breakfast",
      value: MealTypeEnum.Breakfast,
      ratio: 30,
      icon: require("../../public/icons/meals/sandwich.png")
    },
    {
      label: "Bữa trưa",
      engLabel: "Lunch",
      value: MealTypeEnum.Lunch,
      ratio: 35,
      icon: require("../../public/icons/meals/rice.png")
    },
    {
      label: "Bữa tối",
      engLabel: "Dinner",
      value: MealTypeEnum.Dinner,
      ratio: 25,
      icon: require("../../public/icons/meals/roast-chicken.png")
    },
    {
      label: "Bữa phụ",
      engLabel: "Snack",
      value: MealTypeEnum.Snack,
      ratio: 10,
      icon: require("../../public/icons/meals/cupcake.png")
    }
  ],
  DISHES: [
    { label: "Món chính", value: DishTypeEnum.MainDish },
    { label: "Món phụ", value: DishTypeEnum.SideDish },
    { label: "Món canh", value: DishTypeEnum.Soup },
    { label: "Món tráng miệng", value: DishTypeEnum.Dessert },
    { label: "Đồ uống", value: DishTypeEnum.Drink }
  ],
  MEASUREMENT_UNITS: [
    { label: "g (gram)", value: "g" },
    { label: "ml (mililit)", value: "ml" }
  ],
  GENDERS: [
    { label: "Nam", value: GenderEnum.Male, icon: Man },
    { label: "Nữ", value: GenderEnum.Female, icon: Woman }
  ],
  ACTIVITY_LEVELS: [
    {
      label: "0 buổi / tuần",
      value: 1.2,
      icon: Calendar2
    },
    {
      label: "1 - 3 buổi / tuần",
      value: 1.375,
      icon: CalendarSearch
    },
    {
      label: "3 - 5 buổi / tuần",
      value: 1.55,
      icon: Calendar
    },
    {
      label: "6 - 7 buổi / tuần",
      value: 1.725,
      icon: Calendar1
    },
    {
      label: "Hơn 7 buổi / tuần",
      value: 1.9,
      icon: CalendarCircle
    }
  ],
  GOALS: [
    {
      label: "Giảm cân",
      description: "Mục tiêu giảm cân và duy trì vóc dáng",
      value: GoalTypeEnum.WeightLoss,
      icon: TrendingDown
    },
    {
      label: "Duy trì cân nặng",
      description: "Mục tiêu duy trì cân nặng hiện tại",
      value: GoalTypeEnum.Maintenance,
      icon: Scale
    },
    {
      label: "Tăng cân",
      description: "Mục tiêu tăng cân và cải thiện cơ thể",
      value: GoalTypeEnum.WeightGain,
      icon: TrendingUp
    }
    // {
    //   label: "Tăng cơ",
    //   description: "Mục tiêu tăng cơ và giảm mỡ",
    //   value: GoalTypeEnum.MuscleGain,
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
  WORKOUTS: [
    { label: "Đã nạp", unit: "kcal", color: "#16a34a" },
    { label: "Đã đốt", unit: "kcal", color: "#ef4444" },
    { label: "Thời gian", unit: "phút", color: "#f97316" },
    { label: "Đã bước", unit: "bước", color: "#3b82f6" }
  ],
  UPLOADS: [
    {
      label: "Chọn ảnh từ thư viện",
      value: "library",
      icon: GalleryAdd
    },
    {
      label: "Chụp ảnh từ camera",
      value: "camera",
      icon: Camera
    }
  ],
  SCHEDULES: [
    {
      label: "Có sẵn",
      value: ScheduleTimeSlotStatusEnum.Available,
      color: "#16a34a"
    },
    {
      label: "Không có sẵn",
      value: ScheduleTimeSlotStatusEnum.Unavailable,
      color: "#ef4444"
    },
    {
      label: "Đã đặt",
      value: ScheduleTimeSlotStatusEnum.Booked,
      color: "#ca8a04"
    }
  ],
  BOOKINGS: [
    {
      label: "Chờ xác nhận",
      value: BookingStatusEnum.Pending,
      icon: CalendarAdd,
      color: "#ca8a04"
    },
    {
      label: "Đã xác nhận",
      value: BookingStatusEnum.Confirmed,
      icon: Calendar,
      color: "#16a34a"
    },
    {
      label: "Hoàn thành",
      value: BookingStatusEnum.Completed,
      icon: CalendarTick,
      color: "#3b82f6"
    },
    {
      label: "Đã hủy",
      value: BookingStatusEnum.Cancelled,
      icon: CalendarRemove,
      color: "#ef4444"
    }
  ],
  DAY_OF_WEEK: [
    { label: "Thứ 2", shortLabel: "T2", value: RecurringDayEnum.Mon },
    { label: "Thứ 3", shortLabel: "T3", value: RecurringDayEnum.Tue },
    { label: "Thứ 4", shortLabel: "T4", value: RecurringDayEnum.Wed },
    { label: "Thứ 5", shortLabel: "T5", value: RecurringDayEnum.Thu },
    { label: "Thứ 6", shortLabel: "T6", value: RecurringDayEnum.Fri },
    { label: "Thứ 7", shortLabel: "T7", value: RecurringDayEnum.Sat },
    { label: "Chủ Nhật", shortLabel: "CN", value: RecurringDayEnum.Sun }
  ],
  EXERCISE_TYPES: [
    { label: "Thời gian", value: "duration" },
    { label: "Lần", value: "reps" }
  ],
  DIFFICULTY_LEVELS: [
    { label: "Mức dễ", value: DifficultyLevelEnum.Easy },
    { label: "Mức trung bình", value: DifficultyLevelEnum.Medium },
    { label: "Mức khó", value: DifficultyLevelEnum.Hard }
  ]
}
