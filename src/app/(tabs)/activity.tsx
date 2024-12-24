import React from "react"

import { useRouter } from "expo-router"

import { Button, Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  const router = useRouter()

  const handleViewCreatePortion = () => {
    router.push("/foods/portions/create")
  }

  return (
    <Container className="flex-1 justify-between">
      <Header title="Tạo khẩu phần" />

      <Content>
        <Button size="lg" onPress={handleViewCreatePortion}>
          Halo
        </Button>
      </Content>
    </Container>
  )
}

export default ActivityScreen
