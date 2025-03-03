import React from "react"

import { useRouter } from "expo-router"

import { Microphone } from "iconsax-react-native"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

function VoiceScreen() {
  const router = useRouter()

  const handleRegisterConsultant = () => {
    router.push("/setup/consultant")
  }

  const handleViewConsultant = () => {
    router.push("/(test)/consultant")
  }

  const handleViewBookingConsultant = () => {
    router.push("/bookings")
  }

  const handleRegisterUser = () => {
    router.push("/setup/user")
  }

  const handleCreateExercise = () => {
    router.push("/(test)/create")
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

          <Button size="lg" onPress={handleViewConsultant}>
            Tư vấn viên
          </Button>

          <Button size="lg" onPress={handleViewBookingConsultant}>
            Booking
          </Button>

          <Button size="lg" onPress={handleRegisterUser}>
            Đăng ký user
          </Button>

          <Button size="lg" onPress={handleCreateExercise}>
            Tạo bài tập
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default VoiceScreen
