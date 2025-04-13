import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import { TipsData } from "@/constants/data/tips"
import { BookingStatusEnum } from "@/constants/enum/Booking"
import { MealTypeEnum } from "@/constants/enum/Food"
import { PaymentStatusEnum } from "@/constants/enum/Payment"
import { RecurringDayEnum } from "@/constants/enum/Schedule"
import { DifficultyLevelEnum } from "@/constants/enum/Workout"

/**
 * Tạm dừng thực thi trong một khoảng thời gian nhất định.
 * @param ms - Thời gian tạm dừng (tính bằng mili giây).
 * @returns Một promise sẽ hoàn thành sau khoảng thời gian đã chỉ định.
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Chuyển ký tự đầu tiên của chuỗi thành in hoa.
 * @param str - Chuỗi cần chuyển đổi.
 * @returns Chuỗi đã được viết hoa ký tự đầu tiên.
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Tạo chuỗi UUID ngẫu nhiên.
 * @returns Chuỗi UUID ngẫu nhiên.
 */
export const generateUUID = (): string => {
  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
  return template.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0
    const value = char === "x" ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

/**
 * Lấy chữ cái viết tắt từ tên hoặc chuỗi.
 * @param name - Tên hoặc chuỗi cần lấy chữ cái viết tắt.
 * @returns Chữ cái viết tắt (tối đa 2 chữ cái đầu tiên).
 */
export const getInitials = (name: string): string => {
  const words = name
    .trim()
    .split(" ")
    .filter((word) => word.length > 0)
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("")
}

/**
 * Lấy ngẫu nhiên một lời khuyên (tip).
 * @returns Nội dung lời khuyên (tipContent).
 */
export const getRandomTip = (): string => {
  const randomIndex = Math.floor(Math.random() * TipsData.length)
  return TipsData[randomIndex].tipContent
}

/**
 * Lấy lời chào phù hợp dựa trên thời gian hiện tại.
 * @returns Lời chào bằng tiếng Việt (Chào buổi sáng, Chào buổi chiều, Chào buổi tối).
 */
export const getGreeting = (): string => {
  const date = new Date()
  const hours = date.getHours()

  if (hours < 12) {
    return "Chào buổi sáng,"
  } else if (hours < 18) {
    return "Chào buổi chiều,"
  } else {
    return "Chào buổi tối,"
  }
}

/**
 * Chuyển đổi chuỗi thời gian (HH:mm) thành đối tượng Date với ngày hiện tại.
 * @param timeString - Chuỗi thời gian theo định dạng "HH:mm".
 * @returns {Date} - Đối tượng Date với thời gian được đặt theo giờ và phút đã cho.
 */
export const convertDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

/**
 * Lấy loại bữa ăn dựa trên thời gian hiện tại.
 * @param lang - Ngôn ngữ ("vi" cho tiếng Việt, "en" cho tiếng Anh).
 * @returns Loại bữa ăn theo ngôn ngữ (mặc định là tiếng Việt).
 */
export const getMealType = (lang: string = "vi"): string => {
  const date = new Date()
  const hours = date.getHours()

  // Định nghĩa các loại bữa ăn
  const mealTypes: { [key: string]: { [key in MealTypeEnum]: string } } = {
    vi: {
      [MealTypeEnum.Breakfast]: "Bữa sáng",
      [MealTypeEnum.Lunch]: "Bữa trưa",
      [MealTypeEnum.Dinner]: "Bữa tối",
      [MealTypeEnum.Snack]: "Bữa phụ"
    },
    en: {
      [MealTypeEnum.Breakfast]: "Breakfast",
      [MealTypeEnum.Lunch]: "Lunch",
      [MealTypeEnum.Dinner]: "Dinner",
      [MealTypeEnum.Snack]: "Snack"
    }
  }

  // Xác định bữa ăn dựa trên giờ hiện tại
  let meal: MealTypeEnum

  if (hours >= 5 && hours < 10) {
    meal = MealTypeEnum.Breakfast
  } else if (hours >= 10 && hours < 15) {
    meal = MealTypeEnum.Lunch
  } else {
    meal = MealTypeEnum.Dinner
  }

  // Trả về tên bữa ăn theo ngôn ngữ yêu cầu
  return mealTypes[lang][meal]
}

export const getMealTypeByTime = (): MealTypeEnum => {
  const date = new Date()
  const hours = date.getHours()

  if (hours >= 5 && hours < 10) {
    return MealTypeEnum.Breakfast
  } else if (hours >= 10 && hours < 15) {
    return MealTypeEnum.Lunch
  } else if (hours >= 15 && hours < 21) {
    return MealTypeEnum.Dinner
  } else {
    return MealTypeEnum.Snack
  }
}

export const getMealTypeName = (
  lang: string = "vi",
  value: MealTypeEnum
): string | undefined => {
  const meal = DATA.MEALS.find((meal) => meal.value === value) || DATA.MEALS[0]
  return lang === "vi" ? meal.label : meal.engLabel
}

/**
 * Lấy màu sắc đại diện cho từng chất dinh dưỡng
 * @param label Tên chất dinh dưỡng (Protein, Carbs, Fat, Fiber, Sugar)
 * @returns Màu sắc đại diện cho chất dinh dưỡng (dùng trong UI)
 */
export const getNutritionColor = (label: string) => {
  switch (label) {
    case "Protein":
      return COLORS.NUTRITION.protein
    case "Carbs":
      return COLORS.NUTRITION.carbs
    case "Fat":
      return COLORS.NUTRITION.fat
    case "Fiber":
      return COLORS.NUTRITION.fiber
    case "Sugar":
      return COLORS.NUTRITION.sugar
    default:
      return COLORS.secondary
  }
}

/**
 * Lấy màu sắc đại diện cho từng bài tập.
 * @param label - Tên bài tập (Thời gian, Kcal, Bước chân).
 * @returns Màu sắc đại diện cho bài tập (dùng trong UI).
 */
export const getWorkoutColor = (label: string): string => {
  switch (label) {
    case "Đã nạp":
      return COLORS.WORKOUT.caloriesIntake
    case "Đã đốt":
      return COLORS.WORKOUT.caloriesBurned
    case "Thời gian":
      return COLORS.WORKOUT.duration
    case "Đã bước":
      return COLORS.WORKOUT.steps
    default:
      return COLORS.secondary
  }
}

/**
 * Trả về đơn vị phù hợp dựa trên label bài tập.
 * @param label - Nhãn để xác định đơn vị.
 * @returns Đơn vị tương ứng dưới dạng chuỗi.
 */
export const getWorkoutUnit = (label: string): string => {
  switch (label) {
    case "Đã nạp":
    case "Đã đốt":
      return "kcal"
    case "Thời gian":
      return "phút"
    case "Số bước":
      return "bước"
    default:
      return ""
  }
}

/**
 * Lấy hình ảnh đại diện cho từng loại bữa ăn.
 * @param mealType - Loại bữa ăn (Breakfast, Lunch, Dinner, Snack).
 * @returns Hình ảnh đại diện của loại bữa ăn.
 */
export const getMealTypeImage = (mealType: MealTypeEnum) => {
  switch (mealType) {
    case MealTypeEnum.Breakfast:
      return require("../../public/icons/meals/sandwich.png")
    case MealTypeEnum.Lunch:
      return require("../../public/icons/meals/rice.png")
    case MealTypeEnum.Dinner:
      return require("../../public/icons/meals/roast-chicken.png")
    case MealTypeEnum.Snack:
      return require("../../public/icons/meals/cupcake.png")
    default:
      return require("../../public/icons/meals/dish.png")
  }
}

/**
 *
 * @param value
 * @returns
 */
export const getMealIcon = (value: MealTypeEnum): React.ElementType | null => {
  return DATA.MEALS.find((item) => item.value === value)?.icon || null
}

/**
 * Phân tích một chuỗi khẩu phần (portion) và trả về thông tin chi tiết về kích thước, trọng lượng và đơn vị khẩu phần.
 * @param value - Chuỗi mô tả khẩu phần, ví dụ: "ly (200 ml)" hoặc "g".
 * @param quantity - Giá trị số lượng mặc định nếu không có thông tin trọng lượng hoặc đơn vị trong chuỗi.
 * @returns Đối tượng chứa:
 * - `portionSize`: Kích thước khẩu phần (ví dụ: "ly", "phần").
 * - `portionWeight`: Trọng lượng hoặc thể tích khẩu phần (ví dụ: `200`).
 * - `portionUnit`: Đơn vị khẩu phần (ví dụ: "ml", "g").
 */
export const parsePortion = (
  value: string,
  quantity: string
): { portionSize: string; portionWeight: number; portionUnit: string } => {
  const selectedPortionMatch = value.match(/(.+?) \((\d+) (\w+)\)/)

  let portionSize = selectedPortionMatch ? selectedPortionMatch[1] : value
  const portionWeight = selectedPortionMatch
    ? parseInt(selectedPortionMatch[2], 10)
    : parseInt(quantity, 10)
  const portionUnit = selectedPortionMatch ? selectedPortionMatch[3] : "g"

  if (portionSize === "g" || portionSize === "ml") {
    portionSize = "phần"
  }

  return { portionSize, portionWeight, portionUnit }
}

/**
 *
 * @param value
 * @returns
 */
export const parseJSON = (json: string[]): string[] => {
  if (Array.isArray(json) && json.length > 0) {
    return json[0].split("\n")
  }

  return []
}

/**
 *
 * @param value
 * @returns
 */
export const getBookingLabel = (value: BookingStatusEnum): string => {
  return DATA.BOOKINGS.find((item) => item.value === value)?.label || ""
}

/**
 *
 * @param value
 * @returns
 */
export const getBookingColor = (value: BookingStatusEnum): string => {
  return DATA.BOOKINGS.find((item) => item.value === value)?.color || ""
}

/**
 *
 * @param value
 * @returns
 */
export const getBookingIcon = (
  value: BookingStatusEnum
): React.ElementType | null => {
  return DATA.BOOKINGS.find((item) => item.value === value)?.icon || null
}

/**
 *
 * @param value
 * @returns
 */
export const getDayLabel = (value: RecurringDayEnum): string => {
  return DATA.DAY_OF_WEEK.find((item) => item.value === value)?.label || ""
}

/**
 *
 * @param value
 * @returns
 */
export const getDifficultyLevelLabel = (value: DifficultyLevelEnum): string => {
  return (
    DATA.DIFFICULTY_LEVELS.find((item) => item.value === value)?.label || ""
  )
}

export const getMeasurementUnitLabel = (value: string): string => {
  return (
    DATA.MEASUREMENT_UNITS.find((item) => item.value === value)?.label || ""
  )
}

export const getSubscriptionColor = (value: string): string => {
  return DATA.SUBSCRIPTIONS.find((item) => item.value === value)?.color || ""
}

/**
 *
 * @param status
 * @returns
 */
export const getPaymentLabel = (status: PaymentStatusEnum): string => {
  return DATA.PAYMENTS.find((item) => item.value === status)?.label || ""
}

/**
 *
 * @param status
 * @returns
 */
export const getPaymentColor = (status: PaymentStatusEnum): string => {
  return DATA.PAYMENTS.find((item) => item.value === status)?.color || ""
}

export const getWeekRange = (dateString: string) => {
  const date = new Date(dateString)

  const day = date.getDay() || 7
  const monday = new Date(date)
  monday.setDate(date.getDate() - day + 1)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const start = monday.getDate()
  const end = sunday.getDate()
  const monthNumber = sunday.getMonth() + 1
  const year = sunday.getFullYear()

  return `${start} - ${end} Tháng ${monthNumber} ${year}`
}

export const getMonthRange = (startMonthStr: string, endMonthStr?: string) => {
  const startDate = new Date(startMonthStr)
  const startMonth = startDate.getMonth() + 1
  const year = startDate.getFullYear()

  if (!endMonthStr) {
    return `Tháng ${startMonth} ${year}`
  }

  const endDate = new Date(endMonthStr)
  const endMonth = endDate.getMonth() + 1

  if (startDate.getFullYear() === endDate.getFullYear()) {
    return `Tháng ${startMonth} - ${endMonth} ${year}`
  } else {
    return `T${startMonth} ${startDate.getFullYear()} - T${endMonth} ${endDate.getFullYear()}`
  }
}
