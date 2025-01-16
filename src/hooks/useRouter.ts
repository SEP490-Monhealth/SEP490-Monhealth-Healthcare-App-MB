import { useRouter } from "expo-router"

export const useRouterHandlers = () => {
  const router = useRouter()

  const handleViewMeal = (mealId: string) => {
    router.push(`/meals/${mealId}/details`)
  }

  const handleViewFood = (foodId: string) => {
    router.push(`/foods/${foodId}/details`)
  }

  const handleViewReminder = (reminderId: string) => {
    router.push(`/reminders/${reminderId}/details`)
  }

  const handleViewExerciseCategory = (typeId: string) => {
    router.push(`/workouts/${typeId}/details`)
  }

  return {
    handleViewFood,
    handleViewMeal,
    handleViewReminder,
    handleViewExerciseCategory
  }
}
