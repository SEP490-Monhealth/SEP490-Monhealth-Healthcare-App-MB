import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  const router = useRouter()

  const handleViewCreatePortion = () => {
    router.push("/foods/portions/create")
  }

  const handleViewDoB = () => {
    router.push("/(setup)/date-of-birth")
  }

  const handleViewFrequency = () => {
    router.push("/(setup)/activity-level")
  }
  const handleViewCreateFood = () => {
    router.push("/foods/createStep1")
  }
  const handleViewTargetSetup = () => {
    router.push("/(setup)/target-setup")
  }
  const handleViewWeightSetup = () => {
    router.push("/(setup)/weight-setup")
  }

  return (
    <Container>
      <Header label="Tạo khẩu phần" />

      <Content>
        <VStack gap={20}>
          <Button size="lg" onPress={handleViewCreatePortion}>
            Tạo portion
          </Button>

          <Button size="lg" onPress={handleViewDoB}>
            Chọn ngày sinh
          </Button>

          <Button size="lg" onPress={handleViewFrequency}>
            Chọn tần xuất
          </Button>

          <Button size="lg" onPress={handleViewCreateFood}>
            Tạo món ăn
          </Button>

          <Button size="lg" onPress={handleViewTargetSetup}>
            Chọn mục tiêu
          </Button>

          <Button size="lg" onPress={handleViewWeightSetup}>
            Chọn cân nặng
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default ActivityScreen
