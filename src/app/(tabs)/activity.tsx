import React from "react"

import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Carousel } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { goalsData } from "@/constants/goals"

function ActivityScreen() {
  return (
    <>
      <SafeAreaView className="h-full bg-background">
        <View className="px-6">
          <Header title="Hoạt động" />
        </View>

        <View>{/* <Carousel items={goalsData} /> */}</View>
      </SafeAreaView>
    </>
  )
}

export default ActivityScreen
