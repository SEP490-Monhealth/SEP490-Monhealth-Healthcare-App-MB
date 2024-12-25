import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content } from "@/components/global/atoms"
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

  return (
    <Container>
      <Header label="Tạo khẩu phần" />

      <Content>
        <Button size="lg" onPress={handleViewCreatePortion}>
          Tạo portion
        </Button>

        <Button size="lg" onPress={handleViewDoB} className="mt-20">
          Chọn ngày sinh
        </Button>

        <Button size="lg" onPress={handleViewFrequency} className="mt-20">
          Chọn tần xuất
        </Button>

        <Button size="lg" onPress={handleViewCreatePortion}>
          Khẩu phần ăn
        </Button>

        <Button className="mt-10" size="lg" onPress={handleViewCreateFood}>
          Tạo món ăn
        </Button>
      </Content>
    </Container>
  )
}

export default ActivityScreen
