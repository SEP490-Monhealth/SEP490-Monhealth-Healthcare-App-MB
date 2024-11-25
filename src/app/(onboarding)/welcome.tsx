import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { Button, VStack } from "@/components/global"

function WelcomeScreen() {
  const router = useRouter()

  const handleContinueWithGoogle = () => {
    console.log("Continue with Google")
  }

  const handleContinueWithEmail = () => {
    console.log("Continue with Email")
    router.replace("/(auth)/sign-in")
  }

  return (
    <View className="flex-1 justify-between px-5 pb-4 pt-24">
      <VStack gap={12}>
        <Text className="font-nbold text-3xl">
          Hoàn thành {"\n"}
          mục tiêu sức khỏe {"\n"}
          của bạn
        </Text>

        <Text className="text-xl text-typography-description">
          Với công cụ theo dõi dinh dưỡng và bài tập cá nhân hóa
        </Text>
      </VStack>

      <VStack gap={32}>
        <VStack gap={16}>
          <Button variant="ghost" onPress={handleContinueWithGoogle}>
            Tiếp tục với Google
          </Button>
          <Button onPress={handleContinueWithEmail}>Tiếp tục với Email</Button>
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
    </View>
  )
}

export default WelcomeScreen
