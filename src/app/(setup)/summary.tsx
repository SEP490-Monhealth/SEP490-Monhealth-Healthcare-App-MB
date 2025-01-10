import React, { useEffect, useState } from "react"

import { Image, Text, TextInput, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated"

import { useRouter } from "expo-router"

import { Button, Container, VStack } from "@/components/global/atoms"

import { useSetupStore } from "@/stores/setupStore"

import { calculateBMR, calculateTDEE } from "@/utils/calculations"
import { toFixed } from "@/utils/formatters"

function SetupSummary() {
  const router = useRouter()

  const { dateOfBirth, gender, height, weight, activityLevel } = useSetupStore()

  const [tdee, setTDEE] = useState<number | null>(null)

  useEffect(() => {
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear()

    const calculatedBMR = calculateBMR(
      weight,
      height,
      age,
      gender as "Male" | "Female"
    )
    const calculatedTDEE = calculateTDEE(calculatedBMR, activityLevel)

    setTDEE(calculatedTDEE)
  }, [dateOfBirth, gender, height, weight, activityLevel])

  const [isEditing, setIsEditing] = useState(false)

  const fireScale = useSharedValue(1)

  useEffect(() => {
    fireScale.value = withRepeat(withTiming(1.1, { duration: 700 }), -1, true)
  }, [])

  const fireStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fireScale.value }]
  }))

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleFinished = () => {
    console.log(tdee)

    router.push("/(setup)/completed")
  }

  return (
    <Container dismissKeyboard>
      <View className="flex-1 justify-center">
        <VStack center gap={32}>
          <Animated.View style={[fireStyle]}>
            <Image
              source={require("../../../public/images/monhealth-fire-image.png")}
              style={{
                width: 240,
                height: 240
              }}
            />
          </Animated.View>

          <VStack center>
            {isEditing ? (
              <TextInput
                maxLength={4}
                value={String(tdee)}
                placeholder="0"
                onChangeText={(text) => setTDEE(Number(text) || 0)}
                keyboardType="numeric"
                className="h-16 w-48 border-b border-border text-center font-tbold text-5xl text-primary"
              />
            ) : (
              // <HStack center gap={12}>
              //   <View className="flex-row items-end gap-2">
              //     <Text className="font-tbold text-6xl text-primary">
              //       {toFixed(tdee ?? 0, 0)}
              //     </Text>
              //     <Text className="mb-3 font-tmedium text-xl text-accent">
              //       kcal
              //     </Text>
              //   </View>

              //   <Edit2
              //     variant="Bold"
              //     size={24}
              //     color="#EF4444"
              //     onPress={() => setIsEditing(true)}
              //   />
              // </HStack>

              <View className="flex-row items-end gap-2">
                <Text className="font-tbold text-6xl text-primary">
                  {toFixed(tdee ?? 0, 0)}
                </Text>
                <Text className="mb-3 font-tmedium text-xl text-accent">
                  kcal
                </Text>
              </View>
            )}
          </VStack>
        </VStack>
      </View>

      <Button
        size="lg"
        onPress={isEditing ? handleSave : handleFinished}
        className="mb-4"
      >
        {isEditing ? "Cập nhật" : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default SetupSummary
