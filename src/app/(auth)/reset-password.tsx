import React, { useState } from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeSlash, Lock1 } from "iconsax-react-native"
import { X } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"

import { Button, Input, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/appConstants"

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
    router.replace("/(auth)/forgot-password")
  }

  const onSubmit = (data: ResetPasswordType) => {
    console.log(data)
    router.replace("/(auth)/otp-verification")
  }

  return (
    <VStack gap={60} className="bg-background px-5 py-16">
      <X size="28" color={COLORS.primary} onPress={handleBack} />

      <View>
        <Text className="mb-2 font-nbold text-3xl text-primary">
          Đặt Lại Mật Khẩu
        </Text>
        <Text className="text-xl text-accent">
          Vui lòng nhập mật khẩu mới và xác nhận để hoàn tất quá trình đặt lại
          mật khẩu của bạn
        </Text>

        <VStack gap={12} className="mt-8">
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nhập mật khẩu"
                secureTextEntry={!showPassword}
                iconStart={
                  <Lock1 variant="Bold" size={20} color={COLORS.primary} />
                }
                iconEnd={
                  showPassword ? (
                    <Eye variant="Bold" size={20} color="#334155" />
                  ) : (
                    <EyeSlash variant="Bold" size={20} color="#cbd5e1" />
                  )
                }
                toggleSecureTextEntry={() => setShowPassword(!showPassword)}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nhập mật khẩu"
                secureTextEntry={!showConfirmPassword}
                iconStart={
                  <Lock1 variant="Bold" size={20} color={COLORS.primary} />
                }
                iconEnd={
                  showConfirmPassword ? (
                    <Eye variant="Bold" size={20} color="#334155" />
                  ) : (
                    <EyeSlash variant="Bold" size={20} color="#cbd5e1" />
                  )
                }
                toggleSecureTextEntry={() =>
                  setShowConfirmPassword(!showConfirmPassword)
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
    </VStack>
  )
}

export default ForgotPasswordScreen
