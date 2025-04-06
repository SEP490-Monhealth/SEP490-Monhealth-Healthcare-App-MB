import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Button, Container, Content, VStack } from "@/components/global/atoms"

import { useAuth } from "@/contexts/AuthContext"

function WelcomeScreen() {
  const router = useRouter()
  const { setRole } = useAuth()

  const handleSelectUser = () => {
    setRole("Member")
    router.push("/auth/sign-in")
  }

  const handleSelectConsultant = () => {
    setRole("Consultant")
    router.push("/auth/sign-in")
  }

  return (
    <Container>
      <Content className="mb-4 mt-24 justify-between">
        <VStack gap={12}>
          <Text className="font-tbold text-4xl leading-10 text-primary">
            Hãy cho{"\n"}
            Chúng tôi biết{"\n"}
            Bạn là ai?
          </Text>

          <Text className="font-tregular text-xl text-accent">
            Trở thành người dùng để theo dõi sức khỏe hoặc chuyên viên để hỗ trợ
            người khác
          </Text>
        </VStack>

        <VStack gap={24}>
          <VStack gap={12}>
            <Button variant="secondary" onPress={handleSelectConsultant}>
              Tôi là chuyên viên tư vấn
            </Button>

            <Button onPress={handleSelectUser}>Tôi là người dùng</Button>
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
