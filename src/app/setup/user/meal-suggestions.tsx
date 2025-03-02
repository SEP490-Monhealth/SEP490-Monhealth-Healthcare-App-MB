import React, { useEffect, useState } from "react"

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated"

import { useRouter } from "expo-router"

import { Container, Content } from "@/components/global/atoms"
import { ArcProgress } from "@/components/global/molecules"

import { useCreateUserFoods } from "@/hooks/useFood"
import { useCreateMetric } from "@/hooks/useMetric"

import { useSetupStore } from "@/stores/setupStore"

function SetupMealSuggestions() {
  const router = useRouter()

  const { newMetricData, newUserFoodsData } = useSetupStore()

  const { mutate: createMetric } = useCreateMetric()
  const { mutate: createUserFoods } = useCreateUserFoods()

  const [progress, setProgress] = useState(0)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  useEffect(() => {
    // const createMealSuggestions = async () => {
    //   try {
    //     await Promise.all([
    //       new Promise((resolve, reject) =>
    //         // @ts-ignore
    //         createMetric(newMetricData, {
    //           onSuccess: resolve,
    //           onError: reject
    //         })
    //       ),
    //       new Promise((resolve, reject) =>
    //         // @ts-ignore
    //         createUserFoods(newUserFoodsData, {
    //           onSuccess: resolve,
    //           onError: reject
    //         })
    //       )
    //     ])

    //     setIsComplete(true)
    //   } catch (error) {
    //     console.error("Đã có lỗi không mong muốn: ", error)
    //   }
    // }

    // createMealSuggestions()

    console.log(JSON.stringify(newMetricData, null, 2))
    console.log(JSON.stringify(newUserFoodsData, null, 2))

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        const randomIncrement = Math.floor(Math.random() * 11) + 5
        return Math.min(prev + randomIncrement, 100)
      })
    }, 150)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (isComplete && progress === 100) {
      setIsWaiting(true)

      scale.value = withSequence(
        withRepeat(withTiming(1.1, { duration: 300 }), 3, true),
        withTiming(1, { duration: 300 })
      )

      setTimeout(() => {
        runOnJS(router.replace)("/setup/summary")
      }, 2000)
    }
  }, [isComplete, progress, router])

  const getProgressLabel = () => {
    if (isWaiting) return "Hoàn tất!"
    if (progress === 100) return "Hoàn tất!"
    if (progress >= 80) return "Sắp xong rồi..."
    if (progress >= 50) return "Đang xử lý..."
    if (progress >= 20) return "Đang thu thập dữ liệu..."
    return "Bắt đầu quá trình..."
  }

  return (
    <Container>
      <Content className="mt-2">
        <Animated.View className="flex-1 justify-center" style={animatedStyle}>
          <ArcProgress
            size={280}
            width={16}
            fill={progress}
            centerCircle
            label={getProgressLabel()}
            value={progress}
          />
        </Animated.View>
      </Content>
    </Container>
  )
}

export default SetupMealSuggestions
