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

  return (
    <Container>
      <Header title="Tạo khẩu phần" />

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
      </Content>
    </Container>
  )
}

export default ActivityScreen
