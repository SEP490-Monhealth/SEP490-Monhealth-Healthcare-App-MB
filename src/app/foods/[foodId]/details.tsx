import React, { useState } from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"
import { SearchNormal1 } from "iconsax-react-native"

import {
  Container,
  Content,
  HStack,
  Input,
  Select,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { NutritionFacts } from "@/components/local/foods"

import { COLORS } from "@/constants/appConstants"
import { sampleFoodsData } from "@/constants/foods"

function FoodDetailsScreen() {
  const { foodId } = useLocalSearchParams()
  const foodData = sampleFoodsData.find((item) => item.foodId === foodId)

  const [query, setQuery] = useState("")

  if (!foodData) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back title="Chi tiết thức ăn" />

      <Content margin={false}>
        <VStack gap={24}>
          <View>
            <Text className="font-tbold text-xl text-primary">
              {foodData.foodName}
            </Text>
            <Text className="font-tregular text-base text-secondary">
              {foodData.portionSize} {foodData.portionWeight}{" "}
              {foodData.measurementUnit}
            </Text>
          </View>

          <VStack gap={12}>
            <HStack center gap={8}>
              <View style={{ flex: 1 }}>
                <Input
                  value={query}
                  onChangeText={(text) => setQuery(text)}
                  placeholder="1x"
                  keyboardType="numeric"
                  clearText={false}
                />
              </View>

              <View style={{ flex: 4 }}>
                <Select
                  defaultValue="Chọn khẩu phần ăn"
                  value="1 chén (100 g)"
                  onPress={() => {}}
                />
              </View>
            </HStack>

            <Select
              defaultValue="Chọn bữa ăn"
              value="Bữa sáng"
              onPress={() => {}}
            />
          </VStack>

          <View>
            <Section title="Thông tin dinh dưỡng" margin={false} />
            <NutritionFacts nutritionData={foodData} />
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default FoodDetailsScreen
