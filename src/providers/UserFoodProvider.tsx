import React, { ReactNode, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { UserFoodContext } from "@/contexts/UserFoodContext"

import { FoodSaveType } from "@/schemas/foodSchema"

export const UserFoodProvider = ({ children }: { children: ReactNode }) => {
  const [userFoodsData, setUserFoodsData] = useState<FoodSaveType[]>([])
  const [userAllergiesData, setUserAllergiesData] = useState<string[]>([])

  const loadFoodSaved = async () => {
    try {
      const foods = await AsyncStorage.getItem("userFoods")

      if (foods) {
        const parsedData = JSON.parse(foods)
        if (Array.isArray(parsedData)) {
          setUserFoodsData(parsedData)
        }
      }
    } catch (error) {
      console.error("Failed to load saved foods:", error)
    }
  }

  const loadUserAllergies = async () => {
    try {
      const allergies = await AsyncStorage.getItem("userAllergies")

      if (allergies) {
        const parsedData = JSON.parse(allergies)
        if (Array.isArray(parsedData)) {
          setUserAllergiesData(parsedData)
        }
      }
    } catch (error) {
      console.error("Failed to load user allergies:", error)
    }
  }

  useEffect(() => {
    loadFoodSaved()
    loadUserAllergies()
  }, [])

  const toggleFoodSaved = async (food: FoodSaveType) => {
    try {
      const isFoodSaved = userFoodsData.some(
        (saved) => saved.foodId === food.foodId
      )
      const updatedSaves = isFoodSaved
        ? userFoodsData.filter((saved) => saved.foodId !== food.foodId)
        : [...userFoodsData, food]

      await AsyncStorage.setItem("userFoods", JSON.stringify(updatedSaves))
      setUserFoodsData(updatedSaves)
    } catch (error) {
      console.error("Failed to toggle food save:", error)
    }
  }

  const clearFoodSaved = async () => {
    try {
      await AsyncStorage.removeItem("userFoods")
      setUserFoodsData([])
    } catch (error) {
      console.error("Failed to clear foods saved:", error)
    }
  }

  return (
    <UserFoodContext.Provider
      value={{
        userFoodsData,
        userAllergiesData,
        toggleFoodSaved,
        clearFoodSaved
      }}
    >
      {children}
    </UserFoodContext.Provider>
  )
}
