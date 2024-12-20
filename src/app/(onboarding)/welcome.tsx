import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, VStack } from "@/components/global/atoms"

function WelcomeScreen() {
  const router = useRouter()

  const handleSignInGoogle = () => {
    router.replace("/(tabs)/home")
  }

  const handleSignInEmail = () => {
    router.push("/(auth)/sign-in")
  }

  return (
    <Container className="flex-1 justify-between pb-8 pt-24">
      <VStack gap={12}>
        <Text className="font-tbold text-4xl text-primary">
          Hoàn thành {"\n"}
          mục tiêu sức khỏe {"\n"}
          của bạn
        </Text>

        <Text className="font-tregular text-xl text-secondary">
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

        <Text className="text-center text-secondary">
          Khi tiếp tục, bạn đồng ý với{" "}
          <Text className="font-tmedium text-primary active:underline">
            Điều khoản dịch vụ
          </Text>{" "}
          và{" "}
          <Text className="font-tmedium text-primary active:underline">
            Chính sách quyền riêng tư
          </Text>{" "}
          của chúng tôi.
        </Text>
      </VStack>
    </Container>
  )
}

export default WelcomeScreen
