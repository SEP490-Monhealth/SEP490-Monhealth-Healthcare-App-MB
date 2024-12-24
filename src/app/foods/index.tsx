import React, { useEffect, useState } from "react"

import { ActivityIndicator, FlatList, Image, View } from "react-native"

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

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [limit, setLimit] = useState<number>(10)
  const [foods, setFoods] = useState<FoodType[]>([])
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [totalItems, setTotalItems] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const debouncedSearchQuery: string = useDebounce(searchQuery)

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategories()

  const fetchFoods = async (
    newLimit: number,
    search: string = ""
  ): Promise<void> => {
    try {
      const { foods: newFoods, totalItems: total } = await getAllFoods(
        1,
        newLimit,
        search,
        "",
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
    await fetchFoods(10)
    setIsRefreshing(false)
  }

  const loadMoreFoods = async (): Promise<void> => {
    if (isFetchingMore || !hasMore) return
    setIsFetchingMore(true)

    const newLimit = Math.min(limit + 10, totalItems)
    setLimit(newLimit)
    await fetchFoods(newLimit, debouncedSearchQuery)
    setIsFetchingMore(false)
  }

  const onEndReached = async (): Promise<void> => {
    if (foods.length >= totalItems || isFetchingMore) return
    loadMoreFoods()
  }

  useEffect(() => {
    fetchFoods(limit)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (debouncedSearchQuery !== undefined) {
      setLimit(10)
      fetchFoods(10, debouncedSearchQuery)
    }
  }, [debouncedSearchQuery])

  if (isLoading || (isCategoriesLoading && !categoriesData)) {
    return <LoadingScreen />
  }

  const handleBack = (): void => router.back()

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
            data={foods || []}
            keyExtractor={(item) => item.foodId}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            onEndReached={onEndReached}
            onEndReachedThreshold={1}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
              <ListHeader className="pt-6">
                <FoodCategories categoriesData={categoriesData || []} />
                <Section
                  label="Danh sách món ăn"
                  action="Món ăn của tôi"
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
                name={item.name}
              />
            )}
            ListEmptyComponent={() => (
              <VStack center gap={20} className="mt-8">
                {/* <VStack>
                  <Text className=" font-tbold text-3xl text-primary">
                    Không có kết quả
                  </Text>
                  <Text className=" font-tmedium text-lg text-secondary">
                    Không tìm thấy món ăn nào phù hợp với tìm kiếm của bạn
                  </Text>
                </VStack> */}

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
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </VStack>
      </Content>
    </Container>
  )
}

export default FoodsScreen
