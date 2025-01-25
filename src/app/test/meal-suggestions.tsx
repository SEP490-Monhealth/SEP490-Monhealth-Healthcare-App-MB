import React from "react"

import { Text, View } from "react-native"

import { useAuth } from "@/contexts/AuthContext"

import { useGetMealsByUserId } from "@/hooks/useMealSuggestion"

import { LoadingScreen } from "../loading"

function MealSuggestions() {
  const { user } = useAuth()
  const userId = user?.userId

  const { data, isLoading } = useGetMealsByUserId(userId)

  console.log(JSON.stringify(data, null, 2))

  if (!data || isLoading) <LoadingScreen />

  return (
    <View>
      <Text>MealSuggestions</Text>
    </View>
  )
}

export default MealSuggestions
