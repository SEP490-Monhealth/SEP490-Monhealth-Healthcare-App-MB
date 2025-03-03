import React from "react"

import { useRouter } from "expo-router"

import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

function WorkoutUserScreen() {
  const router = useRouter()

  const { user } = useAuth()
  // const userId = user?.userId

  const userId = "3026595f-1414-4b74-be8f-11b7f6e7f4f6"

  return (
    <Container>
      <Header
        back
        label="Bài tập của tôi"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          href: "/workouts/create"
        }}
      />

      <Content className="mt-2"></Content>
    </Container>
  )
}

export default WorkoutUserScreen
