import React from "react"

import { Add } from "iconsax-react-native"

import { Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"

function ScheduleScreen() {
  return (
    <Container>
      <Header
        title="Thực đơn"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          url: "/foods"
        }}
      />
    </Container>
  )
}

export default ScheduleScreen
