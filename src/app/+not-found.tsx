import React, { useEffect, useRef } from "react"

import { Animated, View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, VStack } from "@/components/global/atoms"

function NotFoundScreen() {
  const router = useRouter()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const textFadeAnim = useRef(new Animated.Value(0)).current
  const textTranslateAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    fadeAnim.setValue(0)
    scaleAnim.setValue(0.5)
    textFadeAnim.setValue(0)
    textTranslateAnim.setValue(20)

    const timeout = setTimeout(() => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 300,
              useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true
            })
          ])
        ]),
        Animated.parallel([
          Animated.timing(textFadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(textTranslateAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        ])
      ]).start()
    }, 500)

    return () => clearTimeout(timeout)
  }, [fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim])

  return (
    <Container className="flex-1 justify-center pb-40">
      <VStack center gap={20}>
        <View className="w-full items-center">
          <Animated.Image
            source={require("../../public/images/no-data-image.png")}
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
