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
  saveFoods: SaveFoodType[]
  toggleSave: (food: SaveFoodType) => void
  clearSaved: () => void
}

const SaveContext = createContext<SaveContextType | undefined>(undefined)

export const SaveFoodProvider = ({ children }: { children: ReactNode }) => {
  const [saveFoods, setSaveFoods] = useState<SaveFoodType[]>([])

  useEffect(() => {
    const loadSaves = async () => {
      const saves = await AsyncStorage.getItem("saves")
      if (saves) {
        setSaveFoods(JSON.parse(saves))
      }
    }
    loadSaves()
  }, [])

  const toggleSave = async (food: SaveFoodType) => {
    const isFoodSaved = saveFoods.some((saved) => saved.foodId === food.foodId)

    const updatedSaves = isFoodSaved
      ? saveFoods.filter((saved) => saved.foodId !== food.foodId)
      : [...saveFoods, food]

    setSaveFoods(updatedSaves)
    await AsyncStorage.setItem("saves", JSON.stringify(updatedSaves))
  }

  const clearSaved = async () => {
    setSaveFoods([])
    await AsyncStorage.removeItem("saves")
  }

  return (
    <SaveContext.Provider
      value={{
        saveFoods,
        toggleSave,
        clearSaved
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
