import React, { useCallback, useImperativeHandle } from "react"

import { Dimensions, Pressable, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

interface BottomSheetProps {
  children?: React.ReactNode
}

export interface BottomSheetRefProps {
  scrollTo: (destination: number) => void
  isActive: () => boolean
}

export const BottomSheet = React.forwardRef<
  BottomSheetRefProps,
  BottomSheetProps
>(({ children }, ref) => {
  const translateY = useSharedValue(0)
  const active = useSharedValue(false)

  const scrollTo = useCallback((destination: number) => {
    "worklet"
    active.value = destination !== 0
    translateY.value = withSpring(destination, { damping: 50 })
  }, [])

  const isActive = useCallback(() => {
    return active.value
  }, [])

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive])

  const context = useSharedValue({ y: 0 })

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = Math.max(
        event.translationY + context.value.y,
        MAX_TRANSLATE_Y
      )
    })
    .onEnd((event) => {
      const closeToMax = Math.abs(translateY.value - MAX_TRANSLATE_Y) < 100
      const closeToMid = Math.abs(translateY.value + 300) < 100

      if (closeToMax && event.translationY > 0) {
        scrollTo(-300)
      } else if (closeToMid && event.translationY > 0) {
        scrollTo(0)
      } else if (event.translationY < 0) {
        scrollTo(MAX_TRANSLATE_Y)
      } else {
        scrollTo(0)
      }
    })

  const rOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_TRANSLATE_Y],
      [0, 0.5],
      "clamp"
    )

    return {
      opacity,
      zIndex: translateY.value < 0 ? 1 : -1
    }
  })

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 70, MAX_TRANSLATE_Y],
      [25, 5],
      "clamp"
    )

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }]
    }
  })

  const handleOverlayPress = () => {
    runOnJS(scrollTo)(0)
  }

  return (
    <>
      <Animated.View
        style={[rOverlayStyle]}
        className="absolute h-full w-full bg-black"
      >
        <Pressable style={{ flex: 1 }} onPress={handleOverlayPress} />
      </Animated.View>

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: SCREEN_HEIGHT,
              width: "100%",
              position: "absolute",
              top: SCREEN_HEIGHT
            },
            rBottomSheetStyle
          ]}
          className="absolute top-full z-20 w-full bg-background"
        >
          <View className="my-4 h-2 w-20 self-center rounded-full bg-border" />
          <View className="px-6 py-4">{children}</View>
        </Animated.View>
      </GestureDetector>
    </>
  )
})
