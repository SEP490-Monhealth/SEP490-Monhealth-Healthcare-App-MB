import React from "react"

import { Microphone } from "iconsax-react-native"

import { Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

function VoiceScreen() {
  return (
    <Container>
      <Header
        title="AI Voice"
        action={{
          icon: <Microphone variant="Bold" size={24} color={COLORS.primary} />,
          url: "/(tabs)/home"
        }}
      />
    </Container>
  )
}

export default VoiceScreen
