import React from "react"

import { Dimensions } from "react-native"
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated"

interface CarouselItemProps {
  item: number
  index: number
  scrollX: SharedValue<number>
}

const { width } = Dimensions.get("screen")

export const CarouselItemWeight = ({
  item,
  index,
  scrollX
}: CarouselItemProps) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.6, 1, 0.6],
      Extrapolation.CLAMP
    )

    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width * 0.7, 0, width * 0.7],
      Extrapolation.CLAMP
    )

    return {
      transform: [{ translateX }, { scale }]
    }
  })

  const isActive = useAnimatedStyle(() => {
    const active =
      scrollX.value >= index * width - width / 2 &&
      scrollX.value < (index + 1) * width - width / 2

    return {
      backgroundColor: active ? "#F1F5F9" : "#F8FAFC"
    }
  })

  const textColorStyle = useAnimatedStyle(() => {
    const active =
      scrollX.value >= index * width - width / 2 &&
      scrollX.value < (index + 1) * width - width / 2

    return {
      color: active ? "#334155" : "#334155"
    }
  })

  const borderStyle = useAnimatedStyle(() => {
    const active =
      scrollX.value >= index * width - width / 2 &&
      scrollX.value < (index + 1) * width - width / 2

    return {
      borderWidth: active ? 2 : 0,
      borderColor: active ? "#E2E8F0" : ""
    }
  })

  return (
    <Animated.View
      className="flex items-center justify-center"
      style={[{ width: width }, rnAnimatedStyle]}
    >
      <Animated.View
        className="flex items-center justify-center rounded-2xl px-6 py-6"
        style={[isActive, borderStyle]}
      >
        <Animated.Text className="font-tbold text-3xl" style={textColorStyle}>
          {item} kg
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  )
}
