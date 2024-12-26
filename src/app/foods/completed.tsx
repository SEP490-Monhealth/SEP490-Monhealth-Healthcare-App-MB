import React, { useEffect, useRef, useState } from "react"

import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"

import {
  Button,
  HStack,
  Input,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"

import { useAnimation } from "@/hooks/useAnimation"

const FoodCompletedScreen = () => {
  const SheetRef = useRef<SheetRefProps>(null)

  const meals = ["Bữa sáng", "Bữa trưa", "Bữa tối", "Bữa phụ"]

  const [selectedMeal, setSelectedMeal] = useState("Bữa sáng")
  const [quantity, setQuantity] = useState("1")

  const openSheet = () => {
    SheetRef.current?.scrollTo(-300)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView className="bg-background">
          <View className="px-6">
            <VStack center gap={20} className="h-full w-full pt-12">
              <View className="items-center">
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

              <Animated.Text
                style={{
                  opacity: textFadeAnim,
                  transform: [{ translateY: textTranslateAnim }]
                }}
                className="text-center font-tmedium text-2xl text-primary"
              >
                Cơm gà Minh Thư
              </Animated.Text>
            </VStack>

            <VStack
              gap={40}
              className="absolute bottom-4 w-full bg-background pt-6"
            >
              <VStack gap={8}>
                <Select
                  defaultValue="Chọn bữa ăn"
                  value={selectedMeal}
                  onPress={openSheet}
                />

                <HStack center gap={8}>
                  <View style={{ flex: 1 }}>
                    <Input
                      value={quantity}
                      placeholder="1"
                      onChangeText={(text) => setQuantity(text)}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={{ flex: 4 }}>
                    <Input disabled value="chén (100 g)" />
                  </View>
                </HStack>
              </VStack>

              <VStack gap={12}>
                <Button variant="secondary" size="lg">
                  Halo
                </Button>

                <Button size="lg">Hello</Button>
              </VStack>
            </VStack>
          </View>

          <Sheet ref={SheetRef}>
            {meals.map((meal) => (
              <SheetItem
                key={meal}
                item={meal}
                isSelected={selectedMeal === meal}
                onSelect={(meal) => {
                  setSelectedMeal(meal)
                  closeSheet()
                }}
              />
            ))}
          </Sheet>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default FoodCompletedScreen
