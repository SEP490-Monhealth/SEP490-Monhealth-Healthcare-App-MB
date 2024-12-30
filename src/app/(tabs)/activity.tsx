import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  const router = useRouter()

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

  const handleViewDoBSetup = () => {
    router.push("/(setup)/date-of-birth")
  }

  const handleViewHeightWeightSetup = () => {
    router.push("/(setup)/height-weight")
  }

  const handleViewFoodSaved = () => {
    router.push("/foods/saved")
  }

  const handleViewIntroSetup = () => {
    router.push("/(setup)/intro")
  }

  return (
    <Container>
      <Header label="Tạo khẩu phần" />

      <Content>
        <VStack gap={20}>
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

          <Button size="lg" onPress={handleViewDoBSetup}>
            Chọn ngày sinh
          </Button>

          <Button size="lg" onPress={handleViewHeightWeightSetup}>
            Nhập chiều cao, cân nặng
          </Button>

          <Button size="lg" onPress={handleViewFoodSaved}>
            Danh sách món ăn đã lưu
          </Button>

          <Button size="lg" onPress={handleViewIntroSetup}>
            Trang setup
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}
export default ActivityScreen
