import React, { useEffect, useRef } from "react"

import { Animated, Text } from "react-native"

import { useRouter } from "expo-router"

import { Container, Content } from "@/components/global/atoms"

import { useAuth } from "@/contexts/AuthContext"

function AppIndex() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const textFadeAnim = useRef(new Animated.Value(0)).current
  const textTranslateAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
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
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
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
    const timeout = setTimeout(() => {
      if (!loading) {
        if (isAuthenticated) {
          router.replace("/(tabs)/home")
        } else {
          router.replace("/(onboarding)")
        }
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [loading, isAuthenticated, router])

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-45deg"]
  })

  return (
    <Container>
      <Content className="flex items-center justify-center gap-4 pb-28">
        <Animated.Image
          source={require("../../public/images/monhealth-splash-image.png")}
          style={{
            width: 80,
            height: 80,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { rotate }]
          }}
        />

        <Animated.Text
          style={{
            opacity: textFadeAnim,
            transform: [{ translateY: textTranslateAnim }]
          }}
          className="font-dbold text-5xl text-primary"
        >
          Mon<Text className="font-dbold text-yellow-500">Health</Text>
        </Animated.Text>
      </Content>
    </Container>
  )
}

export default AppIndex
