import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import { Button, Container } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/appConstants"

function OTPVerificationScreen() {
  const router = useRouter()

  const handleBack = () => {
    router.replace("/(auth)/forgot-password")
  }

  return (
    <Container className="gap-16">
      <IconButton
        icon={<ArrowLeft size={24} color={COLORS.primary} />}
        onPress={handleBack}
      />

      <View>
        <Text className="mb-2 font-tbold text-3xl text-typography">
          Xác Nhận Mã OTP
        </Text>
        <Text className="font-tregular text-xl text-card">
          Nhập mã OTP đã được gửi đến số điện thoại của bạn để tiếp tục quá
          trình khôi phục mật khẩu
        </Text>

        <Button className="mt-8">Xác nhận</Button>
      </View>
    </Container>
  )
}

export default OTPVerificationScreen
