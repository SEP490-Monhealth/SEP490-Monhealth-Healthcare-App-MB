import React, { useEffect, useState } from "react"

import { FlatList, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft, Scanner, SearchNormal1 } from "iconsax-react-native"

import { Container, Content, HStack, Input } from "@/components/global/atoms"
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

  // **State Management**
  const [limit, setLimit] = useState(5) // Số lượng món ăn mỗi lần tải
  const [foods, setFoods] = useState<FoodType[]>([]) // Danh sách món ăn
  const [isRefreshing, setIsRefreshing] = useState(false) // Trạng thái làm mới
  const [isFetchingMore, setIsFetchingMore] = useState(false) // Trạng thái tải thêm
  const [searchQuery, setSearchQuery] = useState("") // Ô tìm kiếm
  const debouncedSearchQuery = useDebounce(searchQuery) // Xử lý debounce
  const [totalItems, setTotalItems] = useState(0) // Tổng số món ăn từ API
  const [hasMore, setHasMore] = useState(true) // Trạng thái kiểm tra còn dữ liệu hay không

  // **API Calls**
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategories()

  const fetchFoods = async (newLimit: number) => {
    try {
      const { foods: newFoods, totalItems: total } = await getAllFoods(
        1,
        newLimit,
        debouncedSearchQuery
      )

      setFoods(newFoods) // Cập nhật danh sách món ăn
      setTotalItems(total) // Cập nhật tổng số món ăn
      setHasMore(newFoods.length < total) // Xác định còn dữ liệu hay không
    } catch (error) {
      console.error("Error fetching foods:", error)
    }
  }

  // **Initial Data Load**
  useEffect(() => {
    fetchFoods(limit)
  }, []) // Chỉ gọi một lần khi component mount

  // **Handle Search**
  useEffect(() => {
    if (debouncedSearchQuery) {
      setLimit(5) // Reset limit khi tìm kiếm
      fetchFoods(5) // Load lại dữ liệu từ đầu
    }
  }, [debouncedSearchQuery])

  // **Handlers**
  const handleBack = () => router.back()

  const onRefresh = async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    setLimit(5) // Reset limit khi làm mới
    await fetchFoods(5) // Làm mới dữ liệu
    setIsRefreshing(false)
  }

  const loadMoreFoods = async () => {
    if (isFetchingMore || !hasMore) return // Ngăn gọi API nếu đang tải hoặc đã tải hết
    setIsFetchingMore(true)

    // Chỉ tăng giới hạn nếu còn dữ liệu
    const newLimit = Math.min(limit + 5, totalItems)
    setLimit(newLimit)
    await fetchFoods(newLimit)
    setIsFetchingMore(false)
  }

  // **Prevent Extra Loads**
  const onEndReached = async () => {
    if (foods.length >= totalItems || isFetchingMore) return // Ngăn tải nếu đã hết dữ liệu
    loadMoreFoods()
  }

  console.log(`Current Limit: ${limit}, Total Items: ${totalItems}`)

  // **Loading State**
  if (isCategoriesLoading && !categoriesData) {
    return <LoadingScreen />
  }

  // **Render**
  return (
    <Container>
      {/* Header */}
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

      {/* Content */}
      <Content>
        <FlatList
          data={foods}
          keyExtractor={(item) => item.foodId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ListHeader className="pt-6">
              <FoodCategories categoriesData={categoriesData || []} />
              <Section title="Danh sách món ăn" />
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
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
          stickyHeaderIndices={[0]}
        />
      </Content>
    </Container>
  )
}

export default FoodsScreen
