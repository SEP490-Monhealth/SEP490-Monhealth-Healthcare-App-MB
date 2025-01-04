import React, { useEffect, useState } from "react"

import { ActivityIndicator, Animated, FlatList, View } from "react-native"

import { Add } from "iconsax-react-native"

import { Container, Content, VStack } from "@/components/global/atoms"
import { FoodCard, ListFooter, ListHeader } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import { useAnimation } from "@/hooks/useAnimation"
import { useRouterHandlers } from "@/hooks/useRouter"

import { FoodType } from "@/schemas/foodSchema"

import { getFoodsByUserId } from "@/services/foodService"

import LoadingScreen from "../loading"

function FoodUserScreen() {
  const { handleViewFood } = useRouterHandlers()
  const { user } = useAuth()
  const userId = user?.userId

  // const userId = "3026595f-1414-4b74-be8f-11b7f6e7f4f6"

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [limit, setLimit] = useState<number>(10)
  const [foods, setFoods] = useState<FoodType[]>([])
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const fetchFoods = async (newLimit: number): Promise<void> => {
    try {
      const { foods: newFoods, totalItems: total } = await getFoodsByUserId(
        userId,
        1,
        newLimit
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
    await fetchFoods(10)
    setIsRefreshing(false)
  }

  const loadMoreFoods = async (): Promise<void> => {
    if (isFetchingMore || !hasMore) return
    setIsFetchingMore(true)

    const newLimit = Math.min(limit + 5, totalItems)
    setLimit(newLimit)
    await fetchFoods(newLimit)
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

  if (isLoading) {
    return <LoadingScreen />
  }

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
          data={foods || []}
          keyExtractor={(item) => item.foodId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <FoodCard
              key={item.foodId}
              variant="more"
              name={item.name}
              calories={item.nutrition.calories}
              size={item.portion?.size}
              weight={item.portion?.weight}
              unit={item.portion?.unit}
              onPress={() => handleViewFood(item.foodId)}
            />
          )}
          ListEmptyComponent={() => (
            <VStack center gap={20} className="mt-24">
              <View className="w-full items-center">
                <Animated.Image
                  source={require("../../../public/images/monhealth-no-data-image.png")}
                  style={{
                    width: 320,
                    height: 320,
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                  }}
                />
              </View>

              <VStack>
                <Animated.Text
                  style={{
                    opacity: textFadeAnim,
                    transform: [{ translateY: textTranslateAnim }]
                  }}
                  className="text-center font-tbold text-3xl text-primary"
                >
                  Không có dữ liệu
                </Animated.Text>

                <Animated.Text
                  style={{
                    opacity: textFadeAnim,
                    transform: [{ translateY: textTranslateAnim }]
                  }}
                  className="text-center font-tmedium text-lg text-accent"
                >
                  Bạn chưa lưu món ăn nào trong danh sách
                </Animated.Text>
              </VStack>
            </VStack>
          )}
          ListFooterComponent={
            hasMore ? (
              <ListFooter>
                {isFetchingMore && <ActivityIndicator color={COLORS.primary} />}
              </ListFooter>
            ) : (
              <ListFooter />
            )
          }
          contentContainerClassName="min-h-full"
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default FoodUserScreen
