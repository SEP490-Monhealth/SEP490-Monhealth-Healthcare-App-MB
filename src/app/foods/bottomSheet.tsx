import React, { useCallback, useImperativeHandle } from "react"

import { Dimensions, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

type BottomSheetProps = {
  children?: React.ReactNode
}

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void
  isActive: () => boolean
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
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
          event.translationY + context.value.y,
          MAX_TRANSLATE_Y
        )
      })
      .onEnd((event) => {
        if (event.velocityY > 1000 || translateY.value > -SCREEN_HEIGHT / 5) {
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

    return (
      <>
        <Animated.View
          style={[rOverlayStyle]}
          className="absolute h-full w-full bg-black"
        />

        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                height: SCREEN_HEIGHT,
                width: "100%",
                backgroundColor: "white",
                position: "absolute",
                top: SCREEN_HEIGHT,
                borderRadius: 25
              },
              rBottomSheetStyle
            ]}
            className="absolute top-full z-20 h-full w-full rounded-t-3xl bg-white"
          >
            <View className="my-4 h-1 w-20 self-center rounded bg-gray-400" />
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    )
  }
)

export default BottomSheet
