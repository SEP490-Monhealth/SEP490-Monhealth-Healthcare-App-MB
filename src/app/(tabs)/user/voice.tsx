import React from "react"

import { useRouter } from "expo-router"

import { Microphone } from "iconsax-react-native"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

function VoiceScreen() {
  const router = useRouter()

  const handleRegisterConsultant = () => {
    router.push("/(setup)/consultant")
  }

  const handleSetupUser = () => {
    router.push("/(setup)/user")
  }

  const handleViewBooking = () => {
    router.push("/bookings")
  }

  const handleViewSchedules = () => {
    router.push("/(test)/schedule")
  }

  const handleCreateWorkout = () => {
    router.push("/workouts/create")
  }

  const handleCreateSchedule = () => {
    router.push("/(setup)/consultant/schedule")
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

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Button size="lg" onPress={handleRegisterConsultant}>
            Đăng ký consultant
          </Button>

          <Button size="lg" onPress={handleSetupUser}>
            handleSetupUser
          </Button>

          <Button size="lg" onPress={handleViewBooking}>
            Booking
          </Button>

          <Button size="lg" onPress={handleViewSchedules}>
            Schedule
          </Button>

          <Button size="lg" onPress={handleCreateWorkout}>
            Workout
          </Button>

          <Button size="lg" onPress={handleCreateSchedule}>
            Create Schedule
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default VoiceScreen
