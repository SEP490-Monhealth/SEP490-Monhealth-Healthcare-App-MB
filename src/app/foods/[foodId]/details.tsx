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
  Button,
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

import { COLORS, DATA } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"
import { useSaveFoods } from "@/contexts/SaveFoodContext"

import { useGetFoodById } from "@/hooks/useFood"
import { useCreateMeal } from "@/hooks/useMeal"
import { useGetNutritionByFoodId } from "@/hooks/useNutrition"
import { useGetPortionByFoodId } from "@/hooks/usePortion"

import { getMealType, parsePortion } from "@/utils/helpers"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

function FoodDetailsScreen() {
  const router = useRouter()
  const MealSheetRef = useRef<SheetRefProps>(null)
  const PortionSheetRef = useRef<SheetRefProps>(null)

  const { user } = useAuth()
  const userId = user?.userId

  const { foodId } = useLocalSearchParams() as { foodId: string }

  const { mutate: addMeal } = useCreateMeal()

  const { saveFoodsData, toggleSaveFood } = useSaveFoods()

  const isSaved = saveFoodsData.some((saved) => saved.foodId === foodId)

  const [selectedMeal, setSelectedMeal] = useState(getMealType("eng"))
  const [selectedPortion, setSelectedPortion] = useState("g")
  const [quantity, setQuantity] = useState("100")
  const [portionSheetHeight, setPortionSheetHeight] = useState(320)

  const { data: foodData, isLoading: isFoodLoading } = useGetFoodById(foodId)
  const { data: nutritionData, isLoading: isNutritionLoading } =
    useGetNutritionByFoodId(foodId)
  const { data: portionData, isLoading: isPortionLoading } =
    useGetPortionByFoodId(foodId)

  const formattedPortionData = [
    "g",
    "ml",
    ...(portionData?.map(
      (portion) => `${portion.size} (${portion.weight} ${portion.unit})`
    ) || [])
  ].map((portion) => portion.toLowerCase())

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
      itemHeight = 70
    } else if (formattedPortionData.length > 5) {
      itemHeight = 60
    }

    const calculatedHeight = Math.min(
      Math.max(itemHeight * formattedPortionData.length, minHeight),
      maxHeight
    )

    setPortionSheetHeight(calculatedHeight)
  }, [formattedPortionData])

  const openMealSheet = () => MealSheetRef.current?.scrollTo(-300)

  const openPortionSheet = () =>
    PortionSheetRef.current?.scrollTo(-portionSheetHeight)

  const closeMealSheet = () => MealSheetRef.current?.scrollTo(0)

  const closePortionSheet = () => PortionSheetRef.current?.scrollTo(0)

  const handleCreatePortion = () => {
    router.push({
      pathname: "/foods/portions/create",
      params: { foodId }
    })
  }

  const handleQuantityChange = (text: string) => {
    setQuantity(text)
  }

  const handlePortionChange = (selectedItem: string) => {
    setSelectedPortion(selectedItem)

    if (selectedItem === "g" || selectedItem === "ml") {
      setQuantity("100")
    } else {
      setQuantity("1")
    }

    closePortionSheet()
  }

  const handleAddFood = () => {
    const { portionSize, portionWeight, portionUnit } = parsePortion(
      selectedPortion,
      quantity
    )

    const selectedMealValue =
      DATA.meals.find((meal) => meal.label === selectedMeal)?.value || ""

    const mealData = {
      userId: userId || "",
      type: selectedMealValue,
      items: [
        {
          foodId: foodId,
          quantity: selectedPortion === "g" ? 1 : parseInt(quantity, 10),
          size: portionSize,
          weight:
            selectedPortion === "g" ? parseInt(quantity, 10) : portionWeight,
          unit: portionUnit
        }
      ]
    }

    console.log(JSON.stringify(mealData, null, 2))

    addMeal(mealData)
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

  const handleToggleSaveFood = () => {
    if (foodData && nutritionData && portionData) {
      const { portionSize, portionWeight, portionUnit } = parsePortion(
        selectedPortion,
        quantity
      )

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

          <Content className="mt-2">
            <ScrollArea className="flex-1">
              <View onStartShouldSetResponder={() => true} className="pb-40">
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
                      onPress={openMealSheet}
                    />

                    <HStack center gap={8}>
                      <View style={{ flex: 1 }}>
                        <Input
                          value={quantity}
                          placeholder="1"
                          onChangeText={handleQuantityChange}
                          keyboardType="numeric"
                        />
                      </View>

                      <View style={{ flex: 3 }}>
                        <Select
                          defaultValue="Chọn khẩu phần ăn"
                          value={selectedPortion}
                          onPress={openPortionSheet}
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

            <Button
              size="lg"
              onPress={handleAddFood}
              className="absolute bottom-4 w-full"
            >
              Thêm vào bữa ăn
            </Button>
          </Content>
        </Container>

        <Sheet ref={MealSheetRef} dynamicHeight={300}>
          {DATA.meals.map((meal) => (
            <SheetItem
              key={meal.value}
              item={meal.label}
              isSelected={selectedMeal === meal.label}
              onSelect={(selectedItem) => {
                const selectedMealValue = DATA.meals.find(
                  (m) => m.label === selectedItem
                )?.label
                if (selectedMealValue) {
                  setSelectedMeal(selectedMealValue)
                }
                closeMealSheet()
              }}
            />
          ))}
        </Sheet>

        <Sheet ref={PortionSheetRef} dynamicHeight={portionSheetHeight}>
          {formattedPortionData.map((portion) => (
            <SheetItem
              key={portion}
              item={portion}
              isSelected={selectedPortion === portion}
              onSelect={handlePortionChange}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default FoodDetailsScreen
