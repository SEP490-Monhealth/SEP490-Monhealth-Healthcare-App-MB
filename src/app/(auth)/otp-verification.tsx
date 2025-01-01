import React, { useEffect, useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import {
  Button,
  Container,
  Content,
  OTPInput,
  VStack
} from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

function OTPVerificationScreen() {
  const router = useRouter()

  const [otpValue, setOtpValue] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleOtpChange = (otp: string) => {
    setOtpValue(otp)
  }

  const handleBack = () => {
    router.push("/(auth)/forgot-password")
  }

  const handleSubmit = () => {
    console.log(otpValue)
  }

  const handleResendOTP = () => {
    setTimeLeft(30)
    console.log("Resend OTP")
  }

  return (
    <Container>
      <Content>
        <VStack gap={64}>
          <IconButton
            icon={<ArrowLeft size={24} color={COLORS.primary} />}
            onPress={handleBack}
          />

          <View>
            <Text className="mb-2 font-tbold text-3xl text-primary">
              Xác Nhận Mã OTP
            </Text>
            <Text className="font-tregular text-xl text-accent">
              Nhập mã OTP đã được gửi đến số điện thoại của bạn để tiếp tục quá
              trình khôi phục mật khẩu
            </Text>

            <VStack gap={12} className="mt-8">
              <OTPInput length={6} onOTPChange={handleOtpChange} />

              {timeLeft !== 0 ? (
                <Text className="text-center font-tregular text-accent">
                  Mã sẽ hết hạn sau{" "}
                  <Text className="font-tmedium text-primary">
                    {timeLeft} giây
                  </Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendOTP}>
                  <Text className="text-center font-tmedium text-primary">
                    Gửi lại mã OTP
                  </Text>
                </TouchableOpacity>
              )}
            </VStack>

            <Button onPress={handleSubmit} className="mt-8">
              Xác nhận
            </Button>
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default OTPVerificationScreen
