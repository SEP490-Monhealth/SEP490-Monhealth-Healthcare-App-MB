import React, { useEffect, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useRouter } from "expo-router"

import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ErrorDisplay,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { useGetFoodsByUserId } from "@/hooks/useFood"

import { FoodType } from "@/schemas/foodSchema"

import { LoadingScreen } from "../../loading"

function FoodUserScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  // const userId = "3026595f-1414-4b74-be8f-11b7f6e7f4f6"

  const [foodsData, setFoodsData] = useState<FoodType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading } = useGetFoodsByUserId(userId, page, limit)

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
  }

  const handleViewFood = (foodId: string) => {
    router.push(`/foods/${foodId}`)
  }

  if (foodsData.length === 0 && isLoading) return <LoadingScreen />

  return (
    <Container>
      <Header
        back
        label="Món ăn của tôi"
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
          ListHeaderComponent={
            <ListHeader>
              <Section label="Món ăn của tôi" margin={false} />
            </ListHeader>
          }
          renderItem={({ item }) => (
            <FoodCard
              variant="more"
              name={item.name}
              calories={item.nutrition.calories}
              size={item.portion?.size}
              weight={item.portion?.weight}
              unit={item.portion?.unit}
              onPress={() => handleViewFood(item.foodId)}
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
              description="Không tìm thấy có món ăn nào ở đây!"
              marginTop={24}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default FoodUserScreen
