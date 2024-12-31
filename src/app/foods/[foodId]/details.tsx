import React, { useEffect, useRef, useState } from "react"

import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import LoadingScreen from "@/app/loading"
import { ArchiveTick } from "iconsax-react-native"

import {
  Container,
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

import { useSaveFoods } from "@/contexts/SaveFoodContext"

import { useGetFoodById } from "@/hooks/useFood"
import { useGetNutritionByFoodId } from "@/hooks/useNutrition"
import { useGetPortionByFoodId } from "@/hooks/usePortion"

import { parsePortion } from "@/utils/helpers"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

function FoodDetailsScreen() {
  const router = useRouter()
  const SheetRef = useRef<SheetRefProps>(null)

  const { foodId } = useLocalSearchParams() as { foodId: string }

  const { saveFoodsData, toggleSaveFood } = useSaveFoods()

  const isSaved = saveFoodsData.some((saved) => saved.foodId === foodId)

  const meals = ["Bữa sáng", "Bữa trưa", "Bữa tối", "Bữa phụ"]

  const [selectedMeal, setSelectedMeal] = useState(meals[0])
  const [selectedPortion, setSelectedPortion] = useState("g")
  const [quantity, setQuantity] = useState("100")
  const [sheetData, setSheetData] = useState<string[]>(meals)
  const [isMealSelection, setIsMealSelection] = useState(true)
  const [sheetHeight, setSheetHeight] = useState(320)

  const { data: foodData, isLoading: isFoodLoading } = useGetFoodById(foodId)
  const { data: nutritionData, isLoading: isNutritionLoading } =
    useGetNutritionByFoodId(foodId)
  const { data: portionData, isLoading: isPortionLoading } =
    useGetPortionByFoodId(foodId)

  const formattedPortionData = [
    "g",
    ...(portionData?.map(
      (portion) => `${portion.size} (${portion.weight} ${portion.unit})`
    ) || [])
  ]

  useEffect(() => {
    const minHeight = 160
    const maxHeight = SCREEN_HEIGHT * 0.8

    let itemHeight = 100
    if (formattedPortionData.length === 3) {
      itemHeight = 80
    } else if (
      formattedPortionData.length >= 4 &&
      formattedPortionData.length <= 5
    ) {
      itemHeight = 60
    } else if (formattedPortionData.length > 5) {
      itemHeight = 50
    }

    const calculatedHeight = Math.min(
      Math.max(itemHeight * formattedPortionData.length, minHeight),
      maxHeight
    )

    setSheetHeight(calculatedHeight)
  }, [formattedPortionData])

  const openSheet = (isMeal: boolean) => {
    setSheetData(isMeal ? meals : formattedPortionData || [])
    setIsMealSelection(isMeal)
    SheetRef.current?.scrollTo(isMeal ? -300 : -sheetHeight)
  }

  const closeSheet = () => SheetRef.current?.scrollTo(0)

  const handleCreatePortion = () => router.push("/foods/portions/create")

  if (
    !foodData ||
    isFoodLoading ||
    !nutritionData ||
    isNutritionLoading ||
    !portionData ||
    isPortionLoading
  )
    return <LoadingScreen />

  const handleToggleSaveFood = () => {
    if (foodData && nutritionData && portionData) {
      const { portionSize, portionWeight, portionUnit } =
        parsePortion(selectedPortion)

      toggleSaveFood({
        foodId: foodId,
        name: foodData.name,
        portion: {
          size: portionSize,
          weight: portionWeight,
          unit: portionUnit
        },
        // @ts-ignore
        nutrition: {
          calories: nutritionData.calories
        }
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
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
            onActionPress={handleToggleSaveFood}
          />

          <Content>
            <ScrollArea className="flex-1">
              <View
                onStartShouldSetResponder={() => true}
                className="mt-2 flex-1 pb-12"
              >
                <VStack>
                  <Section
                    label="Khẩu phần ăn"
                    margin={false}
                    action="Thêm mới"
                    onPress={handleCreatePortion}
                  />

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

                      <View style={{ flex: 3 }}>
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

                  <VStack gap={12}>
                    <FoodNutrition
                      calories={nutritionData?.calories || 0}
                      protein={nutritionData?.protein || 0}
                      carbs={nutritionData?.carbs || 0}
                      fat={nutritionData?.fat || 0}
                    />

                    <NutritionFacts nutritionData={nutritionData} />
                  </VStack>
                </VStack>

                <VStack gap={8}>
                  <Section label="Hoạt động" />
                </VStack>
              </View>
            </ScrollArea>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
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
                  setQuantity(selectedItem === "g" ? "100" : "1")
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
