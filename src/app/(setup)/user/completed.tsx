import React from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container } from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"

function SetupCompleted() {
  const router = useRouter()

  const handleDone = () => router.replace("/(tabs)/user/home")

  return (
    <Container>
      <View className="flex-1 justify-center">
        <ErrorDisplay
          imageSource={require("../../../../public/images/monhealth-congratulations.png")}
          title="Cài đặt hoàn tất"
          description="Bạn đã sẵn sàng để sử dụng ứng dụng!"
        />
      </View>

      <Button size="lg" onPress={handleDone} className="mb-4">
        Hoàn thành
      </Button>
    </Container>
  )
}

export default SetupCompleted
