import React, { useRef, useState } from "react"

import {
  FlatList,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"
import { Swipeable } from "react-native-gesture-handler"

import { useLocalSearchParams } from "expo-router"

import { LoadingOverlay, LoadingScreen } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { Add, Minus, Trash } from "iconsax-react-native"
import { MoreHorizontal } from "lucide-react-native"

import {
  Container,
  Content,
  Sheet,
  SheetRefProps,
  SheetSelect
} from "@/components/global/atoms"
import {
  ArcProgress,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { NutritionSummary } from "@/components/local/meals"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import {
  useGetMealById,
  useGetMealFoodsByMealId,
  useUpdateMealFoodQuantity,
  useUpdateMealFoodStatus
} from "@/hooks/useMeal"
import { useRouterHandlers } from "@/hooks/useRouter"

import { formatDateYYYYMMDD } from "@/utils/formatters"
import { findMealFoodById, getMealTypeName } from "@/utils/helpers"

function MealDetailsScreen() {
  const { handleViewFood } = useRouterHandlers()
  const SheetRef = useRef<SheetRefProps>(null)

  const { user } = useAuth()
  const userId = user?.userId
  const { mealId } = useLocalSearchParams() as { mealId: string }

  const date = formatDateYYYYMMDD(new Date())

  const { mutate: updateMealFoodStatus } = useUpdateMealFoodStatus()
  const { mutate } = useUpdateMealFoodQuantity()

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [currentMealFoodId, setCurrentMealFoodId] = useState<string | null>(
    null
  )

  const {
    data: mealData,
    isLoading: isLoadingMeal,
    refetch: mealRefetch
  } = useGetMealById(mealId)
  const {
    data: mealFoodsData,
    isLoading: isLoadingMealFoods,
    refetch: mealFoodRefetch
  } = useGetMealFoodsByMealId(mealId)

  const mealType = mealData?.type || ""

  const calorieValue = mealData?.nutrition.calories || 0
  const calorieGoal = 1249
  const progress = Math.min((calorieValue / calorieGoal) * 100, 100)

  const prefillReady = isFetching === 0 && isMutating === 0

  const onRefresh = async () => {
    setIsRefreshing(true)
    await Promise.all([mealRefetch(), mealFoodRefetch()])
    setIsRefreshing(false)
  }

  if (!mealData || isLoadingMeal || !mealFoodsData || isLoadingMealFoods) {
    return <LoadingScreen />
  }

  const handleViewMealFood = (mealFoodId: string) => {
    if (!userId) {
      console.error("User ID is undefined")
      return
    }

    updateMealFoodStatus({ mealFoodId, mealId, userId, date })
  }

  const openSheet = () => {
    SheetRef.current?.scrollTo(-240)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  const handleMoreMealFood = (mealFoodId: string) => {
    setCurrentMealFoodId(mealFoodId)
    openSheet()
  }

  const handleIncreaseQuantity = (mealFoodId: string) => {
    const mealFood = findMealFoodById(mealFoodsData, mealFoodId)

    if (mealFood) {
      const updatedQuantity = mealFood.quantity + 1
      mutate({ mealFoodId, quantity: updatedQuantity, mealId })
    }
  }

  const handleDecreaseQuantity = (mealFoodId: string) => {
    const mealFood = findMealFoodById(mealFoodsData, mealFoodId)
    if (mealFood) {
      const updatedQuantity = mealFood.quantity - 1
      mutate({ mealFoodId, quantity: updatedQuantity, mealId })
    }
  }

  const handleDeleteMealFood = (mealFoodId: string) => {
    const mealFood = findMealFoodById(mealFoodsData, mealFoodId)

    if (mealFood) {
      const updatedQuantity = 0
      mutate({ mealFoodId, quantity: updatedQuantity, mealId })
      closeSheet()
    }
  }

  const mealFoodOptions = (mealFoodId: string) => {
    const mealFood = findMealFoodById(mealFoodsData, mealFoodId)

    return [
      {
        label: "Tăng số lượng",
        icon: <Add size={24} color={COLORS.primary} />,
        onPress: () => handleIncreaseQuantity(mealFoodId),
        disabled: false
      },
      {
        label: "Giảm số lượng",
        icon: <Minus size={24} color={COLORS.primary} />,
        onPress: () => handleDecreaseQuantity(mealFoodId),
        disabled: mealFood?.quantity === 1
      },
      {
        label: "Xóa món ăn",
        icon: <Trash variant="Bold" size={24} color={COLORS.destructive} />,
        onPress: () => handleDeleteMealFood(mealFoodId),
        disabled: false
      }
    ]
  }

  const renderRightActions = (mealFoodId: string) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleMoreMealFood(mealFoodId)}
        className="h-full w-20 items-center justify-center rounded-2xl border border-border bg-primary"
      >
        <MoreHorizontal size={24} color="white" />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <LoadingOverlay visible={isFetching > 0 || isMutating > 0} />

          <Header
            back
            label={getMealTypeName(mealType)}
            action={{
              icon: <Add size={24} color={COLORS.primary} />,
              href: `/foods`
            }}
          />

          <Content className="mt-2">
            <FlatList
              data={mealFoodsData || []}
              keyExtractor={(item, index) => `${item.foodId}-${index}`}
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              windowSize={5}
              removeClippedSubviews
              ListHeaderComponent={() => (
                <ListHeader>
                  <ArcProgress
                    size={240}
                    width={14}
                    fill={progress}
                    prefill={prefillReady}
                    arcSweepAngle={260}
                    rotation={230}
                    centerCircle
                    value={calorieValue}
                    maxValue={calorieGoal}
                    label="kcal"
                  />

                  <NutritionSummary nutritionData={mealData.nutrition} />

                  <Section label="Chi tiết bữa ăn" />
                </ListHeader>
              )}
              renderItem={({ item }) => (
                <Swipeable
                  renderRightActions={() => renderRightActions(item.mealFoodId)}
                  overshootRight={false}
                  overshootLeft={false}
                  rightThreshold={40}
                  friction={3}
                >
                  <FoodCard
                    variant="checkbox"
                    name={item.name}
                    calories={item.nutrition?.calories}
                    quantity={item.quantity}
                    size={item.portion?.size}
                    weight={item.portion?.weight}
                    unit={item.portion?.unit}
                    status={item.status}
                    onPress={() => handleViewFood(item.foodId)}
                    onStatusPress={() => {
                      handleViewMealFood(item.mealFoodId)
                    }}
                  />
                </Swipeable>
              )}
              ListFooterComponent={<ListFooter />}
              ItemSeparatorComponent={() => <View className="h-3" />}
            />
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={240}>
          {currentMealFoodId &&
            mealFoodOptions(currentMealFoodId).map((option, index) => (
              <SheetSelect
                key={index}
                label={option.label}
                icon={option.icon}
                disabled={option.disabled}
                onPress={option.onPress}
              />
            ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default MealDetailsScreen
