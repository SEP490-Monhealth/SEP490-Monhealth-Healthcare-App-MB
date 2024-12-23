import React from "react"

import { View } from "react-native"

import { Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { CategoryPicker } from "@/components/local/setup/CategoryPicker"

import { categoriesData } from "@/constants/categories"

function ActivityScreen() {
  return (
    <Container>
      <View className="px-6">
        <Header title="Hoạt động" />
      </View>

      <View className="mb-20 mt-10 px-6">
        <CategoryPicker data={categoriesData} />
      </View>
    </Container>
  )
}

export default ActivityScreen
