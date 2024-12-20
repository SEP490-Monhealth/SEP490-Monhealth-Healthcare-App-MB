import React from "react"

import { Dimensions } from "react-native"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated"

import { ImageSlider, ImageSliderType } from "@/constants/sliderData"

import SliderItem from "./SliderItem"

const { width } = Dimensions.get("screen")

type Props = {
  itemList: ImageSliderType[]
}

const CardSlider = ({ itemList }: Props) => {
  const scrollX = useSharedValue(0)

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x
    }
  })

  return (
    <Animated.FlatList
      data={itemList}
      renderItem={({ item, index }) => (
        <SliderItem item={item} index={index} scrollX={scrollX} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={width}
      snapToAlignment="center"
      decelerationRate="fast"
      onScroll={onScrollHandler}
    />
  )
}

export default CardSlider
