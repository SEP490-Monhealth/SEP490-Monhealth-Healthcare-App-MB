import React, { ReactNode, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { UserAllergiesContext } from "@/contexts/UserAllergiesContext"

export const UserAllergiesProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [allergies, setAllergies] = useState<string[]>([])

  const loadAllergies = async () => {
    try {
      const userFoods = await AsyncStorage.getItem("User Foods Data")
      if (userFoods) {
        const parsedData = JSON.parse(userFoods)
        if (Array.isArray(parsedData?.allergies)) {
          setAllergies(parsedData.allergies)
        }
      }
    } catch (error) {
      console.log("Failed to load allergies:", error)
    }
  }

  useEffect(() => {
    loadAllergies()
  }, [])

  return (
    <UserAllergiesContext.Provider value={{ allergies }}>
      {children}
    </UserAllergiesContext.Provider>
  )
}
