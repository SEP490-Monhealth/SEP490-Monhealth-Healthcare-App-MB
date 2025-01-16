import React from "react"

import { useRouter } from "expo-router"

import { Microphone } from "iconsax-react-native"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

function VoiceScreen() {
  const router = useRouter()

  const handleViewSignUp = () => {
    router.push("/test/consultant-sign-up")
  }

  const handleViewCertificate = () => {
    router.push("/test/certification")
  }

  const handleViewService = () => {
    router.push("/test/service")
  }

  const handleViewImageUpload = () => {
    router.push("/test/image-upload")
  }

  const handleViewExerciseCategories = () => {
    router.push("/workouts")
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
          <Button size="lg" onPress={handleViewSignUp}>
            Đăng kí consultant
          </Button>

          <Button size="lg" onPress={handleViewCertificate}>
            Chứng chỉ
          </Button>

          <Button size="lg" onPress={handleViewService}>
            Dịch vụ
          </Button>

          <Button size="lg" onPress={handleViewImageUpload}>
            Upload ảnh
          </Button>

          <Button size="lg" onPress={handleViewExerciseCategories}>
            Bài tập
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default VoiceScreen
