import React, { useState } from "react"

import { Keyboard, Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

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

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { RegisterType, registerSchema } from "@/schemas/userSchema"

const signUpData: { [key: string]: { title: string; description: string } } = {
  Member: {
    title: "Đăng Ký",
    description: "Đăng ký để theo dõi sức khỏe và dinh dưỡng hàng ngày"
  },
  Consultant: {
    title: "Đăng Ký",
    description: "Đăng ký để hỗ trợ người dùng theo dõi sức khỏe"
  }
}

function SignUpScreen() {
  const router = useRouter()
  const { role, register } = useAuth()

  const { title, description } = signUpData[role ?? "Member"]

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      // fullName: "Van Huu Toan",
      // phoneNumber: "0123456789",
      // email: "asd@gmail.com",
      // password: "123As@"
      fullName: "Nguyen Quoc Dai",
      phoneNumber: "0112223333",
      email: "nguyenquocdai@gmail.com",
      password: "123As@"
    }
  })

  const handleSignIn = () => router.replace(`/auth/sign-in?userType=${role}`)

  const onSubmit = async (registerData: RegisterType) => {
    setIsLoading(true)
    Keyboard.dismiss()

    // console.log(registerData)

    try {
      // console.log(JSON.stringify(registerData, null, 2))

      await register(
        registerData.fullName,
        registerData.phoneNumber,
        registerData.email,
        registerData.password
      )
    } catch (error: any) {
      console.log("Lỗi khi đăng ký:", error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }

    setIsLoading(false)
  }

  return (
    <Container dismissKeyboard>
      <Content className="mt-2">
        <VStack gap={40}>
          <Header back />

          <View>
            <Text className="mb-2 font-tbold text-4xl text-primary">
              {title}
            </Text>
            <Text className="font-tregular text-xl text-accent">
              {description}
            </Text>

            <VStack gap={8} className="mt-8">
              <Controller
                name="fullName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    label="Họ và tên"
                    placeholder="VD: Nguyễn Văn A"
                    onChangeText={onChange}
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
                    label="Số điện thoại"
                    placeholder="VD: 0963122758"
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
                    label="Email"
                    placeholder="VD: nguyenvana@gmail.com"
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
