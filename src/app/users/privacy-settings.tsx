import React, { useState } from "react"

import { Text, View } from "react-native"

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

import { COLORS } from "@/constants/app"

import { ResetPasswordType, resetPasswordSchema } from "@/schemas/userSchema"

function PrivacySettingScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (data: ResetPasswordType) => {
    setIsLoading(true)
    console.log("Submit:", data)
    setIsLoading(false)
  }

  return (
    <Container>
      <Header back label="Bảo mật " />

      <Content className="mt-2">
        <VStack gap={12} className="mt-8">
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="Nhập mật khẩu cũ"
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
                placeholder="Nhập mật khẩu mới"
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

        <Button
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="mt-8"
        >
          {!isLoading && "Đổi mật khẩu"}
        </Button>
      </Content>
    </Container>
  )
}

export default PrivacySettingScreen
