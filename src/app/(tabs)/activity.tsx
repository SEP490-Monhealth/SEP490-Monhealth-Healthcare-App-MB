import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  const router = useRouter()

  const handleViewCreatePortion = () => {
    router.push("/foods/portions/create")
  }

  const handleViewFrequency = () => {
    router.push("/(setup)/activity-level")
  }

  const handleViewTargetSetup = () => {
    router.push("/(setup)/target")
  }

  const handleViewSexSetup = () => {
    router.push("/(setup)/gender")
  }

  const handleViewWeightSetup = () => {
    router.push("/(setup)/weight")
  }

  const handleViewFoodCompleted = () => {
    router.push("/foods/completed")
    
  const handleViewDoBSetup = () => {
    router.push("/(setup)/date-of-birth")
  }

  const handleViewHeightWeightSetup = () => {
    router.push("/(setup)/height-weight")
  }

  const handleViewSettingTab = () => {
    router.push("/(setup)/setting")
  }

  return (
    <Container>
      <Header label="Tạo khẩu phần" />

      <Content>
        <VStack gap={20}>
          <Button size="lg" onPress={handleViewCreatePortion}>
            Tạo portion
          </Button>

          <Button size="lg" onPress={handleViewFrequency}>
            Chọn tần xuất
          </Button>

          <Button size="lg" onPress={handleViewTargetSetup}>
            Chọn mục tiêu
          </Button>

          <Button size="lg" onPress={handleViewSexSetup}>
            Chọn giới tính
          </Button>

          <Button size="lg" onPress={handleViewWeightSetup}>
            Chọn cân nặng
          </Button>

          <Button size="lg" onPress={handleViewFoodCompleted}>
            Chọn Food
          </Button>

          <Button size="lg" onPress={handleViewDoBSetup}>
            Chọn ngày sinh
          </Button>

          <Button size="lg" onPress={handleViewHeightWeightSetup}>
            Nhập chiều cao, cân nặng
          </Button>

          <Button size="lg" onPress={handleViewSettingTab}>
            Cài đặt
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default ActivityScreen
