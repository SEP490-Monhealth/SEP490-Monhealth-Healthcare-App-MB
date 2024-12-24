import React from "react"

import { useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  const router = useRouter()

  const handleViewCreatePortion = () => {
    router.push("/foods/portions/create")
  }

  return (
    <Container>
      <Header title="Tạo khẩu phần" />

      <Button size="lg" onPress={handleViewCreatePortion}>
        Halo
      </Button>
    </Container>
  )
}

export default ActivityScreen
