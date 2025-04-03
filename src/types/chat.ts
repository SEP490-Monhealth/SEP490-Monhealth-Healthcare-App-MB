export interface ChatUserType {
  messageId: string
  sender: string
  content: string
}

export interface ChatMonAIType {
  messageId: string
  sender: string
  content: {
    mealPlan?: {
      meal: {
        breakfast: { items: FoodType[] }
        lunch: { items: FoodType[] }
        dinner: { items: FoodType[] }
        snack: { items: FoodType[] }
      }
      detail: string
    }
    workoutRoutine?: {
      stage: string
      exercises: [
        {
          name: string
          sets: number
          reps: number
          rest: string
          duration: string
        }
      ]
    }[]
    GeneralAdvice?: string
    SummaryConversation?: string
    health_or_fitness?: boolean
  }
}

export interface FoodType {
  foodId: string
  name: string
  portion: PortionType
  nutrition: NutritionType
}

export interface PortionType {
  size: string
  weight: number
  unit: string
}

export interface NutritionType {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type MessageType = ChatUserType | ChatMonAIType

export const isAIMessage = (message: MessageType): message is ChatMonAIType => {
  return (
    message !== null &&
    typeof message === "object" &&
    "content" in message &&
    message.content !== null &&
    typeof message.content === "object"
  )
}
