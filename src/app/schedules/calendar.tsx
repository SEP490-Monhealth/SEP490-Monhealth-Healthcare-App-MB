import React from "react"

import { View } from "react-native"

import { Calendar, Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function CalendarScreen() {
  return (
    <Container>
      <Header back title="Chọn ngày" />

      <Content>
        <View className="mt-2">
          <Calendar />
        </View>
      </Content>
    </Container>
  )
}

export default CalendarScreen
