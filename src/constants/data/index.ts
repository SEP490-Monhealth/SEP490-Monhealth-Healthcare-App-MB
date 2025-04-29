import {
  Calendar,
  Calendar1,
  Calendar2,
  CalendarCircle,
  CalendarSearch,
  Camera,
  GalleryAdd,
  Man,
  Woman
} from "iconsax-react-native"
import { Scale, TrendingDown, TrendingUp } from "lucide-react-native"

import { DishTypeEnum, MealTypeEnum } from "../enum/Food"
import { GenderEnum } from "../enum/Gender"
import { GoalTypeEnum } from "../enum/Goal"
import { RecurringDayEnum, ScheduleTimeSlotStatusEnum } from "../enum/Schedule"
import { DifficultyLevelEnum } from "../enum/Workout"

export const DATA = {
  MEALS: [
    {
      label: "Bữa sáng",
      engLabel: "Breakfast",
      value: MealTypeEnum.Breakfast,
      ratio: 30,
      icon: require("../../../public/icons/sandwich.png")
    },
    {
      label: "Bữa trưa",
      engLabel: "Lunch",
      value: MealTypeEnum.Lunch,
      ratio: 35,
      icon: require("../../../public/icons/rice.png")
    },
    {
      label: "Bữa tối",
      engLabel: "Dinner",
      value: MealTypeEnum.Dinner,
      ratio: 25,
      icon: require("../../../public/icons/roast-chicken.png")
    },
    {
      label: "Bữa phụ",
      engLabel: "Snack",
      value: MealTypeEnum.Snack,
      ratio: 10,
      icon: require("../../../public/icons/cupcake.png")
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
      label: "Ít vận động",
      description:
        "Hầu như không tập thể dục, công việc văn phòng chủ yếu ngồi",
      value: 1.2,
      icon: Calendar2
    },
    {
      label: "Nhẹ",
      description: "Đi bộ nhẹ 1-3 lần/tuần, công việc ít đi lại",
      value: 1.375,
      icon: CalendarSearch
    },
    {
      label: "Vừa phải",
      description:
        "Tập thể dục vừa phải 3-5 lần/tuần (đi bộ nhanh, chạy bộ nhẹ)",
      value: 1.55,
      icon: Calendar
    },
    {
      label: "Năng động",
      description: "Tập luyện tích cực 5-7 lần/tuần (chạy bộ, đạp xe, bơi lội)",
      value: 1.725,
      icon: Calendar1
    },
    {
      label: "Rất năng động",
      description: "Vận động viên hoặc tập luyện cường độ cao hàng ngày",
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
    { label: "Tăng cân nhanh", description: "0.75kg / tuần", value: 1.3 }
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
  DAY_OF_WEEK: [
    { label: "Chủ Nhật", shortLabel: "CN", value: RecurringDayEnum.Sun },
    { label: "Thứ 2", shortLabel: "T2", value: RecurringDayEnum.Mon },
    { label: "Thứ 3", shortLabel: "T3", value: RecurringDayEnum.Tue },
    { label: "Thứ 4", shortLabel: "T4", value: RecurringDayEnum.Wed },
    { label: "Thứ 5", shortLabel: "T5", value: RecurringDayEnum.Thu },
    { label: "Thứ 6", shortLabel: "T6", value: RecurringDayEnum.Fri },
    { label: "Thứ 7", shortLabel: "T7", value: RecurringDayEnum.Sat }
  ],
  EXERCISE_TYPES: [
    { label: "Thời gian", value: "duration" },
    { label: "Lần", value: "reps" }
  ],
  DIFFICULTY_LEVELS: [
    { label: "Mức dễ", value: DifficultyLevelEnum.Easy },
    { label: "Mức trung bình", value: DifficultyLevelEnum.Medium },
    { label: "Mức khó", value: DifficultyLevelEnum.Hard }
  ],
  SUBSCRIPTIONS: [
    { label: "Gói Cơ Bản", value: "Member", color: "#22c55e" },
    { label: "Gói Nâng Cao", value: "Subscription Member", color: "#eab308" },
    { label: "Gói Cao Cấp", value: "Subscription Member", color: "#ef4444" }
  ]
}
