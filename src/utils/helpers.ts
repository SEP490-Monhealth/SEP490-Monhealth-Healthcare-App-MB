import { COLORS, DATA } from "@/constants/app"
import { MealEnum } from "@/constants/enums"
import { TipsData } from "@/constants/tips"

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
  const mealTypes: { [key: string]: { [key in MealEnum]: string } } = {
    vi: {
      [MealEnum.Breakfast]: "Bữa sáng",
      [MealEnum.Lunch]: "Bữa trưa",
      [MealEnum.Dinner]: "Bữa tối",
      [MealEnum.Snack]: "Bữa phụ"
    },
    en: {
      [MealEnum.Breakfast]: "Breakfast",
      [MealEnum.Lunch]: "Lunch",
      [MealEnum.Dinner]: "Dinner",
      [MealEnum.Snack]: "Snack"
    }
  }

  // Xác định bữa ăn dựa trên giờ hiện tại
  let meal: MealEnum

  if (hours >= 5 && hours < 10) {
    meal = MealEnum.Breakfast
  } else if (hours >= 10 && hours < 15) {
    meal = MealEnum.Lunch
  } else {
    meal = MealEnum.Dinner
  }

  // Trả về tên bữa ăn theo ngôn ngữ yêu cầu
  return mealTypes[lang][meal]
}

export const getMealTypeByTime = (): MealEnum => {
  const date = new Date()
  const hours = date.getHours()

  if (hours >= 5 && hours < 10) {
    return MealEnum.Breakfast
  } else if (hours >= 10 && hours < 15) {
    return MealEnum.Lunch
  } else if (hours >= 15 && hours < 21) {
    return MealEnum.Dinner
  } else {
    return MealEnum.Snack
  }
}

export const getMealTypeName = (
  lang: string = "vi",
  value: MealEnum
): string | undefined => {
  const meal = DATA.MEALS.find((meal) => meal.value === value) || DATA.MEALS[0]
  return lang === "vi" ? meal.label : meal.eLabel
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
    case "Số bước":
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
export const getMealTypeImage = (mealType: MealEnum) => {
  switch (mealType) {
    case MealEnum.Breakfast:
      return require("../../public/icons/meals/sandwich.png")
    case MealEnum.Lunch:
      return require("../../public/icons/meals/rice.png")
    case MealEnum.Dinner:
      return require("../../public/icons/meals/roast-chicken.png")
    case MealEnum.Snack:
      return require("../../public/icons/meals/cupcake.png")
    default:
      return require("../../public/icons/meals/dish.png")
  }
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
 * Lấy nhãn (label) từ danh sách giá trị.
 * @param values - Mảng giá trị cần lấy nhãn.
 * @param data - Mảng dữ liệu chứa cặp {label, value}.
 * @returns Mảng các nhãn tương ứng với giá trị đầu vào.
 */
export const getLabelsFromValues = (
  values: number[],
  data: { label: string; value: number }[]
): string[] => {
  return values.map((value) => {
    const item = data.find((d) => d.value === value) // So khớp kiểu number
    return item ? item.label : value.toString() // Trả về label hoặc chính giá trị
  })
}

/**
 * Lấy giá trị chuỗi tương ứng từ enum.
 * @param value - Giá trị số của enum.
 * @param enumObj - Enum được sử dụng để ánh xạ.
 * @returns Chuỗi tương ứng với giá trị enum.
 */
export function getEnumValue<T extends Record<number, string>>(
  value: number,
  enumObj: T
): string {
  return enumObj[value] ?? "Unknown"
}
