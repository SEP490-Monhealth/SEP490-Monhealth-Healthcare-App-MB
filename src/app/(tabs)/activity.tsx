import React from "react"

import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "@/components/global/organisms"

import { FoodCategories } from "@/components/local/foods"
import { CategoryPicker } from "@/components/local/setup/CategoryPicker"
import { FoodPicker } from "@/components/local/setup/FoodPicker"

import { categoriesData } from "@/constants/categories"
import { foodDataPicker } from "@/constants/foodsPicker"

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
          <FoodCategories categoriesData={categoriesData} />
        </View>

        <View className="mb-20 mt-10 px-6">
          {/* <FoodPicker data={foodDataPicker} /> */}

          <CategoryPicker data={categoriesData} />
        </View>
      </SafeAreaView>
    </>
  )
}

export default ActivityScreen
