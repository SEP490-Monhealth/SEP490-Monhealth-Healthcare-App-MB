import React, { useEffect, useState } from "react"

import { FlatList, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft, Scanner, SearchNormal1 } from "iconsax-react-native"
import { MoreHorizontal } from "lucide-react-native"

import {
  Container,
  Content,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"
import {
  FoodCard,
  IconButton,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"
import { sampleFoodsData } from "@/constants/foods"

import { useDebounce } from "@/hooks/useDebounce"

function FoodsScreen() {
  const router = useRouter()

  const foodsData = sampleFoodsData

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery)

  const handleBack = () => {
    router.back()
  }

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
      <HStack center gap={20} className="min-h-14 justify-between">
        <IconButton
          icon={<ArrowLeft size={24} color={COLORS.primary} />}
          onPress={handleBack}
        />

        <View className="flex-1">
          <Input
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="Tìm kiếm tên thức ăn..."
            iconStart={<SearchNormal1 size={20} color={COLORS.primary} />}
            iconEnd={<Scanner size={20} color={COLORS.primary} />}
            iconEndAction={() => router.push("/foods/test-camera")}
          />
        </View>
      </HStack>

      <Content>
        {/* <VStack className="mt-4">
          <Input
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="Tìm kiếm tên thức ăn..."
            iconStart={<SearchNormal1 size={20} color={COLORS.primary} />}
          />
        </VStack> */}

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
