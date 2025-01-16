import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ExerciseCategoryCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { sampleExerciseCategoriesData } from "@/constants/exerciseCategories"

import { useRouterHandlers } from "@/hooks/useRouter"

function WorkoutScreen() {
  const exerciseCategoriesData = sampleExerciseCategoriesData

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { handleViewExerciseCategory } = useRouterHandlers()

  const onRefresh = async () => {
    setIsRefreshing(true)
    setIsRefreshing(false)
  }

  return (
    <Container>
      <Header back label="Bài tập" />

      <Content>
        <FlatList
          data={exerciseCategoriesData || []}
          keyExtractor={(item) => item.typeId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <ExerciseCategoryCard
              key={item.typeId}
              name={item.name}
              image={item.image}
              onPress={() => handleViewExerciseCategory(item.typeId)}
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default WorkoutScreen
