import { DifficultyLevelEnum } from "./enums"

export const sampleExercisesData = [
  {
    exerciseId: "befbdedd-8795-4f9a-842a-00ea9b770f55",
    userId: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
    category: "Upper Body",
    name: "Roof Kickback",
    instructions: "Đứng gập người về trước, đẩy tay ra sau, giữ thẳng",
    duration: 45,
    caloriesBurned: 7,
    difficulty: DifficultyLevelEnum.Hard
  },
  {
    exerciseId: "05ece9e8-b50d-4269-acb5-023e839d1c42",
    userId: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
    category: "Cardio",
    name: "Pop Squats",
    instructions: "Nhảy sang tư thế squat, sau đó nhảy trở về",
    duration: 30,
    caloriesBurned: 9,
    difficulty: DifficultyLevelEnum.Medium
  },
  {
    exerciseId: "14399a61-ccab-4af5-91fb-04fdc1f92c20",
    userId: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
    category: "Mobility",
    name: "Bridges",
    instructions: "Nằm ngửa, nâng hông lên cao, giữ lưng thẳng",
    duration: 45,
    caloriesBurned: 4,
    difficulty: DifficultyLevelEnum.Medium
  },
  {
    exerciseId: "2ec9ee3b-2768-4ae4-9246-05cdac76a8a6",
    userId: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
    category: "Lower Body",
    name: "Single Calf Raises",
    instructions: "Đứng một chân, nâng gót chân lên xuống",
    duration: 30,
    caloriesBurned: 5,
    difficulty: DifficultyLevelEnum.Easy
  }
]
