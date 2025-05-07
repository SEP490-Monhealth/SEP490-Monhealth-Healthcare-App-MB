import React, { ReactNode, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  ConsultantSearchHistory,
  FoodFrequency,
  FoodSearchHistory,
  SearchContext
} from "@/contexts/SearchContext"

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchFoodHistory, setSearchFoodHistory] = useState<
    FoodSearchHistory[]
  >([])
  const [searchConsultantHistory, setSearchConsultantHistory] = useState<
    ConsultantSearchHistory[]
  >([])
  const [foodFrequency, setFoodFrequency] = useState<FoodFrequency[]>([])

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        loadSearchFoodHistory(),
        loadSearchConsultantHistory(),
        loadFoodFrequency()
      ])
    }

    loadInitialData()
  }, [])

  const loadSearchFoodHistory = async () => {
    const searches = await AsyncStorage.getItem("searchFoodHistory")
    if (searches) {
      const parsedData = JSON.parse(searches)
      if (Array.isArray(parsedData)) {
        setSearchFoodHistory(parsedData)
      }
    }
  }

  const loadSearchConsultantHistory = async () => {
    const searches = await AsyncStorage.getItem("searchConsultantHistory")
    if (searches) {
      const parsedData = JSON.parse(searches)
      if (Array.isArray(parsedData)) {
        setSearchConsultantHistory(parsedData)
      }
    }
  }

  const loadFoodFrequency = async () => {
    const frequency = await AsyncStorage.getItem("foodFrequency")
    if (frequency) {
      const parsedData = JSON.parse(frequency)
      if (Array.isArray(parsedData)) {
        setFoodFrequency(parsedData)
      }
    }
  }

  const addSearchFoodHistory = async (search: {
    foodId: string
    name: string
    userId: string
  }) => {
    let updatedSearches = searchFoodHistory.filter(
      (item) =>
        !(item.foodId === search.foodId && item.userId === search.userId)
    )

    updatedSearches.unshift(search)

    const userSearches = updatedSearches.filter(
      (item) => item.userId === search.userId
    )

    if (userSearches.length > 6) {
      const lastUserItemIndex = updatedSearches.findIndex(
        (item, index) => item.userId === search.userId && index >= 6
      )

      if (lastUserItemIndex !== -1) {
        updatedSearches.splice(lastUserItemIndex, 1)
      }
    }

    await AsyncStorage.setItem(
      "searchFoodHistory",
      JSON.stringify(updatedSearches)
    )
    setSearchFoodHistory(updatedSearches)
  }

  const clearSearchFoodHistory = async (userId: string) => {
    const updatedSearches = searchFoodHistory.filter(
      (item) => item.userId !== userId
    )

    await AsyncStorage.setItem(
      "searchFoodHistory",
      JSON.stringify(updatedSearches)
    )
    setSearchFoodHistory(updatedSearches)
  }

  const getSearchFoodHistory = (userId: string) => {
    return searchFoodHistory.filter((item) => item.userId === userId)
  }

  const addSearchConsultantHistory = async (search: {
    consultantId: string
    fullName: string
    userId: string
  }) => {
    let updatedSearches = searchConsultantHistory.filter(
      (item) =>
        !(
          item.consultantId === search.consultantId &&
          item.userId === search.userId
        )
    )

    updatedSearches.unshift(search)

    const userSearches = updatedSearches.filter(
      (item) => item.userId === search.userId
    )

    if (userSearches.length > 4) {
      const lastUserItemIndex = updatedSearches.findIndex(
        (item, index) => item.userId === search.userId && index >= 4
      )

      if (lastUserItemIndex !== -1) {
        updatedSearches.splice(lastUserItemIndex, 1)
      }
    }

    await AsyncStorage.setItem(
      "searchConsultantHistory",
      JSON.stringify(updatedSearches)
    )
    setSearchConsultantHistory(updatedSearches)
  }

  const clearSearchConsultantHistory = async (userId: string) => {
    const updatedSearches = searchConsultantHistory.filter(
      (item) => item.userId !== userId
    )

    await AsyncStorage.setItem(
      "searchConsultantHistory",
      JSON.stringify(updatedSearches)
    )
    setSearchConsultantHistory(updatedSearches)
  }

  const getSearchConsultantHistory = (userId: string) => {
    return searchConsultantHistory.filter((item) => item.userId === userId)
  }

  const trackMealFood = async (food: {
    foodId: string
    name: string | undefined
    userId: string
  }) => {
    let updatedFrequency = [...foodFrequency]
    const existingIndex = updatedFrequency.findIndex(
      (item) => item.foodId === food.foodId && item.userId === food.userId
    )

    if (existingIndex !== -1) {
      updatedFrequency[existingIndex] = {
        ...updatedFrequency[existingIndex],
        count: updatedFrequency[existingIndex].count + 1
      }
    } else {
      updatedFrequency.push({
        foodId: food.foodId,
        name: food.name || "",
        count: 1,
        userId: food.userId
      })
    }

    updatedFrequency.sort((a, b) => b.count - a.count)

    await AsyncStorage.setItem(
      "foodFrequency",
      JSON.stringify(updatedFrequency)
    )
    setFoodFrequency(updatedFrequency)
  }

  const getFrequentFoods = (userId: string) => {
    return foodFrequency.filter(
      (food) => food.count >= 2 && food.userId === userId
    )
  }

  const extractKeywordsFromFoods = (
    foods: { name: string; [key: string]: any }[],
    limit = 5
  ): string => {
    const keywordDictionary = [
      "Phở",
      "Bún",
      "Cơm",
      "Bánh",
      "Canh",
      "Súp",
      "Cháo",
      "Mì",
      "Miến",
      "Hủ tiếu",
      "Xôi",
      "Gà",
      "Bò",
      "Heo",
      "Lợn",
      "Vịt",
      "Cá",
      "Tôm",
      "Cua",
      "Mực",
      "Rau",
      "Đậu",
      "Khoai",
      "Bí",
      "Cải",
      "Nấm",
      "Ức",
      "Thịt",
      "Trứng",
      "Sữa"
    ]

    const uniqueKeywords = new Set<string>()

    foods.forEach((food) => {
      keywordDictionary.forEach((keyword) => {
        if (food.name.includes(keyword)) {
          uniqueKeywords.add(keyword)
        }
      })
    })

    return Array.from(uniqueKeywords).slice(0, limit).join(", ")
  }

  const contextValue = {
    searchFoodHistory,
    searchConsultantHistory,
    foodFrequency,

    addSearchFoodHistory,
    clearSearchFoodHistory,
    getSearchFoodHistory,

    addSearchConsultantHistory,
    clearSearchConsultantHistory,
    getSearchConsultantHistory,

    trackMealFood,
    getFrequentFoods,

    extractKeywordsFromFoods
  }

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}
