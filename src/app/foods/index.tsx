import React, { useEffect, useState } from "react"

import { FlatList, View } from "react-native"

import { SearchNormal1 } from "iconsax-react-native"
import { MoreHorizontal } from "lucide-react-native"

import { Container, Content, Input, VStack } from "@/components/global/atoms"
import { FoodCard, ListFooter, ListHeader } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"
import { sampleFoodsData } from "@/constants/foods"

import { useDebounce } from "@/hooks/useDebounce"

function FoodsScreen() {
  const foodsData = sampleFoodsData

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery)

  useEffect(() => {
    if (debouncedSearchQuery) {
      console.log("Debounced Search Query: ", debouncedSearchQuery)
    }
  }, [debouncedSearchQuery])

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <Container>
      <Header
        back
        title="Thức ăn"
        action={{
          icon: <MoreHorizontal size={20} color={COLORS.primary} />
        }}
      />

      <Content>
        <VStack className="mt-4">
          <Input
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="Tìm kiếm tên thức ăn..."
            iconStart={<SearchNormal1 size={20} color={COLORS.primary} />}
          />
        </VStack>

        <FlatList
          data={foodsData}
          keyExtractor={(item) => item.foodId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ListHeader>
              <Section title="Danh sách thức ăn" />
            </ListHeader>
          )}
          renderItem={({ item }) => (
            <FoodCard
              key={item.foodId}
              variant="add"
              foodId={item.foodId}
              foodName={item.foodName}
              calories={item.calories}
              portionSize={item.portionSize}
              portionWeight={item.portionWeight}
              measurementUnit={item.measurementUnit}
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default FoodsScreen
