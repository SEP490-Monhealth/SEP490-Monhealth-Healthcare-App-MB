import React, { useState } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import NetInfo from "@react-native-community/netinfo"

import { Button, Container } from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"

function NoConnectionScreen() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const handleRetry = () => {
    setIsLoading(true)
    NetInfo.fetch().then((state) => {
      setIsLoading(false)
      if (state.isConnected) {
        router.back()
      } else {
        console.log(
          "Không có kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn và thử lại"
        )
      }
    })
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <ErrorDisplay
          imageSource={require("../../../public/images/monhealth-no-connection-image.png")}
          title="Mất kết nối"
          description="Không có kết nối internet. Vui lòng kiểm tra mạng của bạn!"
        />
      </View>

      <Button
        loading={isLoading}
        size="lg"
        onPress={handleRetry}
        className="mb-4"
      >
        {isLoading ? "Đang kiểm tra..." : "Thử lại"}
      </Button>
    </Container>
  )
}

export default NoConnectionScreen
