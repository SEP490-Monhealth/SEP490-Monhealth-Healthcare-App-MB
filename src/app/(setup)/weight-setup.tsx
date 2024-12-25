import React from "react"

import { SafeAreaView, View } from "react-native"

import { CarouselWeight } from "@/components/global/atoms/CarouselWeight"

const Weight = () => {
  return (
    <SafeAreaView className="h-full bg-background">
      <View className="mt-20">
        <CarouselWeight defaultWeight={70} />
      </View>
    </SafeAreaView>
  )
}

export default Weight
