import React from "react"

import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import Categories from "@/components/global/atoms/Category"
// import { Carousel } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { categoriesData } from "@/constants/categories"

// import { goalsData } from "@/constants/goals"

function ActivityScreen() {
  return (
    <>
      <SafeAreaView className="h-full bg-background">
        <View className="px-6">
          <Header title="Hoạt động" />
        </View>

        {/* <View>
          <Carousel items={goalsData} />
        </View> */}

        <View className="h-fit px-6">
          <Categories data={categoriesData} isMultiple={true} />
        </View>
      </SafeAreaView>
    </>
  )
}

export default ActivityScreen
