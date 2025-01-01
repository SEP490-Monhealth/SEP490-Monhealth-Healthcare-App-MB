import React from "react"

import { Animated, View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, HStack, VStack } from "@/components/global/atoms"

import { useAnimation } from "@/hooks/useAnimation"

function SetupCompleted() {
  const router = useRouter()

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const handleDone = () => {
    router.replace("/(tabs)/home")
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <VStack center gap={32}>
          <Animated.Image
            source={require("../../../public/images/monhealth-congratulations.png")}
            style={{
              width: 320,
              height: 320,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }}
          />

          <VStack gap={12}>
            <Animated.Text
              className="text-center font-tbold text-2xl text-primary"
              style={{
                opacity: textFadeAnim,
                transform: [{ translateY: textTranslateAnim }]
              }}
            >
              Chúc mừng bạn đã hoàn thành bước đầu tiên
            </Animated.Text>

            <Animated.Text
              className="text-center font-tmedium text-base text-accent"
              style={{
                opacity: textFadeAnim,
                transform: [{ translateY: textTranslateAnim }]
              }}
            >
              Các chỉ số sẽ giúp đề xuất chế độ dinh dưỡng, hoạt động thể chất,
              và các mục tiêu phù hợp
            </Animated.Text>
          </VStack>
        </VStack>
      </View>

      <HStack gap={12} className="mb-4">
        <Button variant="secondary" className="flex-1">
          Chia sẻ
        </Button>
        <Button onPress={handleDone} className="flex-1">
          Trang chủ
        </Button>
      </HStack>
    </Container>
  )
}

export default SetupCompleted
