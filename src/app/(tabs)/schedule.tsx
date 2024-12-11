import React, { useCallback, useState } from "react"

import { View } from "react-native"

import { Add } from "iconsax-react-native"

import { Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import DateOfMonthList from "@/components/local/tabs/schedule/DateOfMonth"

import { COLORS } from "@/constants/appConstants"

function ScheduleScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <Container>
      <Header
        title="Thực đơn"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          url: "/foods"
        }}
      />

      <View className="mt-6">
        <DateOfMonthList date={currentDate} />
      </View>
    </Container>
  )
}

export default ScheduleScreen
