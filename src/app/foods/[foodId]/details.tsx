import React, { useRef } from "react"

import { Button, SafeAreaView, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"

import {
  BottomSheet,
  BottomSheetRefProps,
  Container,
  Content,
  HStack,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { NutritionFacts } from "@/components/local/foods"

import { sampleFoodsData } from "@/constants/foods"

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
    <SafeAreaView className="h-full bg-background">
      <View className="px-6">
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
      </View>

      <BottomSheet ref={bottomSheetRef}>
        <View>
          <Text>Nội dung trong BottomSheet</Text>
          <Text>Thêm dòng nội dung để kiểm tra chiều cao động.</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default FoodDetailsScreen
