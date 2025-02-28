import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, View } from "react-native"
import { FlatList } from "react-native"

import { SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input } from "@/components/global/atoms"
import {
  CustomHeader,
  ListFooter,
  ListHeader,
  WorkoutCard
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { WorkoutTypes } from "@/components/local/workouts"

import { COLORS } from "@/constants/color"
import { TypeCategoryEnum } from "@/constants/enums"

import { useGetCategoriesByType } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useRouterHandlers } from "@/hooks/useRouter"
import { useGetAllWorkouts } from "@/hooks/useWorkout"

import { WorkoutType } from "@/schemas/workoutSchema"

import { LoadingScreen } from "../loading"

function WorkoutsScreen() {
  const { handleViewWorkout } = useRouterHandlers()

  const [workoutsData, setWorkoutsData] = useState<WorkoutType[]>([])
  const [limit, setLimit] = useState<number>(10)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [selectedType, setSelectedType] = useState<string>("Tất cả")

  const debouncedSearch = useDebounce(searchQuery)
  const debouncedFilter = useDebounce(selectedType, 0)

  const { data: typesData, isLoading: isTypesLoading } = useGetCategoriesByType(
    TypeCategoryEnum.Workout
  )

  const { data, isLoading } = useGetAllWorkouts(
    1,
    limit,
    debouncedFilter === "Tất cả" ? "" : debouncedFilter,
    debouncedSearch,
    undefined,
    true,
    true
  )

  useEffect(() => {
    if (data?.workouts) {
      setWorkoutsData(data.workouts)
      setHasMore(data.workouts.length < data.totalItems)
    }
  }, [data, limit])

  const onRefresh = async () => {
    setIsRefreshing(true)
    setLimit(10)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

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

    loadMoreData()
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader className="pt-4">
        <WorkoutTypes
          typesData={typesData || []}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />

        <Section label="Danh sách bài tập" actionText="Bài tập của tôi" />
      </ListHeader>
    )
  }, [typesData, selectedType])

  if ((!workoutsData && isLoading) || !typesData || isTypesLoading)
    return <LoadingScreen />

  return (
    <Container>
      <CustomHeader
        content={
          <Input
            value={searchQuery}
            placeholder="Tìm kiếm tên bài tập..."
            onChangeText={(text) => setSearchQuery(text)}
            startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
            canClearText
          />
        }
      />

      <Content>
        <FlatList
          data={workoutsData || []}
          keyExtractor={(item, index) => `${item.workoutId}-${index}`}
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
            <WorkoutCard
              name={item.name}
              exercises={item.exercises}
              duration={item.duration}
              caloriesBurned={item.caloriesBurned}
              onPress={() => handleViewWorkout(item.workoutId)}
            />
          )}
          ListFooterComponent={
            hasMore ? (
              <ListFooter>
                {isLoadingMore && <ActivityIndicator color={COLORS.primary} />}
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

export default WorkoutsScreen
