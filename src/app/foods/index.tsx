import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"

import { useRouter } from "expo-router"

import { Scanner, SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input, VStack } from "@/components/global/atoms"
import {
  CustomHeader,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { FoodCategories } from "@/components/local/foods"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import { useGetAllCategories } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useCreateMeal } from "@/hooks/useMeal"
import { useRouterHandlers } from "@/hooks/useRouter"

import { FoodType } from "@/schemas/foodSchema"

import { getAllFoods } from "@/services/foodService"

import { getMealType } from "@/utils/helpers"

import { LoadingScreen } from "../loading"

function FoodsScreen() {
  const router = useRouter()
  const { handleViewFood } = useRouterHandlers()

  const { user } = useAuth()
  const userId = user?.userId

  const { mutate: addMeal } = useCreateMeal()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [limit, setLimit] = useState<number>(10)
  const [foods, setFoods] = useState<FoodType[]>([])
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [totalItems, setTotalItems] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả")
  const [addedFoods, setAddedFoods] = useState<Set<string>>(new Set())

  const debouncedSearchQuery: string = useDebounce(searchQuery)
  const debouncedSelectedCategory: string = useDebounce(selectedCategory, 0)

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategories()

  const fetchFoods = async (
    newLimit: number,
    search: string = "",
    category: string = "Tất cả"
  ): Promise<void> => {
    try {
      const { foods: newFoods, totalItems: total } = await getAllFoods(
        1,
        newLimit,
        search,
        "Public",
        category === "Tất cả" ? "" : category,
        false,
        true
      )

      setFoods(newFoods)
      setTotalItems(total)
      setHasMore(newFoods.length < total)
    } catch (error) {
      console.log("Error fetching foods:", error)
    }
  }

  const onRefresh = async (): Promise<void> => {
    if (isRefreshing) return
    setIsRefreshing(true)
    setLimit(10)
    await fetchFoods(10, debouncedSearchQuery, debouncedSelectedCategory)
    setIsRefreshing(false)
  }

  const loadMoreFoods = async (): Promise<void> => {
    if (isFetchingMore || !hasMore) return
    setIsFetchingMore(true)

    const newLimit = Math.min(limit + 5, totalItems)
    setLimit(newLimit)
    await fetchFoods(newLimit, debouncedSearchQuery, debouncedSelectedCategory)
    setIsFetchingMore(false)
  }

  const onEndReached = async (): Promise<void> => {
    if (foods.length >= totalItems || isFetchingMore) return
    loadMoreFoods()
  }

  useEffect(() => {
    fetchFoods(limit, debouncedSearchQuery, debouncedSelectedCategory)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [debouncedSearchQuery, debouncedSelectedCategory])

  useEffect(() => {
    return () => {
      setAddedFoods(new Set())
    }
  }, [])

  const handleAddFood = (food: FoodType) => {
    const mealType = getMealType("en")

    const size = food.portion?.size || "phần"
    const weight = food.portion?.weight || 100
    const unit = food.portion?.unit || "g"

    const mealData = {
      userId: userId || "",
      type: mealType,
      items: [
        {
          foodId: food.foodId,
          quantity: 1,
          size,
          weight,
          unit
        }
      ]
    }

    console.log(JSON.stringify(mealData, null, 2))

    addMeal(mealData, {
      onSuccess: () => {
        setAddedFoods((prev) => new Set(prev).add(food.foodId))
      }
    })
  }

  const handleViewUserFoods = () => {
    router.push("/foods/user")
  }

  const handleScanFood = () => {
    router.push("/foods/test-camera")
  }

  const ListHeaderComponent = useMemo(() => {
    return (
      <ListHeader className="pt-4">
        <FoodCategories
          categoriesData={categoriesData || []}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Section
          label="Danh sách món ăn"
          action="Món ăn của tôi"
          onPress={handleViewUserFoods}
        />
      </ListHeader>
    )
  }, [categoriesData, selectedCategory])

  if (isLoading || (isCategoriesLoading && !categoriesData)) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <CustomHeader
        content={
          <Input
            value={searchQuery}
            placeholder="Tìm kiếm tên món ăn..."
            onChangeText={(text) => setSearchQuery(text)}
            startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
            endIcon={<Scanner size={20} color={COLORS.primary} />}
            onEndIconPress={handleScanFood}
            canClearText
          />
        }
      />

      <Content>
        <VStack center>
          <FlatList
            data={foods || []}
            keyExtractor={(item) => item.foodId}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={({ item }) => (
              <FoodCard
                key={item.foodId}
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
            ListEmptyComponent={() => (
              <VStack center gap={20} className="mt-8">
                <Image
                  source={require("../../../public/images/monhealth-no-data-image.png")}
                  className="items-center"
                  style={{
                    width: 320,
                    height: 320
                  }}
                />

                <VStack>
                  <Text className="text-center font-tbold text-3xl text-primary">
                    Không có món ăn nào được tìm thấy
                  </Text>
                  <Text className="text-center font-tmedium text-lg text-accent">
                    Vui lòng thử tìm kiếm lại hoặc thay đổi danh mục để hiển thị
                    kết quả
                  </Text>
                </VStack>
              </VStack>
            )}
            ListFooterComponent={
              hasMore ? (
                <ListFooter>
                  {isFetchingMore && (
                    <ActivityIndicator color={COLORS.primary} />
                  )}
                </ListFooter>
              ) : (
                <ListFooter />
              )
            }
            // contentContainerClassName="min-h-full"
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </VStack>
      </Content>
    </Container>
  )
}

export default FoodsScreen
