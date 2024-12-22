import React, { useEffect, useState } from "react"

import { Text } from "react-native"
import { Image } from "react-native"
import { View } from "react-native"

import { useRouter } from "expo-router"

import NetInfo from "@react-native-community/netinfo"

import { Button, Container, VStack } from "@/components/global/atoms"

function NoConnectionScreen() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const handleRetry = () => {
    setIsLoading(true)
    NetInfo.fetch().then((state) => {
      setIsLoading(false)
      if (state.isConnected) {
        console.log("Có kết nối mạng, Thử lại")
        router.back()
      } else {
        console.log("Không có kết nối mạng. Vui lòng kiểm tra lại.")
      }
    })
  }
  return (
    <Container className="flex-1 justify-center pb-40">
      <VStack center gap={20}>
        <View className="w-full items-center">
          <Image
            source={require("../../../public/images/no-connection-image.png")}
            style={{
              width: 320,
              height: 320,
              resizeMode: "cover"
            }}
          />
        </View>

        <VStack>
          <Text className="text-center font-tbold text-3xl text-primary">
            Không có kết nối mạng
          </Text>

          <Text className="text-center font-tmedium text-lg text-secondary">
            Vui lòng kiểm tra kết nối internet của bạn và thử lại
          </Text>
        </VStack>
      </VStack>

      <Button
        loading={isLoading}
        size="lg"
        onPress={handleRetry}
        className="absolute bottom-4 left-6 right-6 w-full"
      >
        {isLoading ? "Đang kiểm tra..." : "Thử lại"}
      </Button>
    </Container>
  )
}

export default NoConnectionScreen
