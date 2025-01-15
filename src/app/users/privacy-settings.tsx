import React, { useState } from "react"

import { Text } from "react-native"

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

import { UpdatePasswordType, updatePasswordSchema } from "@/schemas/userSchema"

function PrivacySettingScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdatePasswordType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (data: UpdatePasswordType) => {
    setIsLoading(true)
    // console.log("Submit:", data)
    const { password, newPassword } = data

    const payload = { password, newPassword }

    console.log("Submit Payload:", payload)

    setIsLoading(false)
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Bảo mật " />

      <Content className="mt-2">
        <VStack gap={12}>
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
            name="newPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="Nhập mật khẩu mới"
                onChangeText={onChange}
                isSecure={!showNewPassword}
                onToggleSecure={() => setShowNewPassword(!showNewPassword)}
                startIcon={
                  <Lock1 variant="Bold" size={20} color={COLORS.primary} />
                }
                endIcon={
                  showNewPassword ? (
                    <Eye variant="Bold" size={20} color={COLORS.primary} />
                  ) : (
                    <EyeSlash variant="Bold" size={20} color="#cbd5e1" />
                  )
                }
                alwaysShowEndIcon
                canClearText
                errorMessage={errors.newPassword?.message}
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
          <VStack className="mt-4">
            <Text className="font-tregular text-base text-accent">
              Mật khẩu phải từ 6 đến 20 ký tự
            </Text>
            <Text className="font-tregular text-base text-accent">
              Bao gồm số, chữ viết hoa, chữ viết thường
            </Text>
            <Text className="font-tregular text-base text-accent">
              Bao gồm có ít nhất 1 ký tự đặc biệt
            </Text>
          </VStack>
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
