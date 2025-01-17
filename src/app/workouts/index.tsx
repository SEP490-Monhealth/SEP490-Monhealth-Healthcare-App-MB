import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  CategoryCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { sampleCategoriesData } from "@/constants/categories"

import { useRouterHandlers } from "@/hooks/useRouter"

function WorkoutScreen() {
  const categoriesData = sampleCategoriesData
  const filteredCategoriesData = categoriesData.filter(
    (c) => c.type === "Exercise"
  )

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
          data={filteredCategoriesData || []}
          keyExtractor={(item) => item.categoryId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <CategoryCard
              key={item.categoryId}
              name={item.name}
              image={item.image}
              onPress={() => handleViewExerciseCategory(item.categoryId)}
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
