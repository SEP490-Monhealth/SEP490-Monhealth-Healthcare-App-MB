import React, { ReactNode, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { StorageContext } from "@/contexts/StorageContext"

import { FoodSaveType } from "@/schemas/foodSchema"

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [savedFoods, setSavedFoods] = useState<FoodSaveType[]>([])
  const [userAllergies, setUserAllergies] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const loadSavedFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem("savedFoods")

      if (foods) {
        const parsedData = JSON.parse(foods)
        if (Array.isArray(parsedData)) {
          setSavedFoods(parsedData)
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
          setUserAllergies(parsedData)
        }
      }
    } catch (error) {
      console.error("Failed to load user allergies:", error)
    }
  }

  const loadSearchHistory = async () => {
    try {
      const searches = await AsyncStorage.getItem("searchHistory")
      if (searches) {
        const parsedData = JSON.parse(searches)
        if (Array.isArray(parsedData)) {
          setSearchHistory(parsedData)
        }
      }
    } catch (error) {
      console.error("Failed to load search history:", error)
    }
  }

  useEffect(() => {
    loadSavedFoods()
    loadUserAllergies()
    loadSearchHistory()
  }, [])

  const toggleSavedFood = async (food: FoodSaveType) => {
    try {
      const isFoodSaved = savedFoods.some(
        (saved) => saved.foodId === food.foodId
      )
      const updatedSaves = isFoodSaved
        ? savedFoods.filter((saved) => saved.foodId !== food.foodId)
        : [...savedFoods, food]

      await AsyncStorage.setItem("savedFoods", JSON.stringify(updatedSaves))
      setSavedFoods(updatedSaves)
    } catch (error) {
      console.error("Failed to toggle saved food:", error)
    }
  }

  const clearSavedFoods = async () => {
    try {
      await AsyncStorage.removeItem("savedFoods")
      setSavedFoods([])
    } catch (error) {
      console.error("Failed to clear saved foods:", error)
    }
  }

  const addAllergies = async (allergies: string[]) => {
    try {
      const newAllergies = allergies.filter(
        (allergy) => !userAllergies.includes(allergy)
      )
      if (newAllergies.length > 0) {
        const updatedAllergies = [...userAllergies, ...newAllergies]
        await AsyncStorage.setItem(
          "userAllergies",
          JSON.stringify(updatedAllergies)
        )
        setUserAllergies(updatedAllergies)
      }
    } catch (error) {
      console.error("Failed to add user allergies:", error)
    }
  }

  const addSearchHistory = async (search: string) => {
    try {
      let updatedSearches = searchHistory.filter((item) => item !== search)
      updatedSearches.unshift(search)

      if (updatedSearches.length > 6) {
        updatedSearches.pop()
      }

      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedSearches)
      )
      setSearchHistory(updatedSearches)
    } catch (error) {
      console.error("Failed to add search history:", error)
    }
  }

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchHistory")
      setSearchHistory([])
    } catch (error) {
      console.error("Failed to clear search history:", error)
    }
  }

  return (
    <StorageContext.Provider
      value={{
        savedFoods,
        userAllergies,
        searchHistory,
        toggleSavedFood,
        clearSavedFoods,
        addAllergies,
        addSearchHistory,
        clearSearchHistory
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
