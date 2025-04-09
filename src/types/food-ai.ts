export interface FoodAIType {
  food: FoodType
  isFoodImage: boolean
  summaryDescription: string
}

export interface FoodType {
  name: string
  nutrition: NutritionType
}

export interface NutritionType {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
}
