import { createContext, useContext } from "react"

export interface FoodFrequency {
  userId: string
  foodId: string
  name: string
  count: number
}

export interface FoodSearchHistory {
  userId: string
  foodId: string
  name: string
}

export interface ConsultantSearchHistory {
  userId: string
  consultantId: string
  fullName: string
}

export interface SearchContextType {
  searchFoodHistory: FoodSearchHistory[]
  searchConsultantHistory: ConsultantSearchHistory[]
  foodFrequency: FoodFrequency[]

  addSearchFoodHistory: (search: {
    userId: string
    foodId: string
    name: string
  }) => Promise<void>
  clearSearchFoodHistory: (userId: string) => Promise<void>
  getSearchFoodHistory: (userId: string) => FoodSearchHistory[]

  addSearchConsultantHistory: (search: {
    userId: string
    consultantId: string
    fullName: string
  }) => Promise<void>
  clearSearchConsultantHistory: (userId: string) => Promise<void>
  getSearchConsultantHistory: (userId: string) => ConsultantSearchHistory[]

  trackMealFood: (food: {
    userId: string
    foodId: string
    name: string
  }) => Promise<void>
  getFrequentFoods: (userId: string) => FoodFrequency[]

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
