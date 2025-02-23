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

  const handleViewWorkouts = () => {
    router.push("/workouts")
  }

  const handleViewWorkout = (workoutId: string) => {
    router.push(`/workouts/${workoutId}/details`)
  }

  const handleViewConsultant = (consultantId: string) => {
    router.push(`/consultants/${consultantId}/details`)
  }

  return {
    handleViewFood,
    handleViewMeal,
    handleViewWaterReminder,
    handleViewWorkouts,
    handleViewWorkout,
    handleViewConsultant
  }
}
