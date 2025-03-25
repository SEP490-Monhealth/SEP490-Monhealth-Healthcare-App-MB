import React, { ReactNode, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { SearchContext } from "@/contexts/SearchContext"

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchFoodHistory, setSearchFoodHistory] = useState<
    { foodId: string; name: string }[]
  >([])
  const [searchConsultantHistory, setSearchConsultantHistory] = useState<
    { consultantId: string; fullName: string }[]
  >([])

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

  useEffect(() => {
    loadSearchFoodHistory()
    loadSearchConsultantHistory()
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

  return (
    <SearchContext.Provider
      value={{
        searchFoodHistory,
        searchConsultantHistory,
        addSearchFoodHistory,
        addSearchConsultantHistory,
        clearSearchFoodHistory,
        clearSearchConsultantHistory
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
