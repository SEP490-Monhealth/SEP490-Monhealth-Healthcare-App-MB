import React, { useEffect, useState } from "react"

import { ActivityIndicator, FlatList, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft, Scanner, SearchNormal1 } from "iconsax-react-native"

import {
  Container,
  Content,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"
import {
  FoodCard,
  IconButton,
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

  const [limit, setLimit] = useState(10)
  const [foods, setFoods] = useState<FoodType[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery)
  const [totalItems, setTotalItems] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategories()

  const fetchFoods = async (newLimit: number, search = "") => {
    try {
      const { foods: newFoods, totalItems: total } = await getAllFoods(
        1,
        newLimit,
        search
      )
      setFoods(newFoods)
      setTotalItems(total)
      setHasMore(newFoods.length < total)
    } catch (error) {
      console.error("Error fetching foods:", error)
    }
  }

  useEffect(() => {
    fetchFoods(limit)
  }, [])

  useEffect(() => {
    if (debouncedSearchQuery !== undefined) {
      setLimit(10)
      fetchFoods(10, debouncedSearchQuery)
    }
  }, [debouncedSearchQuery])

  const handleBack = () => router.back()

  const onRefresh = async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    setLimit(10)
    await fetchFoods(10)
    setIsRefreshing(false)
  }

  const loadMoreFoods = async () => {
    if (isFetchingMore || !hasMore) return
    setIsFetchingMore(true)

    const newLimit = Math.min(limit + 10, totalItems)
    setLimit(newLimit)
    await fetchFoods(newLimit, debouncedSearchQuery)
    setIsFetchingMore(false)
  }

  const onEndReached = async () => {
    if (foods.length >= totalItems || isFetchingMore) return
    loadMoreFoods()
  }

  if (isCategoriesLoading && !categoriesData) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <HStack center gap={20} className="min-h-14 justify-between">
        <IconButton
          icon={<ArrowLeft size={24} color={COLORS.primary} />}
          onPress={handleBack}
        />
        <View className="flex-1">
          <Input
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="Tìm kiếm tên món ăn..."
            iconStart={<SearchNormal1 size={20} color={COLORS.primary} />}
            iconEnd={<Scanner size={20} color={COLORS.primary} />}
            iconEndAction={() => router.push("/foods/test-camera")}
          />
        </View>
      </HStack>

      <Content margin={false}>
        <VStack center className="pb-12">
          <FlatList
            data={foods}
            keyExtractor={(item) => item.foodId}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
              <ListHeader className="pt-6">
                <FoodCategories categoriesData={categoriesData || []} />
                <Section
                  title="Danh sách món ăn"
                  rightTitle="Món ăn của tôi"
                  onPress={() => console.log("Món ăn của tôi")}
                  className="mt-6"
                />
              </ListHeader>
            )}
            renderItem={({ item }) => (
              <FoodCard
                key={item.foodId}
                variant="add"
                foodId={item.foodId}
                foodName={item.foodName}
              />
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
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </VStack>
      </Content>
    </Container>
  )
}

export default FoodsScreen
