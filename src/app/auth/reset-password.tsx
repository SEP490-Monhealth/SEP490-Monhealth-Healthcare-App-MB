import React, { useState } from "react"

import { Keyboard, Text, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeSlash, Lock1 } from "iconsax-react-native"
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

import { ResetPasswordType, resetPasswordSchema } from "@/schemas/userSchema"

function ForgotPasswordScreen() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema)
    // defaultValues: {
    //   password: "123As@",
    //   confirmPassword: "123As@"
    // }
  })

  const onSubmit = (data: ResetPasswordType) => {
    Keyboard.dismiss()

    console.log(data)
    router.push("/auth/sign-in")
  }

  return (
    <Container>
      <Content className="mt-2">
        <VStack gap={40}>
          <Header back />

          <View>
            <Text className="mb-2 font-tbold text-3xl text-primary">
              Đặt Lại Mật Khẩu
            </Text>
            <Text className="font-tregular text-xl text-accent">
              Vui lòng nhập mật khẩu mới và xác nhận để hoàn tất quá trình đặt
              lại mật khẩu của bạn
            </Text>

            <VStack gap={8} className="mt-8">
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

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    label="Xác nhận mật khẩu"
                    placeholder="******"
                    onChangeText={onChange}
                    isSecure={!showConfirmPassword}
                    onToggleSecure={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    startIcon={
                      <Lock1 variant="Bold" size={20} color={COLORS.primary} />
                    }
                    endIcon={
                      showConfirmPassword ? (
                        <Eye variant="Bold" size={20} color={COLORS.primary} />
                      ) : (
                        <EyeSlash variant="Bold" size={20} color="#cbd5e1" />
                      )
                    }
                    alwaysShowEndIcon
                    canClearText
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />
            </VStack>

            <Button onPress={handleSubmit(onSubmit)} className="mt-8">
              Đặt lại
            </Button>
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default ForgotPasswordScreen
