import React from "react"

import { useLocalSearchParams } from "expo-router"

import { Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

function WorkoutDetailsScreen() {
  const { workoutId } = useLocalSearchParams() as {
    workoutId: string
  }

  console.log(workoutId)

  return (
    <Container>
      <Header back label="Chi tiết" />
    </Container>
  )
}

export default WorkoutDetailsScreen
