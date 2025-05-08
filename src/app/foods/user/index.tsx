import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { Add, NoteAdd, Trash } from "iconsax-react-native"

import {
  Container,
  Content,
  Modal,
  Sheet,
  SheetRefProps,
  SheetSelect
} from "@/components/global/atoms"
import {
  ErrorDisplay,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { MealTypeEnum } from "@/constants/enum/Food"

import { useAuth } from "@/contexts/AuthContext"
import { useSearch } from "@/contexts/SearchContext"

import { useDeleteFood, useGetFoodsByUserId } from "@/hooks/useFood"
import { useGetNutritionGoal } from "@/hooks/useGoal"
import { useCreateMeal } from "@/hooks/useMeal"
import { useGetDailyMealByUserId } from "@/hooks/useTracker"

import { FoodType } from "@/schemas/foodSchema"
import { CreateMealType } from "@/schemas/mealSchema"

import { formatDateY } from "@/utils/formatters"
import { getMealTypeByTime } from "@/utils/helpers"

import { LoadingScreen } from "../../loading"

function FoodUserScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId
  const today = formatDateY(new Date())

  const { trackMealFood } = useSearch()

  const { mealType, date: selectedDate } = useLocalSearchParams<{
    mealType?: string
    date: string
  }>()

  const SheetRef = useRef<SheetRefProps>(null)

  const mealTypeParsed: MealTypeEnum =
    !isNaN(Number(mealType)) && Number(mealType) in MealTypeEnum
      ? (Number(mealType) as MealTypeEnum)
      : getMealTypeByTime()

  const [foodsData, setFoodsData] = useState<FoodType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [foodForMeal, setFoodForMeal] = useState<FoodType>()
  const [selectedFood, setSelectedFood] = useState<string | null>("")
  const [pendingMealData, setPendingMealData] = useState<CreateMealType | null>(
    null
  )
  const [warningModal, setWarningModal] = useState<{
    title: string
    description: string
    type: "allergy" | "calorie"
  } | null>(null)

  const limit = 10

  const { mutate: deleteFoodUser } = useDeleteFood()
  const { mutate: addMeal } = useCreateMeal()

  const { data, isLoading, refetch } = useGetFoodsByUserId(userId, page, limit)
  const { data: nutritionGoalData } = useGetNutritionGoal(userId)
  const { data: dailyMealData } = useGetDailyMealByUserId(userId, today)

  useEffect(() => {
    if (data?.foods) {
      setFoodsData((prev) =>
        page === 1 ? data.foods : [...prev, ...data.foods]
      )
      setHasMore(page * limit < data.totalItems)
    }
  }, [data, page])

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (!isLoading && isRefreshing) {
      setIsRefreshing(false)
    }
  }, [isLoading, isRefreshing])

  const loadMoreData = () => {
    if (!hasMore || isLoading) return
    setPage((prev) => prev + 1)
  }

  const onEndReached = () => {
    if (isLoading || !hasMore) return
    Keyboard.dismiss()
    loadMoreData()
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setPage(1)
    refetch()
    setIsRefreshing(false)
  }

  const handleAction = (food: FoodType) => {
    setSelectedFood(food.foodId)
    setFoodForMeal(food)
    openSheet()
  }

  const openSheet = () => SheetRef.current?.scrollTo(-200)
  const closeSheet = () => SheetRef.current?.scrollTo(0)

  const handleAddFood = useCallback(() => {
    if (!foodForMeal) return console.log("áđâs")

    const mealData = {
      userId: userId || "",
      type: mealTypeParsed,
      date: selectedDate || today,
      items: [
        {
          foodId: foodForMeal.foodId,
          quantity: 1,
          size: foodForMeal.portion?.size || "phần",
          weight: foodForMeal.portion?.weight || 100,
          unit: foodForMeal.portion?.unit || "g"
        }
      ]
    }

    if (userId) {
      trackMealFood({
        userId,
        foodId: foodForMeal.foodId,
        name: foodForMeal.name
      })
    }

    const totalCalories =
      dailyMealData &&
      dailyMealData.nutrition &&
      dailyMealData.nutrition.calories
        ? dailyMealData.nutrition.calories
        : 0

    const goalCalories =
      nutritionGoalData && nutritionGoalData.caloriesGoal
        ? nutritionGoalData.caloriesGoal
        : 0

    const foodCalories = foodForMeal.nutrition.calories

    const hasCalorieWarning = totalCalories + foodCalories > goalCalories * 1.2

    if (hasCalorieWarning) {
      setPendingMealData(mealData)
      setWarningModal({
        title: "Cảnh báo lượng calories",
        description:
          "Lượng calories nạp vào sẽ vượt quá mục tiêu của bạn đáng kể. Bạn có chắc chắn muốn thêm thức ăn này không?",
        type: "calorie"
      })
      return
    }

    confirmAddMeal(mealData)
  }, [userId, dailyMealData, nutritionGoalData, foodForMeal])

  const confirmAddMeal = (mealData: CreateMealType) => {
    // console.log(JSON.stringify(mealData, null, 2))

    closeSheet()
    addMeal(mealData)
    setWarningModal(null)
  }

  const handleDeleteFood = () => {
    setIsVisible(true)
    closeSheet()
  }

  const handleConfirmDelete = () => {
    if (selectedFood) {
      setIsVisible(false)
      deleteFoodUser(selectedFood)
    }
    setSelectedFood(null)
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        {foodsData.length > 0 && (
          <Section label="Danh sách thức ăn" margin={false} className="mt-2" />
        )}
      </ListHeader>
    )
  }, [foodsData.length])

  const handleViewFood = (foodId: string) => {
    router.push(`/foods/${foodId}`)
  }

  if (foodsData.length === 0 && isLoading) return <LoadingScreen />

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header
            back
            label="Thức ăn của tôi"
            action={{
              icon: <Add size={24} color={COLORS.primary} />,
              href: "/foods/create"
            }}
          />

          <Content className="mt-2">
            <FlatList
              data={foodsData || []}
              keyExtractor={(item, index) => `${item.foodId}-${index}`}
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[0]}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={21}
              removeClippedSubviews
              updateCellsBatchingPeriod={50}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
              ListHeaderComponent={FlatListHeader}
              renderItem={({ item }) => (
                <FoodCard
                  variant="more"
                  name={item.name}
                  calories={item.nutrition.calories}
                  size={item.portion?.size}
                  weight={item.portion?.weight}
                  unit={item.portion?.unit}
                  onPress={() => handleViewFood(item.foodId)}
                  onMorePress={() => handleAction(item)}
                />
              )}
              ListFooterComponent={
                hasMore ? (
                  <ListFooter>
                    <ActivityIndicator color={COLORS.primary} />
                  </ListFooter>
                ) : (
                  <ListFooter />
                )
              }
              ListEmptyComponent={
                <ErrorDisplay
                  imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
                  title="Không có dữ liệu"
                  description="Không tìm thấy có thức ăn nào ở đây!"
                  marginTop={24}
                />
              }
              ItemSeparatorComponent={() => <View className="h-3" />}
            />
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={200}>
          <SheetSelect
            label="Thêm vào bữa ăn"
            icon={<NoteAdd variant="Bold" size="20" color={COLORS.primary} />}
            onPress={() => handleAddFood()}
          />

          <SheetSelect
            variant="danger"
            label="Xóa"
            icon={<Trash variant="Bold" size="20" color={COLORS.destructive} />}
            onPress={handleDeleteFood}
          />
        </Sheet>

        <Modal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          title="Xóa thức ăn"
          description="Bạn có chắc chắn muốn xóa thức ăn này không?"
          confirmText="Đồng ý"
          cancelText="Hủy"
          onConfirm={handleConfirmDelete}
        />

        {warningModal && (
          <Modal
            isVisible={!!warningModal}
            title={warningModal.title}
            description={warningModal.description}
            confirmText="Đồng ý"
            cancelText="Hủy"
            onConfirm={() => {
              if (pendingMealData) {
                confirmAddMeal(pendingMealData)
              } else {
                setWarningModal(null)
              }
            }}
            onClose={() => setWarningModal(null)}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default FoodUserScreen
