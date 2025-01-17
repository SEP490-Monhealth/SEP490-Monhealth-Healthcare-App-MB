import React, { ReactNode, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { FoodSavedContext } from "@/contexts/FoodSavedContext"

import { FoodSaveType } from "@/schemas/foodSchema"

export const FoodSavedProvider = ({ children }: { children: ReactNode }) => {
  const [saveFoodsData, setSaveFoodsData] = useState<FoodSaveType[]>([])

  const loadSavedFoods = async () => {
    try {
      const saves = await AsyncStorage.getItem("saveFoodsData")
      if (saves) {
        const parsedSaves = JSON.parse(saves)
        if (Array.isArray(parsedSaves)) {
          setSaveFoodsData(parsedSaves)
        }
      }
    } catch (error) {
      console.log("Failed to load saved foods:", error)
    }
  }

  useEffect(() => {
    loadSavedFoods()
  }, [])

  const toggleSaveFood = async (food: FoodSaveType) => {
    try {
      const isFoodSaved = saveFoodsData.some(
        (saved) => saved.foodId === food.foodId
      )

      const updatedSaves = isFoodSaved
        ? saveFoodsData.filter((saved) => saved.foodId !== food.foodId)
        : [...saveFoodsData, food]

      setSaveFoodsData(updatedSaves)
      await AsyncStorage.setItem("saveFoodsData", JSON.stringify(updatedSaves))
    } catch (error) {
      console.log("Failed to toggle save food:", error)
    }
  }

  const clearFoodSaved = async () => {
    try {
      setSaveFoodsData([])
      await AsyncStorage.removeItem("saveFoodsData")
    } catch (error) {
      console.log("Failed to clear saved foods:", error)
    }
  }

  return (
    <FoodSavedContext.Provider
      value={{
        saveFoodsData,
        toggleSaveFood,
        clearFoodSaved
      }}
    >
      {children}
    </FoodSavedContext.Provider>
  )
}
