import React, { useState } from "react"

import { View } from "react-native"

import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import { Schedule } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

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

      <Content>
        <Schedule initialDate={currentDate} />
      </Content>
    </Container>
  )
}

export default ScheduleScreen
