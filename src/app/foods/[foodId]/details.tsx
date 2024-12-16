import React from "react"

import { Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"

import { Container, Content } from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { NutritionFacts } from "@/components/local/foods"

import { sampleFoodsData } from "@/constants/foods"

function FoodDetailsScreen() {
  const { foodId } = useLocalSearchParams()

  const foodData = sampleFoodsData.find((item) => item.foodId === foodId)

  if (!foodData) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back title="Chi tiết thức ăn" />

      <Content margin={false}>
        <Text className="font-tbold text-xl text-typography">
          {foodData.foodName}
        </Text>

        <Text className="font-tregular text-base text-secondary">
          {foodData.portionSize} {foodData.portionWeight}{" "}
          {foodData.measurementUnit}
        </Text>

        <Section title="Thông tin dinh dưỡng" />

        <NutritionFacts nutritionData={foodData} />
      </Content>
    </Container>
  )
}

export default FoodDetailsScreen
