import React from "react"

import { Dimensions } from "react-native"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated"

import { GoalType } from "@/constants/goals"

import { CarouselItem } from "./CarouselItem"

const { width } = Dimensions.get("screen")

interface CarouselProps {
  items: GoalType[]
}

export const Carousel = ({ items }: CarouselProps) => {
  const scrollX = useSharedValue(0)

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x
    }
  })

  return (
    <Animated.FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={items}
      renderItem={({ item, index }) => (
        <CarouselItem index={index} item={item} scrollX={scrollX} />
      )}
      pagingEnabled
      snapToInterval={width}
      snapToAlignment="center"
      decelerationRate="fast"
      onScroll={onScrollHandler}
    />
  )
}
