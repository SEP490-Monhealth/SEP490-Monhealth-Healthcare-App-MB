import React, { useEffect, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ListFooter,
  ListHeader,
  WorkoutCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { useGetAllWorkouts } from "@/hooks/useWorkout"

import { WorkoutType } from "@/schemas/workoutSchema"

function WorkoutUserScreen() {
  const router = useRouter()

  const { user } = useAuth()
  // const userId = user?.userId

  const userId = "3026595f-1414-4b74-be8f-11b7f6e7f4f6"

  const [workoutsData, setWorkoutsData] = useState<WorkoutType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading } = useGetAllWorkouts(
    page,
    limit,
    undefined,
    undefined,
    undefined,
    true,
    true
  )

  useEffect(() => {
    if (data?.workouts) {
      setWorkoutsData((prev) =>
        page === 1 ? data.workouts : [...prev, ...data.workouts]
      )
      setHasMore(page * limit < data.totalItems)
    }
  }, [data, page])

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
    loadMoreData()
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setPage(1)
  }

  const handleViewWorkout = (workoutId: string) => {
    router.push(`/workouts/${workoutId}`)
  }

  if (!workoutsData && isLoading) return <LoadingScreen />

  return (
    <Container>
      <Header
        back
        label="Bài tập của tôi"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          href: "/workouts/create"
        }}
      />

      <Content className="mt-2">
        <FlatList
          data={workoutsData || []}
          keyExtractor={(item, index) => `${item.workoutId}-${index}`}
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
              <Section label="Bài tập của tôi" margin={false} />
            </ListHeader>
          }
          renderItem={({ item }) => (
            <WorkoutCard
              name={item.name}
              exercises={item.exercises}
              duration={item.durationMinutes}
              caloriesBurned={item.caloriesBurned}
              onPress={() => handleViewWorkout(item.workoutId)}
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
  )
}

export default WorkoutUserScreen
