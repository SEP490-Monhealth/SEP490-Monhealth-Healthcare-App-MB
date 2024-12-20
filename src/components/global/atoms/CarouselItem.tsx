import React from "react"

import { Dimensions, Image, Text, View } from "react-native"
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated"

import { GoalType } from "@/constants/goals"

import { HStack, VStack } from "./Stack"

interface CarouselItemProps {
  item: GoalType
  index: number
  scrollX: SharedValue<number>
}

const { width } = Dimensions.get("screen")

export const CarouselItem = ({ item, index, scrollX }: CarouselItemProps) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.97, 1, 0.97],
      Extrapolation.CLAMP
    )

    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width * 0.09, 0, width * 0.09],
      Extrapolation.CLAMP
    )

    return {
      transform: [{ translateX }, { scale }]
    }
  })

  return (
    <Animated.View
      className="items-center justify-center"
      style={[{ width: width }, rnAnimatedStyle]}
    >
      <View
        className={`relative flex items-center justify-center`}
        style={{ width }}
      >
        <View className="h-64 w-full rounded-2xl bg-secondary px-6" />

        {/* <Image
          source={item.image}
          className="h-64 w-full rounded-2xl object-cover px-6"
        /> */}

        <View className="absolute left-6 top-10 z-10">
          <Text className="mb-4 font-tbold text-3xl text-primary">
            {item.title}
          </Text>

          <VStack gap={8}>
            <HStack>
              <Text className="font-tbold text-3xl text-primary">
                {item.carbs}
              </Text>
              <Text className="font-tbold text-base text-primary">% Carbs</Text>
            </HStack>

            <HStack>
              <Text className="font-tbold text-3xl text-primary">
                {item.protein}
              </Text>
              <Text className="font-tbold text-base text-primary">
                % Protein
              </Text>
            </HStack>

            <HStack>
              <Text className="font-tbold text-3xl text-primary">
                {item.fat}
              </Text>
              <Text className="font-tbold text-base text-primary">% Fat</Text>
            </HStack>
          </VStack>
        </View>
      </View>
    </Animated.View>
  )
}
