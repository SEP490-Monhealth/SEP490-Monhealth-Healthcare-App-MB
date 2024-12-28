import { COLORS } from "@/constants/app"

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

export const getMealType = () => {
  const date = new Date()
  const hours = date.getHours()

  if (hours < 12) {
    return "Bữa sáng"
  } else if (hours < 18) {
    return "Bữa trưa"
  } else return "Bữa tối"
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
      return require("../../public/icons/sandwich.png")
    case "Lunch":
      return require("../../public/icons/rice.png")
    case "Dinner":
      return require("../../public/icons/roast-chicken.png")
    case "Snack":
      return require("../../public/icons/cupcake.png")
    default:
      return require("../../public/icons/dish.png")
  }
}
