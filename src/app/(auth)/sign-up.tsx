import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Call, Eye, EyeSlash, Lock1, Profile, Sms } from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import { RegisterType, registerSchema } from "@/schemas/userSchema"

function SignUpScreen() {
  const router = useRouter()
  const { userType = "user" } = useLocalSearchParams() as {
    userType: "user" | "consultant"
  }

  const { register } = useAuth()

  const signUpData: { [key: string]: { title: string; description: string } } =
    {
      user: {
        title: "Đăng Ký",
        description: "Đăng ký để theo dõi sức khỏe và dinh dưỡng hàng ngày"
      },
      consultant: {
        title: "Đăng Ký",
        description: "Đăng ký để hỗ trợ người dùng theo dõi sức khỏe"
      }
    }

  const { title, description } = signUpData[userType] || signUpData.user

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "Van Huu Toan",
      phoneNumber: "0123456789",
      email: "asd@gmail.com",
      password: "123As@"
    }
  })

  const handleSignIn = () => router.replace("/(auth)/sign-in")

  const onSubmit = async (registerData: RegisterType) => {
    setIsLoading(true)
    // console.log(registerData)

    try {
      if (userType === "user") {
        await register(
          registerData.fullName,
          registerData.phoneNumber,
          registerData.email,
          registerData.password
        )

        router.replace("/(setup)")
      } else {
        console.log("Đăng ký chuyên viên tư vấn")
      }
    } catch (error: any) {
      console.log("Lỗi khi đăng ký:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }

    setIsLoading(false)
  }

  return (
    <Container>
      <Content className="mt-12">
        <VStack gap={64}>
          <Header back />

          <View>
            <Text className="mb-2 font-tbold text-4xl text-primary">
              {title}
            </Text>
            <Text className="font-tregular text-xl text-accent">
              {description}
            </Text>

            <VStack gap={12} className="mt-8">
              <Controller
                name="fullName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    placeholder="Nhập họ và tên"
                    onChangeText={onChange}
                    keyboardType="default"
                    startIcon={
                      <Profile
                        variant="Bold"
                        size={20}
                        color={COLORS.primary}
                      />
                    }
                    canClearText
                    errorMessage={errors.fullName?.message}
                  />
                )}
              />

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    placeholder="Nhập số điện thoại"
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    startIcon={
                      <Call variant="Bold" size={20} color={COLORS.primary} />
                    }
                    canClearText
                    errorMessage={errors.phoneNumber?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    placeholder="Nhập địa chỉ email"
                    onChangeText={onChange}
                    keyboardType="email-address"
                    startIcon={
                      <Sms variant="Bold" size={20} color={COLORS.primary} />
                    }
                    canClearText
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    placeholder="Nhập mật khẩu"
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

            <Button
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
              className="mt-8"
            >
              {!isLoading && "Đăng ký"}
            </Button>

            <Text className="mt-4 text-center font-tregular text-secondary">
              Đã có tài khoản?{" "}
              <TouchableOpacity activeOpacity={1} onPress={handleSignIn}>
                <Text className="-mb-1 font-tmedium text-primary">
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default SignUpScreen
