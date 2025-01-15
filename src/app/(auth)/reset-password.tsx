import React, { useState } from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Eye, EyeSlash, Lock1 } from "iconsax-react-native"
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

import { ResetPasswordType, resetPasswordSchema } from "@/schemas/userSchema"

function ForgotPasswordScreen() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "123As@",
      confirmPassword: "123As@"
    }
  })

  const handleBack = () => {
    router.back()
  }

  const onSubmit = (data: ResetPasswordType) => {
    console.log(data)
    router.push("/(auth)/sign-in")
  }

  return (
    <Container>
      <Content className="mt-12">
        <VStack gap={64}>
          <IconButton
            icon={<ArrowLeft size={24} color={COLORS.primary} />}
            onPress={handleBack}
          />

          <View>
            <Text className="mb-2 font-tbold text-3xl text-primary">
              Đặt Lại Mật Khẩu
            </Text>
            <Text className="font-tregular text-xl text-accent">
              Vui lòng nhập mật khẩu mới và xác nhận để hoàn tất quá trình đặt
              lại mật khẩu của bạn
            </Text>

            <VStack gap={12} className="mt-8">
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

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    placeholder="Nhập lại mật khẩu"
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
