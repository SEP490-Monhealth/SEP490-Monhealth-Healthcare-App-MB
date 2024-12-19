import React, { useRef } from "react"

import { Button, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"

import { Container, Content, HStack, VStack } from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { NutritionFacts } from "@/components/local/foods"

import { sampleFoodsData } from "@/constants/foods"

import BottomSheet, { BottomSheetRefProps } from "../bottomSheet"

function FoodDetailsScreen() {
  const { foodId } = useLocalSearchParams()
  const foodData = sampleFoodsData.find((item) => item.foodId === foodId)

  const bottomSheetRef = useRef<BottomSheetRefProps>(null)

  const openBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(-500)
  }

  if (!foodData) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back title="Chi tiết thức ăn" />

      <Content margin={false}>
        <HStack className="flex justify-between">
          <View>
            <Text className="font-tbold text-xl text-typography">
              {foodData.foodName}
            </Text>

            <Text className="font-tregular text-base text-secondary">
              {foodData.portionSize} {foodData.portionWeight}{" "}
              {foodData.measurementUnit}
            </Text>
          </View>
          <View>
            <Button title="Mở" onPress={openBottomSheet} />
          </View>
        </HStack>
        <Section title="Thông tin dinh dưỡng" />
        <NutritionFacts nutritionData={foodData} />
      </Content>

      <BottomSheet ref={bottomSheetRef}>
        <VStack center>
          <Text>Nội dung trong BottomSheet</Text>
        </VStack>
      </BottomSheet>
    </Container>
  )
}

export default FoodDetailsScreen
