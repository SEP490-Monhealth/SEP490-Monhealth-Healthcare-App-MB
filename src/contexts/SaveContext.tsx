import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { SaveFoodType } from "@/schemas/foodSchema"

interface SaveContextType {
  saveFoodsData: SaveFoodType[]
  toggleSaveFood: (food: SaveFoodType) => Promise<void>
  clearFoodSaved: () => Promise<void>
}

const SaveContext = createContext<SaveContextType | undefined>(undefined)

export const SaveFoodProvider = ({ children }: { children: ReactNode }) => {
  const [saveFoodsData, setSaveFoodsData] = useState<SaveFoodType[]>([])

  const loadSavedFoods = async () => {
    try {
      const saves = await AsyncStorage.getItem("Save Foods Data")
      if (saves) {
        const parsedSaves = JSON.parse(saves)
        if (Array.isArray(parsedSaves)) {
          setSaveFoodsData(parsedSaves)
        }
      }
    } catch (error) {
      console.error("Failed to load saved foods:", error)
    }
  }

  useEffect(() => {
    loadSavedFoods()
  }, [])

  const toggleSaveFood = async (food: SaveFoodType) => {
    try {
      const isFoodSaved = saveFoodsData.some(
        (saved) => saved.foodId === food.foodId
      )

      const updatedSaves = isFoodSaved
        ? saveFoodsData.filter((saved) => saved.foodId !== food.foodId)
        : [...saveFoodsData, food]

      setSaveFoodsData(updatedSaves)
      await AsyncStorage.setItem(
        "Save Foods Data",
        JSON.stringify(updatedSaves)
      )
    } catch (error) {
      console.error("Failed to toggle save food:", error)
    }
  }

  const clearFoodSaved = async () => {
    try {
      setSaveFoodsData([])
      await AsyncStorage.removeItem("Save Foods Data")
    } catch (error) {
      console.error("Failed to clear saved foods:", error)
    }
  }

  return (
    <SaveContext.Provider
      value={{
        saveFoodsData,
        toggleSaveFood,
        clearFoodSaved
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}

export const useSaveFoods = () => {
  const context = useContext(SaveContext)
  if (!context) {
    throw new Error("useSaveFoods must be used within a SaveFoodProvider")
  }
  return context
}
