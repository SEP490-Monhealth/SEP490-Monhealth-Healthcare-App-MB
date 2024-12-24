import React from "react"

import { Animated, View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, VStack } from "@/components/global/atoms"

import { useAnimation } from "../hooks/useAnimation"

function NotFoundScreen() {
  const router = useRouter()

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  return (
    <Container className="flex-1 justify-center pb-40">
      <VStack center gap={20}>
        <View className="w-full items-center">
          <Animated.Image
            source={require("../../public/images/not-found-image.png")}
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
            Không tìm thấy trang
          </Animated.Text>

          <Animated.Text
            style={{
              opacity: textFadeAnim,
              transform: [{ translateY: textTranslateAnim }]
            }}
            className="text-center font-tmedium text-lg text-secondary"
          >
            Trang bạn vừa truy cập không tồn tại hoặc đã bị xóa
          </Animated.Text>
        </VStack>
      </VStack>

      <Button
        size="lg"
        onPress={() => router.back()}
        className="absolute bottom-4 left-6 right-6 w-full"
      >
        Quay lại
      </Button>
    </Container>
  )
}

export default NotFoundScreen
