import React, { useRef, useState } from "react"

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"

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

  const scrollViewRef = useRef<ScrollView>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

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
      fullName: "",
      phoneNumber: "",
      email: "",
      password: ""
    }
  })

  const handleBack = () => router.replace("/onboarding/welcome")

  const handleSignIn = () => router.replace(`/auth/sign-in?userType=${role}`)

  const onSubmit = async (registerData: RegisterType) => {
    Keyboard.dismiss()
    setIsLoading(true)

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

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 50)
  }

  return (
    <Container dismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
      >
        <Content className="mt-2">
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
          >
            <Header back onBackPress={handleBack} />

            <View className="mt-10">
              <VStack gap={8}>
                <Text className="font-tbold text-4xl text-primary">
                  {title}
                </Text>
                <Text className="font-tregular text-xl text-accent">
                  {description}
                </Text>
              </VStack>

              <VStack gap={12} className="mt-8">
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
                      placeholder="VD: 0987654321"
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
                      keyboardType="default"
                      startIcon={
                        <Sms variant="Bold" size={20} color={COLORS.primary} />
                      }
                      canClearText
                      errorMessage={errors.email?.message}
                      onFocus={scrollToInput}
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
                        <Lock1
                          variant="Bold"
                          size={20}
                          color={COLORS.primary}
                        />
                      }
                      endIcon={
                        showPassword ? (
                          <Eye
                            variant="Bold"
                            size={20}
                            color={COLORS.primary}
                          />
                        ) : (
                          <EyeSlash variant="Bold" size={20} color="#cbd5e1" />
                        )
                      }
                      alwaysShowEndIcon
                      canClearText
                      errorMessage={errors.password?.message}
                      onFocus={scrollToInput}
                    />
                  )}
                />
              </VStack>

              <Button
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
                className="mt-12"
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
          </ScrollView>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}

export default SignUpScreen
