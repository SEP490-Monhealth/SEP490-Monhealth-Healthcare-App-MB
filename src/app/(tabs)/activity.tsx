import React from "react"

import { Container } from "@/components/global/atoms"
import { ArcProgress } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

function ActivityScreen() {
  return (
    <Container>
      <Header title="Hoạt động" />

      <ArcProgress
        size={240}
        width={14}
        fill={70}
        arcSweepAngle={260}
        rotation={230}
        centerCircle={true}
        calorieValue={300}
        maxCalories={1000}
        label="calories"
      />
    </Container>
  )
}

export default ActivityScreen
