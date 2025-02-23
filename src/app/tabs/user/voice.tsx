import React from "react"

import { useRouter } from "expo-router"

import { Microphone } from "iconsax-react-native"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

function VoiceScreen() {
  const router = useRouter()

  const handleViewSignUp = () => {
    router.push("/(consultant-setup)/expertise")
  }

  const handleViewLocalImage = () => {
    router.push("/test/local-image")
  }

  const handleViewConsultant = () => {
    router.push("/test/consultant")
  }

  return (
    <Container>
      <Header
        label="AI Voice"
        action={{
          icon: <Microphone variant="Bold" size={20} color={COLORS.primary} />,
          href: "/tabs/home"
        }}
      />

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Button size="lg" onPress={handleViewSignUp}>
            Đăng ký consultant
          </Button>

          <Button size="lg" onPress={handleViewLocalImage}>
            Local Image
          </Button>

          <Button size="lg" onPress={handleViewConsultant}>
            Tư vấn viên
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default VoiceScreen
