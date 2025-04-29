import React, { useCallback, useEffect, useMemo, useState } from "react"

import { ActivityIndicator, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native"
import { Keyboard } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import {
  Badge,
  Container,
  Content,
  HStack,
  Input,
  Modal
} from "@/components/global/atoms"
import {
  CustomHeader,
  ErrorDisplay,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { FoodCategories } from "@/components/local/foods"

import { COLORS } from "@/constants/color"
import { CategoryTypeEnum } from "@/constants/enum/Category"
import { MealTypeEnum } from "@/constants/enum/Food"

import { useAuth } from "@/contexts/AuthContext"
import { useSearch } from "@/contexts/SearchContext"
import { useStorage } from "@/contexts/StorageContext"

import { useGetCategoriesByType } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetAllFoods } from "@/hooks/useFood"
import { useGetNutritionGoal } from "@/hooks/useGoal"
import { useCreateMeal } from "@/hooks/useMeal"
import { useGetDailyMealByUserId } from "@/hooks/useTracker"

import { FoodType } from "@/schemas/foodSchema"
import { CreateMealType } from "@/schemas/mealSchema"

import { formatDateY } from "@/utils/formatters"
import { getMealTypeByTime } from "@/utils/helpers"

import { LoadingScreen } from "../loading"

function FoodsScreen() {
  const router = useRouter()
  const { mealType, date: selectedDate } = useLocalSearchParams<{
    mealType?: string
    date: string
  }>()

  const mealTypeParsed: MealTypeEnum =
    !isNaN(Number(mealType)) && Number(mealType) in MealTypeEnum
      ? (Number(mealType) as MealTypeEnum)
      : getMealTypeByTime()

  const { user } = useAuth()
  const userId = user?.userId

  const today = formatDateY(new Date())

  const { userAllergies } = useStorage()
  const {
    getSearchFoodHistory,
    addSearchFoodHistory,
    clearSearchFoodHistory,
    trackMealFood
  } = useSearch()

  const searchFoodHistory = userId ? getSearchFoodHistory(userId) : []

  const { mutate: addMeal } = useCreateMeal()

  const [foodsData, setFoodsData] = useState<FoodType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả")
  const [addedFoods, setAddedFoods] = useState<Set<string>>(new Set())
  const [pendingMealData, setPendingMealData] = useState<CreateMealType | null>(
    null
  )
  const [warningModal, setWarningModal] = useState<{
    title: string
    description: string
    type: "allergy" | "calorie"
  } | null>(null)

  const limit = 10

  const debouncedSearch = useDebounce(searchQuery)
  const debouncedFilter = useDebounce(selectedCategory, 0)

  const { data: dailyMealData, isLoading: isDailyMealLoading } =
    useGetDailyMealByUserId(userId, today)

  const { data: nutritionGoalData, isLoading: isGoalLoading } =
    useGetNutritionGoal(userId)

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesByType(CategoryTypeEnum.Food)

  const { data, isLoading, refetch } = useGetAllFoods(
    page,
    limit,
    debouncedFilter === "Tất cả" ? "" : debouncedFilter,
    debouncedSearch,
    true,
    true,
    true
  )

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
  }, [debouncedFilter, debouncedSearch])

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

  const handleAddFood = useCallback(
    (food: FoodType) => {
      const mealData = {
        userId: userId || "",
        type: mealTypeParsed,
        date: selectedDate || today,
        items: [
          {
            foodId: food.foodId,
            quantity: 1,
            size: food.portion?.size || "phần",
            weight: food.portion?.weight || 100,
            unit: food.portion?.unit || "g"
          }
        ]
      }

      if (userId) {
        trackMealFood({ userId, foodId: food.foodId, name: food.name })
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

      const foodCalories = food.nutrition.calories

      const hasAllergyWarning = food?.allergies?.some((allergy) =>
        userAllergies.includes(allergy)
      )
      const hasCalorieWarning =
        totalCalories + foodCalories > goalCalories * 1.2

      if (hasAllergyWarning) {
        setPendingMealData(mealData)
        setWarningModal({
          title: "Cảnh báo dị ứng",
          description:
            "Thức ăn này có thể chứa thành phần gây dị ứng. Bạn có chắc chắn muốn thêm không?",
          type: "allergy"
        })
        return
      }

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
    },
    [userId, userAllergies, dailyMealData, nutritionGoalData]
  )

  const confirmAddMeal = (mealData: CreateMealType) => {
    // console.log(JSON.stringify(mealData, null, 2))

    addMeal(mealData, {
      onSuccess: () =>
        setAddedFoods((prev) => new Set(prev).add(mealData.items[0].foodId))
    })
    setWarningModal(null)
  }

  const handleClearSearchHistory = () => {
    if (userId) clearSearchFoodHistory(userId)
  }

  const handleViewUserFoods = () => router.push("/foods/user")

  const handleViewFoodSuggestions = () => {
    router.push({
      pathname: "/foods/suggestions",
      params: { mealType: mealTypeParsed.toString(), date: selectedDate }
    })
  }

  const handleViewFood = (foodId: string, foodName: string) => {
    if (userId) addSearchFoodHistory({ userId, foodId, name: foodName })
    router.push({
      pathname: `/foods/${foodId}`,
      params: { mealType: mealTypeParsed.toString(), date: selectedDate }
    })
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader className="pt-4">
        <FoodCategories
          categoriesData={categoriesData || []}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {searchFoodHistory.length > 0 && (
          <Section
            label="Tìm kiếm gần đây"
            actionText="Xóa tất cả"
            onPress={handleClearSearchHistory}
          />
        )}

        <HStack gap={6} className="flex-wrap">
          {searchFoodHistory.map((search) => (
            <TouchableOpacity
              key={search.foodId}
              activeOpacity={0.8}
              onPress={() => handleViewFood(search.foodId, search.name)}
            >
              <Badge label={search.name} />
            </TouchableOpacity>
          ))}
        </HStack>

        <Section
          label="Danh sách thức ăn"
          // actionText="Thức ăn của tôi"
          // onPress={handleViewUserFoods}
          actionText="Đề xuất thức ăn"
          onPress={handleViewFoodSuggestions}
        />
      </ListHeader>
    )
  }, [categoriesData, selectedCategory, searchFoodHistory])

  if (
    (foodsData.length === 0 && isLoading) ||
    !categoriesData ||
    isCategoriesLoading ||
    isDailyMealLoading ||
    isGoalLoading
  )
    return <LoadingScreen />

  return (
    <>
      <Container>
        <CustomHeader
          content={
            <Input
              value={searchQuery}
              placeholder="Tìm kiếm thức ăn..."
              onChangeText={(text) => setSearchQuery(text)}
              startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
              canClearText
            />
          }
        />

        <Content>
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
                variant="add"
                name={item.name}
                calories={item.nutrition.calories}
                size={item.portion?.size}
                weight={item.portion?.weight}
                unit={item.portion?.unit}
                isAdded={addedFoods.has(item.foodId)}
                onPress={() => handleViewFood(item.foodId, item.name)}
                onAddPress={() => handleAddFood(item)}
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
                imageSource={require("../../../public/images/monhealth-no-data-image.png")}
                title="Không có dữ liệu"
                description="Không tìm thấy có thức ăn nào ở đây!"
                marginTop={12}
              />
            }
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </Content>
      </Container>

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
    </>
  )
}

export default FoodsScreen
