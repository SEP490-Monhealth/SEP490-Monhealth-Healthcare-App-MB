import React, { useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

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
import { useGetNutritionByFoodId } from "@/hooks/useNutrition"
import { useGetPortionByFoodId } from "@/hooks/usePortion"

function FoodDetailsScreen() {
  const SheetRef = useRef<SheetRefProps>(null)

  const { foodId } = useLocalSearchParams() as { foodId: string }

  const { data: foodData, isLoading: isFoodLoading } = useGetFoodById(foodId)
  const { data: nutritionData, isLoading: isNutritionLoading } =
    useGetNutritionByFoodId(foodId)
  const { data: portionData, isLoading: isPortionLoading } =
    useGetPortionByFoodId(foodId)

  const isSaved = false

  const meals = ["Bữa sáng", "Bữa trưa", "Bữa tối", "Bữa phụ"]
  const portions = ["chén (100 g)", "đĩa (200 g)", "cốc (250 ml)"]

  const [selectedMeal, setSelectedMeal] = useState("Bữa sáng")
  const [selectedPortion, setSelectedPortion] = useState("chén (100 g)")
  const [quantity, setQuantity] = useState("1")
  const [sheetData, setSheetData] = useState<string[]>(meals)
  const [isMealSelection, setIsMealSelection] = useState(true)

  const openSheet = (isMeal: boolean) => {
    setSheetData(isMeal ? meals : portions)
    setIsMealSelection(isMeal)
    SheetRef.current?.scrollTo(-300)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  if (
    !foodData ||
    isFoodLoading ||
    !nutritionData ||
    isNutritionLoading ||
    !portionData ||
    isPortionLoading
  )
    return <LoadingScreen />

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              <View
                onStartShouldSetResponder={() => true}
                className="mt-2 pb-12"
              >
                <VStack>
                  <Section label="Khẩu phần ăn" margin={false} />

                  <VStack gap={8}>
                    <Select
                      defaultValue="Chọn bữa ăn"
                      value={selectedMeal}
                      onPress={() => openSheet(true)}
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
                          value={selectedPortion}
                          onPress={() => openSheet(false)}
                        />
                      </View>
                    </HStack>
                  </VStack>
                </VStack>

                <VStack gap={8}>
                  <Section label="Thông tin dinh dưỡng" />

                  <FoodNutrition
                    calories={nutritionData?.calories || 0}
                    protein={nutritionData?.protein || 0}
                    carbs={nutritionData?.carbs || 0}
                    fat={nutritionData?.fat || 0}
                  />

                  <NutritionFacts nutritionData={nutritionData} />
                </VStack>

                <VStack gap={8}>
                  <Section label="Hoạt động" />
                </VStack>
              </View>
            </ScrollArea>
          </Content>
        </View>

        <Sheet ref={SheetRef}>
          {sheetData.map((item) => (
            <SheetItem
              key={item}
              item={item}
              isSelected={
                isMealSelection
                  ? selectedMeal === item
                  : selectedPortion === item
              }
              onSelect={(selectedItem) => {
                if (isMealSelection) {
                  setSelectedMeal(selectedItem)
                } else {
                  setSelectedPortion(selectedItem)
                }
                closeSheet()
              }}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default FoodDetailsScreen
