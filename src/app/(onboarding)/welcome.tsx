import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"

function WelcomeScreen() {
  const router = useRouter()

  const handleSignInGoogle = () => {
    router.replace("/(tabs)/home")
  }

  const handleSignInEmail = () => {
    router.push("/(auth)/sign-in")
  }

  return (
    <Container>
      <Content className="mt-24 justify-between">
        <VStack gap={12}>
          <Text className="font-tbold text-4xl text-primary">
            Hoàn thành {"\n"}
            mục tiêu sức khỏe {"\n"}
            của bạn
          </Text>

          <Text className="font-tregular text-xl text-accent">
            Với công cụ theo dõi dinh dưỡng và bài tập cá nhân hóa
          </Text>
        </VStack>

        <VStack gap={20} className="mb-4">
          <VStack gap={12}>
            <Button variant="secondary" onPress={handleSignInGoogle}>
              Google
            </Button>

            <Button onPress={handleSignInEmail}>Tiếp tục</Button>
          </VStack>

          <Text className="text-center text-accent">
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
      </Content>
    </Container>
  )
}

export default WelcomeScreen
