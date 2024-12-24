import React from "react"

import { useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  const router = useRouter()

  const handleViewCreatePortion = () => {
    router.push("/foods/portions/create")
  }

  const handleViewCreateFood = () => {
    router.push("/foods/createStep1")
  }



  return (
    <Container>
      <Header title="Tạo khẩu phần" />

      <Button size="lg" onPress={handleViewCreatePortion}>
        Khẩu phần ăn
      </Button>

      <Button className="mt-10" size="lg" onPress={handleViewCreateFood}>
        Tạo món ăn
      </Button>
    </Container>
  )
}

export default ActivityScreen
