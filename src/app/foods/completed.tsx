import React, { useRef, useState } from "react"

import { Animated, SafeAreaView, Text, TextInput, View } from "react-native"

import {
  Button,
  HStack,
  Select,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"

import { useAnimation } from "@/hooks/useAnimation"

const FoodCompletedScreen = () => {
  const SheetRef = useRef<SheetRefProps>(null)
  const [weight, setWeight] = useState("")

  const openSheet = () => {
    SheetRef.current?.scrollTo(-300)
  }

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="px-6">
        <VStack gap={20}>
          <View className="w-full items-center">
            <Animated.Image
              source={require("../../../public/images/monhealth-foods.png")}
              style={{
                width: 320,
                height: 320,
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }}
            />
          </View>

          <VStack>
            <Animated.Text
              style={{
                opacity: textFadeAnim,
                transform: [{ translateY: textTranslateAnim }]
              }}
              className="text-center font-tbold text-3xl text-primary"
            >
              Hoàn thành bữa ăn
            </Animated.Text>

            <Animated.Text
              style={{
                opacity: textFadeAnim,
                transform: [{ translateY: textTranslateAnim }]
              }}
              className="text-center font-tmedium text-lg text-secondary"
            >
              Lựa chọn bữa ăn và khẩu phần phù hợp
            </Animated.Text>
          </VStack>
        </VStack>

        <VStack gap={16}>
          <VStack gap={8}>
            <Select
              defaultValue="Chọn bữa ăn"
              value="Bữa sáng"
              onPress={openSheet}
            />

            <HStack center gap={8}>
              <View style={{ flex: 1 }}>
                <TextInput
                  value={weight}
                  placeholder="1"
                  onChangeText={(text) => setWeight(text)}
                  keyboardType="numeric"
                  className="input"
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

        <VStack gap={12} className="absolute bottom-4 w-full">
          <Button variant="secondary" size="lg">
            Danh sách món ăn
          </Button>

          <Button size="lg">Thêm vào bữa ăn</Button>
        </VStack>
      </View>

      <Sheet ref={SheetRef}>
        <View>
          <Text>Đại, Khải sủi nói mai đi coi đồ án mà khum đi coi</Text>
        </View>
      </Sheet>
    </SafeAreaView>
  )
}

export default FoodCompletedScreen
