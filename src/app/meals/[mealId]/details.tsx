import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"
import { Setting4 } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
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
  useUpdateMealFoodQuantityStatus
} from "@/hooks/useMeal"
import { useRouterHandlers } from "@/hooks/useRouter"

import { formatDateYYYYMMDD } from "@/utils/formatters"
import { getMealTypeName } from "@/utils/helpers"

function MealDetailsScreen() {
  const { handleViewFood } = useRouterHandlers()

  const { user } = useAuth()
  const userId = user?.userId
  const date = formatDateYYYYMMDD(new Date())

  const { mutate: updateMealFoodStatus } = useUpdateMealFoodQuantityStatus()

  const { mealId } = useLocalSearchParams() as { mealId: string }

  const [isRefreshing, setIsRefreshing] = useState(false)

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

  const calorieValue = mealData?.nutrition.calories || 0
  const calorieGoal = 1249
  const progress = Math.min((calorieValue / calorieGoal) * 100, 100)

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

  return (
    <Container>
      <Header
        back
        label={getMealTypeName(mealData?.type || "")}
        action={{
          icon: <Setting4 variant="Bold" size={20} color={COLORS.primary} />,
          href: `/(tabs)/schedule`
        }}
      />

      <Content className="mt-2">
        <FlatList
          data={mealFoodsData || []}
          keyExtractor={(item, index) => `${item.foodId}-${index}`}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ListHeader>
              <ArcProgress
                size={240}
                width={14}
                fill={progress}
                // prefill
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
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default MealDetailsScreen
