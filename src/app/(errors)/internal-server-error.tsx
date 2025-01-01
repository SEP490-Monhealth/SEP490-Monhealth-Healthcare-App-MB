import React from "react"

import { Animated, View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, VStack } from "@/components/global/atoms"

import { useAnimation } from "@/hooks/useAnimation"

function InternalServerErrorScreen() {
  const router = useRouter()

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const handleBack = () => router.back()

  return (
    <Container>
      <View className="flex-1 justify-center">
        <VStack center gap={32}>
          <Animated.Image
            source={require("../../../public/images/monhealth-internal-server-error-image.png")}
            style={{
              width: 320,
              height: 320,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }}
          />

          <VStack>
            <Animated.Text
              className="text-center font-tbold text-3xl text-primary"
              style={{
                opacity: textFadeAnim,
                transform: [{ translateY: textTranslateAnim }]
              }}
            >
              Có lỗi từ hệ thống
            </Animated.Text>

            <Animated.Text
              className="text-center font-tmedium text-lg text-accent"
              style={{
                opacity: textFadeAnim,
                transform: [{ translateY: textTranslateAnim }]
              }}
            >
              Đã xảy ra lỗi, chúng tôi đang cố gắng khắc phục. Vui lòng thử lại
              sau
            </Animated.Text>
          </VStack>
        </VStack>
      </View>

      <Button size="lg" onPress={handleBack} className="mb-4">
        Quay lại
      </Button>
    </Container>
  )
}

export default InternalServerErrorScreen
