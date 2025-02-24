import React, { forwardRef, useCallback, useImperativeHandle } from "react"

import { Dimensions, Pressable, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

interface SheetProps {
  children?: React.ReactNode
  dynamicHeight?: number
}

export interface SheetRefProps {
  scrollTo: (destination: number) => void
  isActive: () => boolean
}

export const Sheet = forwardRef<SheetRefProps, SheetProps>(
  ({ children, dynamicHeight }, ref) => {
    const translateY = useSharedValue(0)
    const active = useSharedValue(false)

    const MAX_TRANSLATE_Y = -(dynamicHeight ?? SCREEN_HEIGHT * 0.5)

    const scrollTo = useCallback((destination: number) => {
      "worklet"
      active.value = destination !== 0
      translateY.value = withSpring(destination, {
        damping: 50,
        stiffness: 200,
        mass: 0.5
      })
    }, [])

    const isActive = useCallback(() => {
      return active.value
    }, [])

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive
    ])

    const context = useSharedValue({ y: 0 })

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value }
      })
      .onUpdate((event) => {
        translateY.value = Math.max(
          Math.min(event.translationY + context.value.y, 0),
          MAX_TRANSLATE_Y
        )
      })
      .onEnd((event) => {
        if (event.translationY > 0) {
          scrollTo(0)
        } else {
          scrollTo(MAX_TRANSLATE_Y)
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

    const rSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 70, MAX_TRANSLATE_Y],
        [0, 25],
        "clamp"
      )

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }]
      }
    })

    const handleOverlayPress = useCallback(() => {
      "worklet"
      scrollTo(0)
    }, [scrollTo])

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
              rSheetStyle
            ]}
            className="absolute top-full z-20 w-full bg-background"
          >
            <View className="my-4 h-2 w-20 self-center rounded-full bg-border" />
            <View className="p-4">{children}</View>
          </Animated.View>
        </GestureDetector>
      </>
    )
  }
)
