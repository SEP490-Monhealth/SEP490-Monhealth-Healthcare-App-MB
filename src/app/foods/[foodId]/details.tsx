import React, { useRef, useState } from "react"

import { SafeAreaView, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"
import { ArchiveTick } from "iconsax-react-native"

import {
  BottomSheet,
  BottomSheetRefProps,
  Content,
  HStack,
  Input,
  Select,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { Nutrition, NutritionFacts } from "@/components/local/foods"

import { COLORS } from "@/constants/appConstants"
import { sampleFoodsData } from "@/constants/foods"

function FoodDetailsScreen() {
  const { foodId } = useLocalSearchParams()
  const foodData = sampleFoodsData.find((item) => item.foodId === foodId)

  const isSaved = false

  const [query, setQuery] = useState("")

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
        <Header
          back
          title={foodData.foodName}
          action={{
            icon: (
              <ArchiveTick
                variant={isSaved ? "Bold" : "Linear"}
                size={20}
                color={COLORS.primary}
              />
            )
          }}
        />

        <Content>
          <VStack gap={20} className="mt-4">
            <VStack gap={12}>
              <HStack center gap={8}>
                <View style={{ flex: 1 }}>
                  <Input
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    placeholder="1"
                    keyboardType="numeric"
                    clearText={false}
                  />
                </View>

                <View style={{ flex: 4 }}>
                  <Select
                    defaultValue="Chọn khẩu phần ăn"
                    value="1 chén (100 g)"
                    onPress={openBottomSheet}
                  />
                </View>
              </HStack>

              <Select
                defaultValue="Chọn bữa ăn"
                value="Bữa sáng"
                onPress={openBottomSheet}
              />
            </VStack>

            <Nutrition foodData={foodData} />

            <NutritionFacts nutritionData={foodData} />
          </VStack>
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
