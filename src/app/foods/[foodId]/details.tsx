import React, { useEffect, useRef, useState } from "react"

import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
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

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"

import { useAuth } from "@/contexts/AuthContext"
import { useStorage } from "@/contexts/StorageContext"

import { useGetFoodById } from "@/hooks/useFood"
import { useCreateMeal } from "@/hooks/useMeal"
import { useGetNutritionByFoodId } from "@/hooks/useNutrition"
import { useGetPortionByFoodId } from "@/hooks/usePortion"

import { toFixed } from "@/utils/formatters"
import { getMealType, parsePortion } from "@/utils/helpers"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

function FoodDetailsScreen() {
  const router = useRouter()

  const { foodId } = useLocalSearchParams() as { foodId: string }

  const { user } = useAuth()
  const userId = user?.userId

  const MealSheetRef = useRef<SheetRefProps>(null)
  const PortionSheetRef = useRef<SheetRefProps>(null)

  const { mutate: addMeal } = useCreateMeal()

  const { savedFoods, toggleSavedFood } = useStorage()

  const isSaved = savedFoods.some((saved) => saved.foodId === foodId)

  const [selectedMeal, setSelectedMeal] = useState(getMealType("vi"))

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
    ...(portionData?.map((portion) =>
      portion.size && portion.size.trim() !== ""
        ? `${portion.size} (${toFixed(portion.weight, 1)} ${portion.unit})`
        : `${toFixed(portion.weight, 1)} ${portion.unit}`
    ) || [])
  ].map((portion) => portion.toLowerCase())

  const weightRatio =
    selectedPortion === "g"
      ? parseInt(quantity, 10) / 100
      : parsePortion(selectedPortion, quantity).portionWeight / 100

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

  const handleQuantityChange = (number: string) => {
    setQuantity(number)
  }

  const handleSelectPortion = (selectedItem: string) => {
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

    const selectedMealValue = DATA.MEALS.find(
      (meal) => meal.label === selectedMeal
    )

    const mealData = {
      userId: userId || "",
      type: selectedMealValue?.value,
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

    // @ts-ignore
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

  const handletoggleSavedFood = () => {
    if (foodData && nutritionData && portionData) {
      const { portionSize, portionWeight, portionUnit } = parsePortion(
        selectedPortion,
        quantity
      )

      toggleSavedFood({
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
            onActionPress={handletoggleSavedFood}
          />

          <Content className="mt-2">
            <ScrollArea className="flex-1">
              <View onStartShouldSetResponder={() => true} className="pb-12">
                <VStack>
                  <Section label="Mô tả" margin={false} />

                  <Text className="-mt-2 text-justify font-tregular text-base text-secondary">
                    {foodData.description}
                  </Text>

                  <Section
                    label="Khẩu phần ăn"
                    actionText="Thêm mới"
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

                  <Button onPress={handleAddFood} className="mt-4">
                    Thêm vào bữa ăn
                  </Button>
                </VStack>

                <VStack gap={8}>
                  <Section label="Thông tin dinh dưỡng" />

                  <VStack gap={12}>
                    <FoodNutrition
                      calories={nutritionData?.calories || 0}
                      protein={nutritionData?.protein || 0}
                      carbs={nutritionData?.carbs || 0}
                      fat={nutritionData?.fat || 0}
                      weightRatio={weightRatio}
                    />

                    <NutritionFacts
                      nutritionData={nutritionData}
                      weightRatio={weightRatio}
                    />
                  </VStack>
                </VStack>

                {/* <VStack gap={8}>
                  <Section label="Hoạt động" />
                </VStack> */}
              </View>
            </ScrollArea>
          </Content>
        </Container>

        <Sheet ref={MealSheetRef} dynamicHeight={300}>
          {DATA.MEALS.map((meal) => (
            <SheetItem
              key={meal.value}
              item={meal.label}
              isSelected={selectedMeal === meal.label}
              onSelect={(selectedItem) => {
                const selectedMealValue = DATA.MEALS.find(
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
              onSelect={handleSelectPortion}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default FoodDetailsScreen
