import { createContext, useContext } from "react"

interface FoodFrequency {
  userId: string
  foodId: string
  name: string
  count: number
}

export interface SearchContextType {
  searchFoodHistory: { foodId: string; name: string }[]
  searchConsultantHistory: { consultantId: string; fullName: string }[]
  addSearchFoodHistory: (search: {
    foodId: string
    name: string
  }) => Promise<void>
  clearSearchFoodHistory: () => Promise<void>
  addSearchConsultantHistory: (search: {
    consultantId: string
    fullName: string
  }) => Promise<void>
  clearSearchConsultantHistory: () => Promise<void>
  trackMealFood: (food: {
    userId: string
    foodId: string
    name: string
  }) => Promise<void>
  getFrequentFoods: (userId: string) => FoodFrequency[]
  foodFrequency: FoodFrequency[]
  extractKeywordsFromFoods: (
    foods: { name: string; [key: string]: any }[],
    limit?: number
  ) => string
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
)

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }

  return context
}
