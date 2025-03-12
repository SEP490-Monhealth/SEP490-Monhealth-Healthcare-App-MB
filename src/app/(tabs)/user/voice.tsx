import React from "react"

import { useRouter } from "expo-router"

import { Microphone } from "iconsax-react-native"

import {
  Button,
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

function VoiceScreen() {
  const router = useRouter()

  const handleSetupConsultant = () => {
    router.push("/(setup)/consultant")
  }

  const handleSetupUser = () => {
    router.push("/(setup)/user")
  }

  const handleViewBooking = () => {
    router.push("/bookings/consultant")
  }

  const handleCreateWorkout = () => {
    router.push("/workouts/create")
  }

  const handleCreateSchedule = () => {
    router.push("/(setup)/consultant/schedule")
  }

  const handleViewBookingsUser = () => {
    router.push("/bookings/user")
  }

  const handleCreateExercise = () => {
    router.push("/exercises/create")
  }

  const handleTeleport = () => {
    router.push("/(tabs)/consultant/dashboard")
  }

  return (
    <Container>
      <Header
        label="AI Voice"
        action={{
          icon: <Microphone variant="Bold" size={20} color={COLORS.primary} />,
          href: "/(tabs)/home"
        }}
      />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20}>
            <Button size="lg" onPress={handleSetupUser}>
              Setup User
            </Button>

            <Button size="lg" onPress={handleSetupConsultant}>
              Setup Consultant
            </Button>

            <Button size="lg" onPress={handleCreateSchedule}>
              Create Schedule
            </Button>

            <Button size="lg" onPress={handleViewBookingsUser}>
              User Booking
            </Button>

            <Button size="lg" onPress={handleViewBooking}>
              Consultant Booking
            </Button>

            <Button size="lg" onPress={handleCreateWorkout}>
              Create Workout
            </Button>

            <Button size="lg" onPress={handleCreateExercise}>
              Create Exercise
            </Button>

            <Button size="lg" onPress={handleTeleport}>
              Teleport
            </Button>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default VoiceScreen
