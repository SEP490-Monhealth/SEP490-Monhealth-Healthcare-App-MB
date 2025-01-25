import { Diff } from "lucide-react-native"

import { DifficultyLevelEnum } from "./enums"

export const sampleWorkoutData = {
  name: "Yoga",
  description:
    "Các bài tập tập trung vào việc cải thiện sự linh hoạt, thăng bằng, và giảm căng thẳng thông qua các tư thế và kỹ thuật thở. Phù hợp cho mọi lứa tuổi và thể trạng",
  totalExercise: 4,
  totalDuration: 45,
  totalCaloriesBurned: 250,
  items: [
    {
      exerciseId: "befbdedd-8795-4f9a-842a-00ea9b770f55",
      userId: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
      category: "Upper Body",
      name: "Roof Kickback",
      description: "",
      duration: 45,
      caloriesBurned: 7,
      instructions: "Đứng gập người về trước, đẩy tay ra sau, giữ thẳng",
      difficultyLevel: DifficultyLevelEnum.Hard,
      status: true,
      createdAt: "2025-01-06T00:00:00",
      updatedAt: "2025-01-06T00:00:00",
      createdBy: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
      updatedBy: "3026595f-1414-4b74-be8f-11b7f6e7f4f6"
    },
    {
      exerciseId: "05ece9e8-b50d-4269-acb5-023e839d1c42",
      userId: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
      category: "Cardio",
      name: "Pop Squats",
      description: "",
      duration: 30,
      caloriesBurned: 9,
      instructions: "Nhảy sang tư thế squat, sau đó nhảy trở về",
      difficultyLevel: DifficultyLevelEnum.Medium
    },
    {
      exerciseId: "14399a61-ccab-4af5-91fb-04fdc1f92c20",
      userId: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
      category: "Mobility",
      name: "Bridges",
      description: "",
      duration: 45,
      caloriesBurned: 4,
      instructions: "Nằm ngửa, nâng hông lên cao, giữ lưng thẳng",
      difficultyLevel: DifficultyLevelEnum.Medium
    },
    {
      exerciseId: "2ec9ee3b-2768-4ae4-9246-05cdac76a8a6",
      userId: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
      category: "Lower Body",
      name: "Single Calf Raises",
      description: "",
      duration: 30,
      caloriesBurned: 5,
      instructions: "Đứng một chân, nâng gót chân lên xuống",
      difficultyLevel: DifficultyLevelEnum.Easy
    }
  ],
  createdAt: "2025-01-06T00:00:00Z",
  updatedAt: "2025-01-06T00:00:00Z"
}
