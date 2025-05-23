import React, { useEffect, useState } from "react"

import { Keyboard, Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  OTPInput,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { OtpVerificationType, otpSchema } from "@/schemas/userSchema"

function OTPVerificationScreen() {
  const router = useRouter()

  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [isClear, setIsClear] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<OtpVerificationType>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ""
    }
  })

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [timeLeft])

  const onSubmit = (data: OtpVerificationType) => {
    Keyboard.dismiss()

    console.log("OTP Submitted:", data)
    router.replace("/auth/reset-password")
  }

  const handleResendOTP = () => {
    setIsClear(true)
    setTimeLeft(30)
    setTimeout(() => setIsClear(false), 100)
    console.log("Resend OTP")
  }

  return (
    <Container dismissKeyboard>
      <Content className="mt-2">
        <VStack gap={40}>
          <Header back />

          <View>
            <Text className="mb-2 font-tbold text-3xl text-primary">
              Xác Nhận Mã OTP
            </Text>
            <Text className="font-tregular text-xl text-accent">
              Nhập mã OTP đã được gửi đến số điện thoại của bạn để tiếp tục quá
              trình khôi phục mật khẩu
            </Text>

            <VStack gap={8} className="mt-8">
              <Controller
                name="otp"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <OTPInput
                    length={6}
                    value={value}
                    onOTPChange={onChange}
                    isClear={isClear}
                  />
                )}
              />

              {errors.otp && (
                <Text className="text-sm text-red-500">
                  {errors.otp.message}
                </Text>
              )}

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

            <Button onPress={handleSubmit(onSubmit)} className="mt-8">
              Xác nhận
            </Button>
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default OTPVerificationScreen
