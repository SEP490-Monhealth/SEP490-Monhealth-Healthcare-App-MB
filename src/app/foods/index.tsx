import React, { useCallback, useEffect, useMemo, useState } from "react"

import { ActivityIndicator, View } from "react-native"
import { FlatList } from "react-native"
import { Keyboard } from "react-native"

import { useRouter } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input, Modal } from "@/components/global/atoms"
import {
  CustomHeader,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { FoodCategories } from "@/components/local/foods"

import { COLORS } from "@/constants/color"
import { TypeCategoryEnum } from "@/constants/enums"

import { useAuth } from "@/contexts/AuthContext"
import { useUserFood } from "@/contexts/UserFoodContext"

import { useGetCategoriesByType } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetAllFoods } from "@/hooks/useFood"
import { useCreateMeal } from "@/hooks/useMeal"
import { useRouterHandlers } from "@/hooks/useRouter"

import { FoodType } from "@/schemas/foodSchema"
import { CreateMealType } from "@/schemas/mealSchema"

import { getMealTypeByTime } from "@/utils/helpers"

import { LoadingScreen } from "../loading"

function FoodsScreen() {
  const router = useRouter()
  const { handleViewFood } = useRouterHandlers()

  const { user } = useAuth()
  const userId = user?.userId

  const { mutate: addMeal } = useCreateMeal()

  const { userAllergiesData } = useUserFood()

  const [foodsData, setFoodsData] = useState<FoodType[]>([])
  const [limit, setLimit] = useState<number>(10)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả")
  const [addedFoods, setAddedFoods] = useState<Set<string>>(new Set())
  const [pendingMealData, setPendingMealData] = useState<CreateMealType | null>(
    null
  )
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const debouncedSearch = useDebounce(searchQuery)
  const debouncedFilter = useDebounce(selectedCategory, 0)

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesByType(TypeCategoryEnum.Food)

  const { data, isLoading } = useGetAllFoods(
    1,
    limit,
    debouncedFilter === "Tất cả" ? "" : debouncedFilter,
    debouncedSearch,
    true,
    true,
    true
  )

  useEffect(() => {
    if (data?.foods) {
      setFoodsData(data.foods)
      setHasMore(data.foods.length < data.totalItems)
    }
  }, [data, limit])

  const loadMoreData = () => {
    if (!hasMore || isLoadingMore) return

    setIsLoadingMore(true)

    setTimeout(() => {
      setLimit((prev) => prev + 10)
      setIsLoadingMore(false)
    }, 200)
  }

  const onEndReached = () => {
    if (isLoading || !hasMore || isLoadingMore) return
    Keyboard.dismiss()
    loadMoreData()
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setLimit(10)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleAddFood = useCallback(
    (food: FoodType) => {
      const hasAllergy = food.allergies?.some((allergy) =>
        userAllergiesData.includes(allergy)
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
    [userId, userAllergiesData]
  )

  const confirmAddMeal = (mealData: CreateMealType) => {
    console.log(JSON.stringify(mealData, null, 2))

    // addMeal(mealData, {
    //   onSuccess: () =>
    //     setAddedFoods((prev) => new Set(prev).add(mealData.items[0].foodId))
    // })
    setIsModalVisible(false)
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

        <Section label="Tìm kiếm gần đây" actionText="Xóa tất cả" />

        <Section
          label="Danh sách món ăn"
          actionText="Món ăn của tôi"
          onPress={handleViewUserFoods}
        />
      </ListHeader>
    )
  }, [categoriesData, selectedCategory])

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
            maxToRenderPerBatch={5}
            windowSize={5}
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
                onPress={() => handleViewFood(item.foodId)}
                onAddPress={() => handleAddFood(item)}
              />
            )}
            ListFooterComponent={
              hasMore ? (
                <ListFooter>
                  {isLoadingMore && (
                    <ActivityIndicator color={COLORS.primary} />
                  )}
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
