import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input } from "@/components/global/atoms"
import {
  CategoryCard,
  CustomHeader,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"

import { COLORS } from "@/constants/app"
import { sampleCategoriesData } from "@/constants/categories"

import { useRouterHandlers } from "@/hooks/useRouter"

function CategoriesScreen() {
  const { categoryType } = useLocalSearchParams() as {
    categoryType: string
  }

  const { handleViewCategory } = useRouterHandlers()

  const categoriesData = sampleCategoriesData
  const filteredCategoriesData = categoriesData.filter(
    (c) => c.type === categoryType
  )

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const onRefresh = async () => {
    setIsRefreshing(true)
    setIsRefreshing(false)
  }

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
              onPress={() => handleViewCategory(item.categoryId)}
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default CategoriesScreen
