import { COLORS } from "@/constants/app"
import { TipsData } from "@/constants/tips"

/**
 * Tạm dừng thực thi trong một khoảng thời gian nhất định.
 * @param ms - Thời gian tạm dừng (tính bằng mili giây).
 * @returns Một promise sẽ hoàn thành sau khoảng thời gian đã chỉ định.
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Capitalize: Chuyển ký tự đầu tiên thành in hoa
 * @param str Chuỗi cần chuyển đổi
 * @returns Chuỗi đã capitalize
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Kiểm tra giá trị có phải null hoặc undefined
 * @param value Giá trị cần kiểm tra
 * @returns true nếu là null hoặc undefined
 */
export const isNil = (value: any) => value === null || value === undefined

/**
 * Lấy chữ cái viết tắt từ tên hoặc chuỗi
 * @param name Tên hoặc chuỗi cần lấy chữ cái viết tắt
 * @returns Chữ cái viết tắt (tối đa 2 chữ cái đầu tiên)
 */
export const getInitials = (name: string) => {
  const words = name
    .trim()
    .split(" ")
    .filter((word) => word.length > 0) // Lọc các từ rỗng
  return words
    .slice(0, 2) // Lấy tối đa 2 từ đầu tiên
    .map((word) => word[0].toUpperCase()) // Lấy chữ cái đầu tiên và chuyển thành chữ hoa
    .join("") // Kết hợp các chữ cái lại với nhau
}

/**
 * Lấy lời chào phù hợp dựa trên thời gian hiện tại
 * @returns Lời chào bằng tiếng Việt (Chào buổi sáng, Chào buổi chiều, Chào buổi tối)
 */
export const getGreeting = () => {
  const date = new Date()
  const hours = date.getHours()

  if (hours < 12) {
    return "Chào buổi sáng,"
  } else if (hours < 18) {
    return "Chào buổi chiều,"
  } else return "Chào buổi tối,"
}

/**
 * Lấy loại bữa ăn dựa trên thời gian hiện tại
 * @param {string} lang - Ngôn ngữ ("vi" cho tiếng Việt, "en" cho tiếng Anh)
 * @returns Loại bữa ăn theo ngôn ngữ (mặc định là tiếng Việt)
 */
export const getMealType = (lang: string = "vi") => {
  const date = new Date()
  const hours = date.getHours()

  const mealTypes: {
    [key: string]: { breakfast: string; lunch: string; dinner: string }
  } = {
    vi: {
      breakfast: "Bữa sáng",
      lunch: "Bữa trưa",
      dinner: "Bữa tối"
    },
    en: {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner"
    }
  }

  const selectedLang =
    mealTypes[lang as keyof typeof mealTypes] || mealTypes["vi"] // Default to Vietnamese

  if (hours < 10) {
    return selectedLang.breakfast
  } else if (hours < 18) {
    return selectedLang.lunch
  } else {
    return selectedLang.dinner
  }
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
 * Lấy màu sắc đại diện cho từng bài tập
 * @param label Tên bài tập (Thời gian, Kcal, Bước chân)
 * @returns Màu sắc đại diện cho bài tập (dùng trong UI)
 */
export const getWorkoutColor = (label: string) => {
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
 * Trả về đơn vị phù hợp dựa trên label.
 * @param label - Nhãn để xác định đơn vị.
 * @returns Đơn vị tương ứng dưới dạng chuỗi.
 */
export const getWorkoutUnit = (label: string) => {
  switch (label) {
    case "Đã nạp":
      return "kcal"
    case "Đã đốt":
      return "kcal"
    case "Thời gian":
      return "phút"
    case "Số bước":
      return "bước"
  }
}

/**
 * Chuyển đổi mealType từ tiếng Anh sang tiếng Việt.
 * @param mealType - Loại bữa ăn bằng tiếng Anh (Breakfast, Lunch, Dinner, Snack)
 * @returns Loại bữa ăn bằng tiếng Việt (Bữa sáng, Bữa trưa, Bữa tối, Bữa phụ)
 */
export const getMealTypeName = (mealType: string): string => {
  const translations: Record<string, string> = {
    Breakfast: "Bữa sáng",
    Lunch: "Bữa trưa",
    Dinner: "Bữa tối",
    Snack: "Bữa phụ"
  }
  return translations[mealType] || mealType
}

/**
 * Lấy hình ảnh đại diện cho từng loại bữa ăn
 * @param mealType - Loại bữa ăn (Breakfast, Lunch, Dinner, Snack)
 * @returns Hình ảnh đại diện của loại bữa ăn
 */
export const getMealTypeImage = (mealType: string) => {
  switch (mealType) {
    case "Breakfast":
      return require("../../public/icons/meals/sandwich.png")
    case "Lunch":
      return require("../../public/icons/meals/rice.png")
    case "Dinner":
      return require("../../public/icons/meals/roast-chicken.png")
    case "Snack":
      return require("../../public/icons/meals/cupcake.png")
    default:
      return require("../../public/icons/meals/dish.png")
  }
}

/**
 * Phân tích một chuỗi khẩu phần (portion) và trả về thông tin chi tiết về kích thước, trọng lượng và đơn vị khẩu phần.
 * @param value Chuỗi mô tả khẩu phần, ví dụ: `"ly (200 ml)"` hoặc `"g"`.
 * @param quantity Giá trị số lượng mặc định nếu không có thông tin trọng lượng hoặc đơn vị trong chuỗi.
 * @returns Đối tượng chứa:
 * - `portionSize`: Kích thước khẩu phần (ví dụ: `"ly"`, `"phần"`).
 * - `portionWeight`: Trọng lượng hoặc thể tích khẩu phần (ví dụ: `200`).
 * - `portionUnit`: Đơn vị khẩu phần (ví dụ: `"ml"`, `"g"`).
 */
export const parsePortion = (value: string, quantity: string) => {
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
 * Chuyển đổi chuỗi thời gian (HH:mm) thành đối tượng Date với ngày hiện tại.
 * @param timeString - Chuỗi thời gian theo định dạng "HH:mm".
 * @returns {Date} - Đối tượng Date với thời gian được đặt theo giờ và phút đã cho.
 */
export const convertTimeStringToDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

/**
 * Lấy ngẫu nhiên một lời khuyên (tip).
 * @returns Nội dung lời khuyên (tipContent).
 */
export const getRandomTip = () => {
  const randomIndex = Math.floor(Math.random() * TipsData.length)
  return TipsData[randomIndex].tipContent
}

/**
 * Chuyển đổi số sang định dạng tiền tệ Việt Nam (VND).
 * @param value - Giá trị số cần định dạng
 * @returns Chuỗi định dạng tiền tệ, ví dụ: "10.000 VND"
 */
export const formatCurrency = (value: number): string => {
  return value
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "VND")
}

/**
 * Tạo chuỗi UUID ngẫu nhiên.
 * @returns Chuỗi UUID ngẫu nhiên
 */
export const generateUUID = (): string => {
  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
  return template.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0 // Lấy số ngẫu nhiên từ 0 đến 15
    const value = char === "x" ? random : (random & 0x3) | 0x8 // Đảm bảo tính hợp lệ cho bit 13 và 16
    return value.toString(16) // Chuyển thành số hệ thập lục phân
  })
}
