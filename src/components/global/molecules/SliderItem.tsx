import React from "react"

import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated"

import { ImageSliderType } from "@/constants/sliderData"

import { HStack, VStack } from "../atoms"

type SliderProps = {
  item: ImageSliderType
  index: number
  scrollX: SharedValue<number>
}

const { width } = Dimensions.get("screen")

const SliderItem = ({ item, index, scrollX }: SliderProps) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.13, 0, width * 0.13],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })
  return (
    <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
      <View
        className={`relative flex items-center justify-center`}
        style={{ width }}
      >
        <View className="absolute left-16 top-10 z-10">
          <Text className="mb-4 font-tbold text-3xl text-primary">
            {item.title}
          </Text>
          <HStack className="mb-2" center>
            <Text className="font-tbold text-2xl text-muted-foreground">
              {item.carbs}
            </Text>
            <Text className="font-tbold text-sm text-muted-foreground">
              % Carbs
            </Text>
          </HStack>

          <HStack className="mb-2" center>
            <Text className="font-tbold text-2xl text-muted-foreground">
              {item.protein}
            </Text>
            <Text className="font-tbold text-sm text-muted-foreground">
              % Protein
            </Text>
          </HStack>

          <HStack center>
            <Text className="font-tbold text-2xl text-muted-foreground">
              {item.fat}
            </Text>
            <Text className="font-tbold text-sm text-muted-foreground">
              % Fat
            </Text>
          </HStack>
        </View>
        <Image
          source={item.image}
          className="h-64 w-[330px] rounded-3xl object-cover"
        />
      </View>
      <Text
        className="mt-20 text-center font-tmedium text-sm text-secondary"
        style={{ width: 290 }}
      >
        {item.description}
      </Text>
    </Animated.View>
  )
}

export default SliderItem

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: width
  }
})
