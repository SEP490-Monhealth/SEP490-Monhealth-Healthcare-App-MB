import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, VStack } from "@/components/global/atoms"

function WelcomeScreen() {
  const router = useRouter()

  const handleSignInGoogle = () => {
    console.log("Continue with Google")
  }

  const handleSignInEmail = () => {
    console.log("Continue with Email")
    router.replace("/(auth)/sign-in")
  }

  return (
    <Container className="flex justify-between pb-8">
      <VStack gap={12}>
        <Text className="font-nbold text-3xl text-primary">
          Hoàn thành {"\n"}
          mục tiêu sức khỏe {"\n"}
          của bạn
        </Text>

        <Text className="text-xl text-typography-description">
          Với công cụ theo dõi dinh dưỡng và bài tập cá nhân hóa
        </Text>
      </VStack>

      <VStack gap={20}>
        <VStack gap={16}>
          <Button variant="secondary" onPress={handleSignInGoogle}>
            Tiếp tục với Google
          </Button>
          <Button onPress={handleSignInEmail}>Tiếp tục với Email</Button>
        </VStack>

        <Text className="text-center">
          Khi tiếp tục, bạn đồng ý với{" "}
          <Text className="font-nsemibold text-primary active:underline">
            Điều khoản dịch vụ
          </Text>{" "}
          và{" "}
          <Text className="font-nsemibold text-primary active:underline">
            Chính sách quyền riêng tư
          </Text>{" "}
          của chúng tôi.
        </Text>
      </VStack>
    </Container>
  )
}

export default WelcomeScreen
