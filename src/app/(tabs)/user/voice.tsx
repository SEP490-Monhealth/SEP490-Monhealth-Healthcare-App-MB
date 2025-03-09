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

  const handleRegisterConsultant = () => {
    router.push("/setup/consultant")
  }

  const handleSetupUser = () => {
    router.push("/setup/user")
  }

  const handleViewBooking = () => {
    router.push("/bookings/consultant")
  }

  const handleViewSchedules = () => {
    router.push("/(test)/schedule")
  }

  const handleCreateExercise = () => {
    router.push("/exercises/create")
  }

  const handleCreateWorkout = () => {
    router.push("/workouts/create")
  }

  const handleCreateSchedule = () => {
    router.push("/setup/consultant/schedule")
  }

  const handleViewChat = () => {
    router.push("/chats/user")
  }

  const handleViewBookingsUser = () => {
    router.push("/bookings/user")
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
          <VStack gap={20} className="pb-40">
            <Button size="lg" onPress={handleRegisterConsultant}>
              Đăng ký consultant
            </Button>

            <Button size="lg" onPress={handleSetupUser}>
              handleSetupUser
            </Button>

            <Button size="lg" onPress={handleViewBooking}>
              Booking của consultant
            </Button>

            <Button size="lg" onPress={handleViewSchedules}>
              Schedule
            </Button>

            <Button size="lg" onPress={handleCreateExercise}>
              Tạo Exercise
            </Button>

            <Button size="lg" onPress={handleCreateWorkout}>
              Tạo Workout
            </Button>

            <Button size="lg" onPress={handleCreateSchedule}>
              Create Schedule
            </Button>

            <Button size="lg" onPress={handleViewChat}>
              Tin nhắn
            </Button>

            <Button size="lg" onPress={handleViewBookingsUser}>
              Booking của user
            </Button>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default VoiceScreen
