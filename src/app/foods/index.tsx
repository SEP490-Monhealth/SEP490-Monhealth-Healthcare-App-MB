import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Image, View } from "react-native"

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

import { useGetAllCategories } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"

import { FoodType } from "@/schemas/foodSchema"

import { getAllFoods } from "@/services/foodService"

import LoadingScreen from "../loading"

function FoodsScreen() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [limit, setLimit] = useState<number>(10)
  const [foods, setFoods] = useState<FoodType[]>([])
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [totalItems, setTotalItems] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả")

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
      console.error("Error fetching foods:", error)
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

  const handleViewUserFoods = () => {
    router.push("/foods/user")
  }

  const handleScanFood = () => {
    router.push("/foods/test-camera")
  }

  const ListHeaderComponent = useMemo(() => {
    return (
      <ListHeader className="pt-6">
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
                foodId={item.foodId}
                name={item.name}
                calories={item.nutrition.calories}
                size={item.portion?.size}
                weight={item.portion?.weight}
                unit={item.portion?.unit}
              />
            )}
            ListEmptyComponent={() => (
              <VStack center gap={20} className="mt-8">
                <View className="w-full items-center">
                  <Image
                    source={require("../../../public/images/no-data-image.png")}
                    style={{
                      width: 320,
                      height: 320
                    }}
                  />
                </View>
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
            contentContainerClassName="min-h-full"
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </VStack>
      </Content>
    </Container>
  )
}

export default FoodsScreen
