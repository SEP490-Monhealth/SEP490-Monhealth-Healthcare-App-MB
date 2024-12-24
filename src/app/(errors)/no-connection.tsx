import React, { useState } from "react"

import { Animated, View } from "react-native"

import { useRouter } from "expo-router"

import NetInfo from "@react-native-community/netinfo"

import { Button, Container, VStack } from "@/components/global/atoms"

import { useAnimation } from "@/hooks/useAnimation"

function NoConnectionScreen() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const handleRetry = () => {
    setIsLoading(true)
    NetInfo.fetch().then((state) => {
      setIsLoading(false)
      if (state.isConnected) {
        router.back()
      } else {
        console.log("No internet connection. Please try again.")
      }
    })
  }

  return (
    <Container className="flex-1 justify-center pb-40">
      <VStack center gap={20}>
        <View className="w-full items-center">
          <Animated.Image
            source={require("../../../public/images/no-connection-image.png")}
            style={{
              width: 320,
              height: 320,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }}
          />
        </View>

        <VStack>
          <Animated.Text
            style={{
              opacity: textFadeAnim,
              transform: [{ translateY: textTranslateAnim }]
            }}
            className="text-center font-tbold text-3xl text-primary"
          >
            Không có kết nối mạng
          </Animated.Text>

          <Animated.Text
            style={{
              opacity: textFadeAnim,
              transform: [{ translateY: textTranslateAnim }]
            }}
            className="text-center font-tmedium text-lg text-secondary"
          >
            Vui lòng kiểm tra kết nối internet của bạn và thử lại
          </Animated.Text>
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
