import React from "react"

import { Calendar, Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  return (
    <Container>
      <Header title="Hoạt động" />

      <Calendar />
    </Container>
  )
}

export default ActivityScreen
