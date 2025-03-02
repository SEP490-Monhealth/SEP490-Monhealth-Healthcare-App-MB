import React, { useEffect } from "react"

import { Image, Text, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { CounterText } from "@/components/global/molecules"

import { useAuth } from "@/contexts/AuthContext"

import { useGetNutritionGoal } from "@/hooks/useGoal"

import { toFixed } from "@/utils/formatters"

import { LoadingScreen } from "../loading"

function SetupSummary() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { data: goalData, isLoading } = useGetNutritionGoal(userId)

  const caloriesGoal = goalData?.caloriesGoal

  // const { dateOfBirth, gender, height, weight, goalType, activityLevel } =
  //   useSetupStore()

  // const [caloriesGoal, setCaloriesGoal] = useState(0)
  // const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fireScale.value = withRepeat(withTiming(1.1, { duration: 700 }), -1, true)
  }, [])

  const fireScale = useSharedValue(1)

  const fireStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fireScale.value }]
  }))

  // useEffect(() => {
  //   const age = calculateAge(dateOfBirth)

  //   // console.log(age)

  //   const calculatedBMR = calculateBMR(
  //     weight,
  //     height,
  //     age,
  //     gender as "Male" | "Female"
  //   )
  //   const calculatedTDEE = calculateTDEE(calculatedBMR, activityLevel)

  //   // console.log(calculatedTDEE)

  //   if (goalType === "WeightLoss") {
  //     setCaloriesGoal(calculatedTDEE * 0.8)
  //   } else if (goalType === "WeightGain") {
  //     setCaloriesGoal(calculatedTDEE * 1.1)
  //   } else {
  //     setCaloriesGoal(calculatedTDEE)
  //   }
  // }, [dateOfBirth, gender, height, weight, goalType, activityLevel])

  // const handleSave = () => setIsEditing(false)

  const handleFinished = () => router.replace("/setup/completed")

  if (!goalData || isLoading) return <LoadingScreen />

  return (
    <Container dismissKeyboard>
      <Content className="mt-2">
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
              <View className="flex-row items-end gap-2">
                <Text className="font-tbold text-6xl text-primary">
                  <CounterText value={toFixed(caloriesGoal ?? 0, 0)} />
                </Text>
                <Text className="mb-3 font-tmedium text-xl text-accent">
                  kcal
                </Text>
              </View>

              {/* {isEditing ? (
              <TextInput
                maxLength={4}
                value={String(toFixed(caloriesGoal, 0))}
                placeholder="0"
                onChangeText={(text) => setCaloriesGoal(Number(text) || 0)}
                keyboardType="numeric"
                className="h-16 w-48 border-b border-border text-center font-tbold text-5xl text-primary"
              />
            ) : (
               <HStack center gap={12}>
                 <View className="flex-row items-end gap-2">
                   <Text className="font-tbold text-6xl text-primary">
                     {toFixed(tdee ?? 0, 0)}
                   </Text>
                   <Text className="mb-3 font-tmedium text-xl text-accent">
                     kcal
                   </Text>
                 </View>

                 <Edit2
                   variant="Bold"
                   size={24}
                   color="#EF4444"
                   onPress={() => setIsEditing(true)}
                 />
               </HStack>

              <View className="flex-row items-end gap-2">
                <Text className="font-tbold text-6xl text-primary">
                  <CounterText value={toFixed(caloriesGoal ?? 0, 0)} />
                </Text>
                <Text className="mb-3 font-tmedium text-xl text-accent">
                  kcal
                </Text>
              </View>
            )} */}
            </VStack>
          </VStack>
        </View>

        {/* <Button
        size="lg"
        onPress={isEditing ? handleSave : handleFinished}
        className="mb-4"
      >
        {isEditing ? "Cập nhật" : "Tiếp tục"}
      </Button> */}

        <Button size="lg" onPress={handleFinished} className="mb-4">
          Tiếp tục
        </Button>
      </Content>
    </Container>
  )
}

export default SetupSummary
