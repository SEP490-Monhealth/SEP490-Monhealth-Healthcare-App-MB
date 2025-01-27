import React from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"

function SetupCompleted() {
  const router = useRouter()

  const handleDone = () => {
    router.replace("/tabs/home")
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <ErrorDisplay
          imageSource={require("../../../public/images/monhealth-congratulations.png")}
          title="Chúc mừng bạn đã hoàn thành bước đầu tiên"
          description="Các chỉ số sẽ giúp đề xuất chế độ dinh dưỡng, hoạt động thể chất, và các mục tiêu phù hợp"
        />
      </View>

      <Button size="lg" onPress={handleDone} className="mb-4">
        Hoàn thành
      </Button>
    </Container>
  )
}

export default SetupCompleted
