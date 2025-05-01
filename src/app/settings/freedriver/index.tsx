import React, { useEffect, useRef } from "react"

import { Animated, Dimensions, Image, Text, View } from "react-native"

const screenWidth = Dimensions.get("window").width

function AppAboutScreen() {
  const carImage = require("../../../../public/images/freedriver-car-image.png")
  const ownerImage = require("../../../../public/images/freedriver-car-owner-image.png")

  const car1Position = useRef(new Animated.Value(-600)).current
  const car1Opacity = useRef(new Animated.Value(1)).current
  const car2Opacity = useRef(new Animated.Value(0)).current
  const car2Position = useRef(new Animated.Value(-180)).current
  const textOpacity = useRef(new Animated.Value(0)).current
  const cardPosition = useRef(new Animated.Value(300)).current

  useEffect(() => {
    const car1Enter = Animated.timing(car1Position, {
      toValue: screenWidth / 2 - 148,
      duration: 1100,
      useNativeDriver: true
    })

    const car1Delay = Animated.delay(500)

    const car1Exit = Animated.parallel([
      Animated.timing(car1Position, {
        toValue: screenWidth + 300,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(car1Opacity, {
        toValue: 0.7,
        duration: 800,
        useNativeDriver: true
      })
    ])

    const car2FadeInDelay = Animated.delay(400)
    const car2FadeIn = Animated.timing(car2Opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    })

    const car2MoveDelay = Animated.delay(500)
    const car2Move = Animated.timing(car2Position, {
      toValue: -240,
      duration: 500,
      useNativeDriver: true
    })

    const textFadeDelay = Animated.delay(200)
    const textFadeIn = Animated.timing(textOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    })

    const cardFadeDelay = Animated.delay(500)
    const cardMove = Animated.timing(cardPosition, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true
    })

    Animated.sequence([
      car1Enter,
      car1Delay,
      car1Exit,
      car2FadeInDelay,
      car2FadeIn,
      car2MoveDelay,
      car2Move,
      textFadeDelay,
      textFadeIn,
      cardFadeDelay,
      cardMove
    ]).start()
  }, [
    car1Position,
    car1Opacity,
    car2Opacity,
    car2Position,
    textOpacity,
    cardPosition,
    screenWidth
  ])

  return (
    <View className="flex-1">
      <Animated.View
        style={{
          position: "absolute",
          transform: [{ translateX: car1Position }],
          opacity: car1Opacity,
          top: 200
        }}
      >
        <Image source={carImage} className="w-80" resizeMode="contain" />
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          opacity: car2Opacity,
          alignSelf: "center",
          transform: [{ translateY: car2Position }],
          top: 240
        }}
      >
        <Image
          source={ownerImage}
          style={{ width: 320 }}
          resizeMode="contain"
          className="w-80"
        />
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          opacity: textOpacity,
          alignSelf: "center",
          top: 440
        }}
      >
        <Text className="font-tbold text-4xl tracking-widest">
          FREE<Text className="text-blue-500">DRIVER</Text>
        </Text>
      </Animated.View>
    </View>
  )
}

export default AppAboutScreen
