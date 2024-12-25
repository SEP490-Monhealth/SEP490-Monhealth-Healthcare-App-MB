import React, { useEffect, useRef, useState } from "react"

import { Dimensions } from "react-native"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated"

import { CarouselItemWeight } from "./CarouselItemWeight"

const { width } = Dimensions.get("screen")
const itemWidth = width

interface WeightProp {
  defaultWeight: number
}

export const CarouselWeight = ({ defaultWeight }: WeightProp) => {
  const items = Array.from({ length: 80 }, (_, i) => defaultWeight - 40 + i)
  const scrollX = useSharedValue(0)
  const flatListRef = useRef<Animated.FlatList<number>>(null)
  const [isContentReady, setIsContentReady] = useState(false)

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x
    }
  })

  useEffect(() => {
    const initialIndex = items.findIndex((item) => item === defaultWeight)
    if (isContentReady && initialIndex !== -1) {
      flatListRef.current?.scrollToOffset({
        offset: initialIndex * itemWidth,
        animated: false
      })
    }
  }, [defaultWeight, items, isContentReady])

  const handleContentReady = () => {
    setIsContentReady(true)
  }

  return (
    <Animated.FlatList
      ref={flatListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={items}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item, index }) => (
        <CarouselItemWeight index={index} item={item} scrollX={scrollX} />
      )}
      snapToInterval={itemWidth}
      snapToAlignment="center"
      decelerationRate="normal"
      onScroll={onScrollHandler}
      onContentSizeChange={handleContentReady}
      onLayout={handleContentReady}
      initialNumToRender={9}
      maxToRenderPerBatch={9}
      windowSize={8}
      getItemLayout={(_, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index
      })}
    />
  )
}
