import { ExerciseType } from "@/schemas/exercieSchema"

export const sampleExerciseData: ExerciseType[] = [
  {
    exerciseId: "51887443-a218-4f3d-aeec-5ae67bf0a9e6",
    categoryId: "d27e49f7-de9a-41bb-914b-0a2436617568",
    exerciseName: "Chống đẩy",
    exerciseDescription:
      "Bài tập tăng cường sức mạnh cơ thể ở phần thân trên được thực hiện ở tư thế nằm sấp.",
    image: "../../public/icons/workouts/balance-training.png",
    duration: 30,
    caloriesBurned: 300,
    instructions:
      "1. Bắt đầu ở tư thế plank. \n2. Hạ thấp người cho đến khi ngực gần chạm sàn. \n3. Đẩy người lên vị trí bắt đầu. \n4. Lặp lại.",
    intensityLevel: "Medium",
    difficultyLevel: "Medium",
    status: true,
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    exerciseId: "fbd54efc-410d-4e9c-a99e-31d84ff89eba",
    categoryId: "d27e49f7-de9a-41bb-914b-0a2436617568",
    exerciseName: "Squat",
    exerciseDescription:
      "Bài tập tăng cường sức mạnh phần thân dưới, nhắm vào đùi, hông và mông.",
    image: "../../public/icons/workouts/stretching.png",
    duration: 30,
    caloriesBurned: 270,
    instructions:
      "1. Đứng thẳng với hai chân rộng bằng vai. \n2. Hạ thấp hông cho đến khi đùi song song với sàn. \n3. Quay trở lại vị trí bắt đầu. \n4. Lặp lại.",
    intensityLevel: "Low",
    difficultyLevel: "Low",
    status: true,
    createdAt: "2025-01-06T01:00:00Z",
    updatedAt: "2025-01-06T01:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  }
]
