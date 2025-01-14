import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"

function WelcomeScreen() {
  const router = useRouter()

  const handleUser = () => {
    router.push("/(auth)/sign-in")
  }

  const handleConsultant = () => {
    router.push("/(auth)/consultant-sign-in")
  }

  return (
    <Container>
      <Content className="mb-4 mt-24 justify-between">
        <VStack gap={12}>
          <Text className="font-tbold text-4xl text-primary">
            Hãy cho{"\n"}
            Chúng tôi biết{"\n"}
            Bạn là ai?
          </Text>

          <Text className="font-tregular text-xl text-accent">
            Trở thành người dùng để theo dõi sức khỏe hoặc chuyên viên để hỗ trợ
            người khác
          </Text>
        </VStack>

        <VStack gap={20}>
          <VStack gap={12}>
            <Button variant="secondary" onPress={handleConsultant}>
              Tôi là chuyên viên tư vấn
            </Button>

            <Button onPress={handleUser}>Tôi là người dùng</Button>
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
            của chúng tôi
          </Text>
        </VStack>
      </Content>
    </Container>
  )
}

export default WelcomeScreen
