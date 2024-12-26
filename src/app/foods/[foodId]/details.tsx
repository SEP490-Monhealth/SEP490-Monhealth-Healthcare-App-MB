import React, { useRef, useState } from "react"

import { SafeAreaView, Text, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import LoadingScreen from "@/app/loading"
import { ArchiveTick } from "iconsax-react-native"

import {
  Content,
  HStack,
  Input,
  ScrollArea,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { FoodNutrition, NutritionFacts } from "@/components/local/foods"

import { COLORS } from "@/constants/app"

import { useGetFoodById } from "@/hooks/useFood"

function FoodDetailsScreen() {
  const router = useRouter()
  const SheetRef = useRef<SheetRefProps>(null)

  const { foodId } = useLocalSearchParams() as { foodId: string }

  const { data: foodData, isLoading, isFetching } = useGetFoodById(foodId)

  const isSaved = false

  const meals = ["Bữa sáng", "Bữa trưa", "Bữa tối", "Bữa phụ"]
  const [selectedMeal, setSelectedMeal] = useState("Bữa sáng")
  const [quantity, setQuantity] = useState("1")

  const openSheet = () => {
    SheetRef.current?.scrollTo(-300)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  if (!foodData || isLoading || isFetching) return <LoadingScreen />

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="px-6">
        <Header
          back
          label={foodData.name}
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

        <Content margin={false}>
          <ScrollArea>
            <View className="mt-2 pb-12">
              <VStack>
                <Section label="Khẩu phần ăn" margin={false} />

                <VStack gap={8}>
                  <Select
                    defaultValue="Chọn bữa ăn"
                    value="Bữa sáng"
                    onPress={openSheet}
                  />

                  <HStack center gap={8}>
                    <View style={{ flex: 1 }}>
                      <Input
                        value={quantity}
                        placeholder="1"
                        onChangeText={(text) => setQuantity(text)}
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={{ flex: 4 }}>
                      <Select
                        defaultValue="Chọn khẩu phần ăn"
                        value="chén (100 g)"
                        onPress={openSheet}
                      />
                    </View>
                  </HStack>
                </VStack>
              </VStack>

              <VStack gap={8}>
                <Section label="Thông tin dinh dưỡng" />

                {/* <VStack>
                  <Nutrition nutritionData={foodData.nutrition} />
                  <NutritionFacts nutritionData={foodData.nutrition} />
                </VStack> */}
              </VStack>

              <VStack gap={8}>
                <Section label="Hoạt động" />
              </VStack>
            </View>
          </ScrollArea>
        </Content>
      </View>

      <Sheet ref={SheetRef}>
        {meals.map((meal) => (
          <SheetItem
            key={meal}
            item={meal}
            isSelected={selectedMeal === meal}
            onSelect={(meal) => {
              setSelectedMeal(meal)
              closeSheet()
            }}
          />
        ))}
      </Sheet>
    </SafeAreaView>
  )
}

export default FoodDetailsScreen
