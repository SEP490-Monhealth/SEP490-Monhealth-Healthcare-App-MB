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
    router.push(`/water-reminders/${waterReminderId}/details`)
  }

  const handleViewExerciseCategory = (categoryId: string) => {
    router.push(`/workouts/${categoryId}/details`)
  }

  return {
    handleViewFood,
    handleViewMeal,
    handleViewWaterReminder,
    handleViewExerciseCategory
  }
}
