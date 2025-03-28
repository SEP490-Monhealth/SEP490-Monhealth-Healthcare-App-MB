import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, Keyboard, View } from "react-native"
import { FlatList } from "react-native"

import { useRouter } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input } from "@/components/global/atoms"
import {
  CustomHeader,
  ErrorDisplay,
  ListFooter,
  ListHeader,
  WorkoutCard
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { WorkoutTypes } from "@/components/local/workouts"

import { COLORS } from "@/constants/color"
import { CategoryTypeEnum } from "@/constants/enum/Category"

import { useGetCategoriesByType } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetAllWorkouts } from "@/hooks/useWorkout"

import { WorkoutType } from "@/schemas/workoutSchema"

import { LoadingScreen } from "../loading"

function WorkoutsScreen() {
  const router = useRouter()

  const [workoutsData, setWorkoutsData] = useState<WorkoutType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [selectedType, setSelectedType] = useState<string>("Tất cả")

  const limit = 10

  const debouncedSearch = useDebounce(searchQuery)
  const debouncedFilter = useDebounce(selectedType, 0)

  const { data: typesData, isLoading: isTypesLoading } = useGetCategoriesByType(
    CategoryTypeEnum.Workout
  )

  const { data, isLoading } = useGetAllWorkouts(
    page,
    limit,
    debouncedFilter === "Tất cả" ? "" : debouncedFilter,
    debouncedSearch,
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
    setPage(1)
  }, [debouncedFilter, debouncedSearch])

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

  const handleViewWorkout = (workoutId: string) => {
    router.push(`/workouts/${workoutId}`)
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader className="pt-4">
        <WorkoutTypes
          typesData={typesData || []}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />

        <Section label="Danh sách bài tập" />
      </ListHeader>
    )
  }, [typesData, selectedType])

  if ((workoutsData.length === 0 && isLoading) || !typesData || isTypesLoading)
    return <LoadingScreen />

  return (
    <Container>
      <CustomHeader
        content={
          <Input
            value={searchQuery}
            placeholder="Tìm kiếm bài tập..."
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
          ListEmptyComponent={
            <ErrorDisplay
              imageSource={require("../../../public/images/monhealth-no-data-image.png")}
              title="Không có dữ liệu"
              description="Không có bộ bài tập nào phù hợp với tìm kiếm của bạn!"
              marginTop={24}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default WorkoutsScreen
