import React, { useEffect, useState } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { Container, Content, VStack } from "@/components/global/atoms"
import { ArcProgress, StepHeader } from "@/components/global/molecules"

import { useCreateUserFoods } from "@/hooks/useFood"
import { useCreateMetric } from "@/hooks/useMetric"

import { useSetupStore } from "@/stores/setupStore"

function SetupMealSuggestions() {
  const router = useRouter()

  const { mutate: createMetric } = useCreateMetric()
  const { mutate: createUserFoods } = useCreateUserFoods()

  const { newMetricData, newUserFoodsData } = useSetupStore()

  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const createMealSuggestions = async () => {
      try {
        await Promise.all([
          new Promise((resolve, reject) =>
            createMetric(newMetricData, {
              onSuccess: resolve,
              onError: reject
            })
          ),
          new Promise((resolve, reject) =>
            createUserFoods(newUserFoodsData, {
              onSuccess: resolve,
              onError: reject
            })
          )
        ])

        setIsComplete(true)
      } catch (error) {
        console.error("Đã có lỗi không mong muốn: ", error)
      }
    }

    createMealSuggestions()

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 20
      })
    }, 300)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (isComplete && progress === 100) {
      router.replace("/setup/summary")
    }
  }, [isComplete, progress])

  return (
    <Container>
      <Content className="mt-2">
        <VStack gap={80}>
          <StepHeader
            title="Tạo kế hoạch bữa ăn"
            description="Hệ thống đang xử lý thông tin của bạn"
          />

          <View className="justify-center">
            <ArcProgress
              size={280}
              width={16}
              fill={progress}
              centerCircle
              label={
                progress === 100
                  ? "Hoàn tất!"
                  : progress < 50
                    ? "Đang thu thập dữ liệu..."
                    : "Đang xử lý..."
              }
              value={progress}
            />
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default SetupMealSuggestions
