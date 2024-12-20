import React, { useRef, useState } from "react"

import { SafeAreaView, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"
import { ArchiveTick } from "iconsax-react-native"

import {
  Content,
  HStack,
  Input,
  ScrollArea,
  Select,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { Nutrition, NutritionFacts } from "@/components/local/foods"

import { COLORS } from "@/constants/appConstants"
import { sampleFoodsData } from "@/constants/foods"

function FoodDetailsScreen() {
  const { foodId } = useLocalSearchParams()
  const foodData = sampleFoodsData.find((item) => item.foodId === foodId)

  const isSaved = false

  const [query, setQuery] = useState("1")

  const SheetRef = useRef<SheetRefProps>(null)

  const openSheet = () => {
    SheetRef.current?.scrollTo(-300)
  }

  if (!foodData) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="px-6">
        <Header
          back
          title={foodData.foodName}
          action={{
            icon: (
              <ArchiveTick
                variant={isSaved ? "Bold" : "Linear"}
                size={20}
                color={COLORS.primary}
              />
            )
          }}
        />

        <Content margin={false}>
          <ScrollArea>
            <View className="mt-2 pb-12">
              <VStack>
                <Section title="Khẩu phần ăn" margin={false} />

                <VStack gap={8}>
                  <Select
                    defaultValue="Chọn bữa ăn"
                    value="Bữa sáng"
                    onPress={openSheet}
                  />

                  <HStack center gap={8}>
                    <View style={{ flex: 1 }}>
                      <Input
                        value={query}
                        onChangeText={(text) => setQuery(text)}
                        placeholder="1"
                        keyboardType="numeric"
                        clearText={false}
                      />
                    </View>

                    <View style={{ flex: 4 }}>
                      <Select
                        defaultValue="Chọn khẩu phần ăn"
                        value="chén (100 g)"
                        onPress={openSheet}
                      />
                    </View>
                  </HStack>
                </VStack>
              </VStack>

              <VStack gap={8}>
                <Section title="Thông tin dinh dưỡng" />

                <VStack>
                  <Nutrition foodData={foodData} />
                  <NutritionFacts nutritionData={foodData} />
                </VStack>
              </VStack>

              <VStack gap={8}>
                <Section title="Hoạt động" />
              </VStack>
            </View>
          </ScrollArea>
        </Content>
      </View>

      <Sheet ref={SheetRef}>
        <View>
          <Text>Đại, Khải sủi nói mai đi coi đồ án mà khum đi coi</Text>
        </View>
      </Sheet>
    </SafeAreaView>
  )
}

export default FoodDetailsScreen
