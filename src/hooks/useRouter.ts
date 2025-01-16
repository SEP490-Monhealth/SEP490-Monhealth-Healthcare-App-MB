import { useRouter } from "expo-router"

export const useRouterHandlers = () => {
  const router = useRouter()

  const handleViewMeal = (mealId: string) => {
    router.push(`/meals/${mealId}/details`)
  }

  const handleViewFood = (foodId: string) => {
    router.push(`/foods/${foodId}/details`)
  }

  const handleViewWaterReminder = (waterReminderId: string) => {
    router.push(`/waterReminders/${waterReminderId}/details`)
  }

  const handleViewExerciseCategory = (typeId: string) => {
    router.push(`/workouts/${typeId}/details`)
  }

  return {
    handleViewFood,
    handleViewMeal,
    handleViewWaterReminder,
    handleViewExerciseCategory
  }
}
