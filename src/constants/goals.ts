import { ImageSourcePropType } from "react-native"

export type GoalType = {
  title: string
  description: string
  image: ImageSourcePropType
  carbs: number
  protein: number
  fat: number
}

export const goalsData: GoalType[] = [
  {
    title: "Giảm cân",
    description:
      "Tỷ lệ này giúp giảm lượng tinh bột (Carbs), tăng Protein để duy trì cơ bắp, cân bằng với chất béo vừa phải, giúp cơ thể đốt cháy mỡ thừa hiệu quả và hỗ trợ giảm cân an toàn theo kế hoạch cụ thể đã định.",
    image: require("../../public/images/vegetable-card.jpg"),
    carbs: 40,
    protein: 30,
    fat: 30
  },
  {
    title: "Giữ cân",
    description:
      "Tỷ lệ này giúp duy trì năng lượng ổn định và cân bằng dinh dưỡng, tạo nền tảng sức khỏe bền vững. Cơ thể nhận đủ dưỡng chất cần thiết để duy trì cân nặng hiện tại một cách lâu dài mà không bị thiếu hụt.",
    image: require("../../public/images/vegetable-card.jpg"),
    carbs: 50,
    protein: 25,
    fat: 25
  },
  {
    title: "Tăng cân",
    description:
      "Tăng lượng Carbs để cung cấp năng lượng dư thừa cần thiết cho việc tăng cân. Kết hợp Protein hỗ trợ phát triển cơ bắp và chất béo giúp tăng cường calo tổng thể để đạt được mục tiêu tăng cân an toàn.",
    image: require("../../public/images/vegetable-card.jpg"),
    carbs: 55,
    protein: 20,
    fat: 25
  }
]
