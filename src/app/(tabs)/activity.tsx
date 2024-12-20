import React from "react"

import { View } from "react-native"

import { Container } from "@/components/global/atoms"
import CardSlider from "@/components/global/molecules/CardSlider"
import { Header } from "@/components/global/organisms"

import { ImageSlider } from "@/constants/sliderData"

function ActivityScreen() {
  return (
    <>
      {/* <Container>
        <Header title="Hoạt động" />
      </Container> */}

      <View className="mt-20 h-fit bg-background">
        <CardSlider itemList={ImageSlider} />
      </View>
    </>
  )
}

export default ActivityScreen
