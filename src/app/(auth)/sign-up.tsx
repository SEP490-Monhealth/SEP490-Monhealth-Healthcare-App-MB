import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowLeft,
  Call,
  Eye,
  EyeSlash,
  Lock1,
  Profile,
  Sms
} from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  VStack
} from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import { RegisterType, registerSchema } from "@/schemas/userSchema"

function SignUpScreen() {
  const router = useRouter()
  const { register } = useAuth()

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

  const handleBack = () => {
    router.back()
  }

  const handleSignIn = () => {
    router.replace("/(auth)/sign-in")
  }

  const onSubmit = async (registerData: RegisterType) => {
    setIsLoading(true)
    // console.log(registerData)

    try {
      await register(
        registerData.fullName,
        registerData.phoneNumber,
        registerData.email,
        registerData.password
      )
      router.replace("/(auth)/login")
    } catch (error: any) {
      console.log("Lỗi khi đăng ký:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }

    setIsLoading(false)
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
            <Text className="mb-2 font-tbold text-4xl text-primary">
              Đăng Ký
            </Text>
            <Text className="font-tregular text-xl text-accent">
              Đăng ký để theo dõi sức khỏe và dinh dưỡng hàng ngày
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
