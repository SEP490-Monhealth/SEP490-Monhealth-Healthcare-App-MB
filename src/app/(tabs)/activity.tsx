import React from "react"

import { Container } from "@/components/global/atoms"
import { ArcProgress } from "@/components/global/molecules"

function ActivityScreen() {
  return (
    <Container>
      <ArcProgress
        size={240}
        width={14}
        fill={70}
        arcSweepAngle={260}
        rotation={230}
        centerCircle={true}
        currentValue={300}
        totalValue={1000}
        label="calories"
        className="mt-4"
      />
    </Container>
  )
}

export default ActivityScreen
