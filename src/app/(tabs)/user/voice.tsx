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

  const handleViewUserBooking = () => {
    router.push("/bookings/user")
  }

  const handleCreateSchedule = () => {
    router.push("/(setup)/consultant/schedule")
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

            <Button size="lg" onPress={handleViewUserBooking}>
              User Booking
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
