import React, { useState } from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Eye, EyeSlash, Lock1 } from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import { Button, Container, Input, VStack } from "@/components/global/atoms"
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
    router.push("/(auth)/forgot-password")
  }

  const onSubmit = (data: ResetPasswordType) => {
    console.log(data)
    router.push("/(auth)/otp-verification")
  }

  return (
    <Container className="gap-16">
      <IconButton
        icon={<ArrowLeft size={24} color={COLORS.primary} />}
        onPress={handleBack}
      />

      <View>
        <Text className="mb-2 font-tbold text-3xl text-primary">
          Đặt Lại Mật Khẩu
        </Text>
        <Text className="font-tregular text-xl text-secondary">
          Vui lòng nhập mật khẩu mới và xác nhận để hoàn tất quá trình đặt lại
          mật khẩu của bạn
        </Text>

        <VStack gap={12} className="mt-8">
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry={!showPassword}
                toggleSecureTextEntry={() => setShowPassword(!showPassword)}
                value={value}
                onChangeText={onChange}
                placeholder="Nhập mật khẩu"
                iconStart={
                  <Lock1 variant="Bold" size={20} color={COLORS.primary} />
                }
                iconEnd={
                  showPassword ? (
                    <Eye variant="Bold" size={20} color={COLORS.primary} />
                  ) : (
                    <EyeSlash variant="Bold" size={20} color="#cbd5e1" />
                  )
                }
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry={!showConfirmPassword}
                toggleSecureTextEntry={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                value={value}
                onChangeText={onChange}
                placeholder="Nhập mật khẩu"
                iconStart={
                  <Lock1 variant="Bold" size={20} color={COLORS.primary} />
                }
                iconEnd={
                  showPassword ? (
                    <Eye variant="Bold" size={20} color={COLORS.primary} />
                  ) : (
                    <EyeSlash variant="Bold" size={20} color="#cbd5e1" />
                  )
                }
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />
        </VStack>

        <Button onPress={handleSubmit(onSubmit)} className="mt-8">
          Đặt lại
        </Button>
      </View>
    </Container>
  )
}

export default ForgotPasswordScreen
