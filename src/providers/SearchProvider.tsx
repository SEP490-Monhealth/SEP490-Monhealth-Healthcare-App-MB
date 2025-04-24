import React, { ReactNode, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { SearchContext } from "@/contexts/SearchContext"

interface FoodFrequency {
  foodId: string
  name: string
  count: number
}

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchFoodHistory, setSearchFoodHistory] = useState<
    { foodId: string; name: string }[]
  >([])
  const [searchConsultantHistory, setSearchConsultantHistory] = useState<
    { consultantId: string; fullName: string }[]
  >([])
  const [foodFrequency, setFoodFrequency] = useState<FoodFrequency[]>([])

  const loadSearchFoodHistory = async () => {
    try {
      const searches = await AsyncStorage.getItem("searchFoodHistory")
      if (searches) {
        const parsedData = JSON.parse(searches)
        if (Array.isArray(parsedData)) {
          setSearchFoodHistory(parsedData)
        }
      }
    } catch (error) {
      console.error("Failed to load search food history:", error)
    }
  }

  const loadSearchConsultantHistory = async () => {
    try {
      const searches = await AsyncStorage.getItem("searchConsultantHistory")
      if (searches) {
        const parsedData = JSON.parse(searches)
        if (Array.isArray(parsedData)) {
          setSearchConsultantHistory(parsedData)
        }
      }
    } catch (error) {
      console.error("Failed to load search consultant history:", error)
    }
  }

  const loadFoodFrequency = async () => {
    try {
      const frequency = await AsyncStorage.getItem("foodFrequency")
      if (frequency) {
        const parsedData = JSON.parse(frequency)
        if (Array.isArray(parsedData)) {
          setFoodFrequency(parsedData)
        }
      }
    } catch (error) {
      console.error("Failed to load food frequency data:", error)
    }
  }

  useEffect(() => {
    loadSearchFoodHistory()
    loadSearchConsultantHistory()
    loadFoodFrequency()
  }, [])

  const addSearchFoodHistory = async (search: {
    foodId: string
    name: string
  }) => {
    try {
      let updatedSearches = searchFoodHistory.filter(
        (item) => item.foodId !== search.foodId
      )
      updatedSearches.unshift(search)

      if (updatedSearches.length > 6) {
        updatedSearches.pop()
      }

      await AsyncStorage.setItem(
        "searchFoodHistory",
        JSON.stringify(updatedSearches)
      )
      setSearchFoodHistory(updatedSearches)
    } catch (error) {
      console.error("Failed to add search food history:", error)
    }
  }

  const addSearchConsultantHistory = async (search: {
    consultantId: string
    fullName: string
  }) => {
    try {
      let updatedSearches = searchConsultantHistory.filter(
        (item) => item.consultantId !== search.consultantId
      )
      updatedSearches.unshift(search)

      if (updatedSearches.length > 6) {
        updatedSearches.pop()
      }

      await AsyncStorage.setItem(
        "searchConsultantHistory",
        JSON.stringify(updatedSearches)
      )
      setSearchConsultantHistory(updatedSearches)
    } catch (error) {
      console.error("Failed to add search consultant history:", error)
    }
  }

  const clearSearchFoodHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchFoodHistory")
      setSearchFoodHistory([])
    } catch (error) {
      console.error("Failed to clear search food history:", error)
    }
  }

  const clearSearchConsultantHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchConsultantHistory")
      setSearchConsultantHistory([])
    } catch (error) {
      console.error("Failed to clear search consultant history:", error)
    }
  }

  const trackMealFood = async (food: { foodId: string; name: string }) => {
    try {
      // Find existing food frequency or create new one
      let updatedFrequency = [...foodFrequency]
      const existingIndex = updatedFrequency.findIndex(
        (item) => item.foodId === food.foodId
      )

      if (existingIndex !== -1) {
        // Increment count for existing food
        updatedFrequency[existingIndex] = {
          ...updatedFrequency[existingIndex],
          count: updatedFrequency[existingIndex].count + 1
        }
      } else {
        // Add new food with count 1
        updatedFrequency.push({
          foodId: food.foodId,
          name: food.name,
          count: 1
        })
      }

      // Sort by count in descending order
      updatedFrequency.sort((a, b) => b.count - a.count)

      // Store in AsyncStorage
      await AsyncStorage.setItem(
        "foodFrequency",
        JSON.stringify(updatedFrequency)
      )
      setFoodFrequency(updatedFrequency)
    } catch (error) {
      console.error("Failed to track meal food:", error)
    }
  }

  const getFrequentFoods = () => {
    // Return foods with count >= 2
    return foodFrequency.filter((food) => food.count >= 2)
  }

  // New function to extract keywords from foods
  const extractKeywordsFromFoods = (
    foods: { name: string; [key: string]: any }[],
    limit = 5
  ): string => {
    // Danh sách các từ khóa chính cần trích xuất
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

    // Tạo một Set để lưu các từ khóa duy nhất tìm thấy
    const uniqueKeywords = new Set<string>()

    // Duyệt qua mỗi món ăn
    foods.forEach((food) => {
      // Kiểm tra mỗi từ khóa chính trong từ điển
      keywordDictionary.forEach((keyword) => {
        // Nếu tên món ăn chứa từ khóa, thêm vào danh sách
        if (food.name.includes(keyword)) {
          uniqueKeywords.add(keyword)
        }
      })
    })

    // Chuyển Set thành mảng, giới hạn theo số lượng và nối lại bằng dấu phẩy
    return Array.from(uniqueKeywords).slice(0, limit).join(", ")
  }

  return (
    <SearchContext.Provider
      value={{
        searchFoodHistory,
        searchConsultantHistory,
        addSearchFoodHistory,
        addSearchConsultantHistory,
        clearSearchFoodHistory,
        clearSearchConsultantHistory,
        trackMealFood,
        getFrequentFoods,
        foodFrequency,
        extractKeywordsFromFoods
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
