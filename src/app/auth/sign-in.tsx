import React, { useState } from "react"

import { Keyboard, Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeSlash, Lock1, Sms } from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { LoginType, loginSchema } from "@/schemas/userSchema"

interface SignInDataType {
  title: string
  description: string
}

const signInData: Record<string, SignInDataType> = {
  Member: {
    title: "Đăng nhập",
    description: "Đăng nhập để tiếp tục theo dõi sức khỏe của bạn"
  },
  Consultant: {
    title: "Đăng nhập",
    description: "Đăng nhập để hỗ trợ người dùng theo dõi sức khỏe"
  }
}

function SignInScreen() {
  const router = useRouter()
  const { role, login } = useAuth()

  const { title, description } =
    signInData[role ?? "Member"] || signInData.Member

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // 0987654321 chuyên viên
      // 0792766979 người dùng
      // 0112223333 vi khuẩn
      phoneNumber: "",
      password: ""
    }
  })

  const handleBack = () => router.replace("/onboarding/welcome")

  const handleSignUp = () => router.push(`/auth/sign-up?userType=${role}`)

  const handleForgotPassword = () => router.push("/auth/forgot-password")

  const onSubmit = async (loginData: LoginType) => {
    Keyboard.dismiss()
    setIsLoading(true)

    // console.log(loginData)

    try {
      await login(loginData.phoneNumber, loginData.password)
    } catch (error: any) {
      console.log("Lỗi khi đăng nhập:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container dismissKeyboard>
      <Content className="mt-2">
        <Header back onBackPress={handleBack} />

        <View className="mt-10">
          <VStack gap={8}>
            <Text className="font-tbold text-4xl text-primary">{title}</Text>
            <Text className="font-tregular text-xl text-accent">
              {description}
            </Text>
          </VStack>

          <VStack gap={12} className="mt-8">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Số điện thoại"
                  placeholder="VD: 0987654321"
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  startIcon={
                    <Sms variant="Bold" size={20} color={COLORS.primary} />
                  }
                  canClearText
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Mật khẩu"
                  placeholder="******"
                  onChangeText={onChange}
                  isSecure={!showPassword}
                  onToggleSecure={() => setShowPassword(!showPassword)}
                  startIcon={
                    <Lock1 variant="Bold" size={20} color={COLORS.primary} />
                  }
                  endIcon={
                    showPassword ? (
                      <Eye variant="Bold" size={20} color={COLORS.primary} />
                    ) : (
                      <EyeSlash variant="Bold" size={20} color="#cbd5e1" />
                    )
                  }
                  alwaysShowEndIcon
                  canClearText
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </VStack>

          {/* <TouchableOpacity activeOpacity={1} onPress={handleForgotPassword}>
            <Text className="mt-2 text-right font-tmedium text-primary">
              Quên mật khẩu
            </Text>
          </TouchableOpacity> */}

          <Button
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
            className="mt-12"
          >
            {!isLoading && "Đăng nhập"}
          </Button>

          <Text className="mt-4 text-center font-tregular text-secondary">
            Chưa có tài khoản?{" "}
            <TouchableOpacity activeOpacity={1} onPress={handleSignUp}>
              <Text className="-mb-1 font-tmedium text-primary">Đăng ký</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </Content>
    </Container>
  )
}

export default SignInScreen
