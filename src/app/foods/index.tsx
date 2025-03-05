import React, { useCallback, useEffect, useMemo, useState } from "react"

import { ActivityIndicator, View } from "react-native"
import { FlatList } from "react-native"
import { Keyboard } from "react-native"

import { useRouter } from "expo-router"

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
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { FoodCategories } from "@/components/local/foods"

import { COLORS } from "@/constants/color"
import { CategoryTypeEnum } from "@/constants/enum/CategoryType"

import { useAuth } from "@/contexts/AuthContext"
import { useStorage } from "@/contexts/StorageContext"

import { useGetCategoriesByType } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetAllFoods } from "@/hooks/useFood"
import { useCreateMeal } from "@/hooks/useMeal"

import { FoodType } from "@/schemas/foodSchema"
import { CreateMealType } from "@/schemas/mealSchema"

import { getMealTypeByTime } from "@/utils/helpers"

import { LoadingScreen } from "../loading"

function FoodsScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { userAllergies, searchHistory, addSearchHistory, clearSearchHistory } =
    useStorage()

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const limit = 10

  const debouncedSearch = useDebounce(searchQuery)
  const debouncedFilter = useDebounce(selectedCategory, 0)

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesByType(CategoryTypeEnum.Food)

  const { data, isLoading } = useGetAllFoods(
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
  }

  const handleAddFood = useCallback(
    (food: FoodType) => {
      const hasAllergy = food.allergies?.some((allergy) =>
        userAllergies.includes(allergy)
      )

      const mealData = {
        userId: userId || "",
        type: getMealTypeByTime(),
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

      if (hasAllergy) {
        setPendingMealData(mealData)
        setIsModalVisible(true)
      } else {
        confirmAddMeal(mealData)
      }
    },
    [userId, userAllergies]
  )

  const confirmAddMeal = (mealData: CreateMealType) => {
    console.log(JSON.stringify(mealData, null, 2))

    // addMeal(mealData, {
    //   onSuccess: () =>
    //     setAddedFoods((prev) => new Set(prev).add(mealData.items[0].foodId))
    // })
    setIsModalVisible(false)
  }

  const handleViewFood = (foodId: string, foodName: string) => {
    addSearchHistory(foodName)
    router.push(`/foods/${foodId}/details`)
  }

  const handleViewUserFoods = () => router.push("/foods/user")

  // const handleScanFood = () => router.push("/foods/test-camera")

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader className="pt-4">
        <FoodCategories
          categoriesData={categoriesData || []}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {searchHistory.length > 0 && (
          <Section
            label="Tìm kiếm gần đây"
            actionText="Xóa tất cả"
            onPress={clearSearchHistory}
          />
        )}

        <HStack gap={6} className="flex-wrap">
          {searchHistory.map((search, index) => (
            <Badge key={index} label={search} />
          ))}
        </HStack>

        <Section
          label="Danh sách món ăn"
          actionText="Món ăn của tôi"
          onPress={handleViewUserFoods}
        />
      </ListHeader>
    )
  }, [categoriesData, selectedCategory, searchHistory])

  if ((!foodsData && isLoading) || !categoriesData || isCategoriesLoading)
    return <LoadingScreen />

  return (
    <>
      <Container>
        <CustomHeader
          content={
            <Input
              value={searchQuery}
              placeholder="Tìm kiếm tên món ăn..."
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
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </Content>
      </Container>

      <Modal
        isVisible={isModalVisible}
        title="Cảnh báo"
        description="Món ăn này có thể chứa thành phần gây dị ứng. Bạn có chắc chắn muốn thêm không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={() => pendingMealData && confirmAddMeal(pendingMealData)}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default FoodsScreen
