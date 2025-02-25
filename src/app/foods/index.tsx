import React, { useCallback, useEffect, useMemo, useState } from "react"

import { ActivityIndicator, Keyboard, View } from "react-native"
import { FlatList } from "react-native"

import { useRouter } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input, Modal } from "@/components/global/atoms"
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
import { TypeCategoryEnum } from "@/constants/enums"

import { useAuth } from "@/contexts/AuthContext"
import { useUserAllergies } from "@/contexts/UserAllergiesContext"

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

  const { allergies } = useUserAllergies()

  const [foodsData, setFoodsData] = useState<FoodType[]>([])
  const [page, setPage] = useState<number>(1)
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

  const debouncedFilter = useDebounce(selectedCategory, 0)
  const debouncedSearch = useDebounce(searchQuery)

  const { data: categoriesData, isLoading: isTypesLoading } =
    useGetCategoriesByType(TypeCategoryEnum.Food)

  const { data, isLoading } = useGetAllFoods(
    page,
    10,
    debouncedFilter === "Tất cả" ? "" : debouncedFilter,
    debouncedSearch,
    true,
    true,
    true
  )

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, debouncedFilter])

  useEffect(() => {
    if (data?.foods) {
      setFoodsData((prev) =>
        page === 1 ? data.foods : [...prev, ...data.foods]
      )
      setHasMore(data.foods.length === 10)
    }
    setIsLoadingMore(false)
  }, [data, page])

  const loadMoreData = () => {
    if (!hasMore || isLoadingMore || isLoading) return
    setIsLoadingMore(true)
    setPage((prev) => prev + 1)
  }

  const onEndReached = () => {
    if (isLoading || !hasMore || isLoadingMore) return
    Keyboard.dismiss()
    loadMoreData()
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setPage(1)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleAddFood = useCallback(
    (food: FoodType) => {
      const hasAllergy = food.allergies?.some((allergy) =>
        allergies.includes(allergy)
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
    [userId, allergies]
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

  if (isLoading || !categoriesData || isTypesLoading) return <LoadingScreen />

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
            ListEmptyComponent={
              <ErrorDisplay
                imageSource={require("../../../public/images/monhealth-no-data-image.png")}
                title="Không có dữ liệu"
                description="Không tìm thấy món ăn phù hợp. Hãy thử lại!"
                marginTop={24}
              />
            }
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
