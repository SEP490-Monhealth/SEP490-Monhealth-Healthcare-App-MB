import React, { useState } from "react"

import { Text, View } from "react-native"

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
import { StepHeader } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

import { RegisterType, registerSchema } from "@/schemas/userSchema"

function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = async (registerData: RegisterType) => {
    setIsLoading(true)

    console.log(registerData)

    setIsLoading(false)
  }
  return (
    <Container dismissKeyboard>
      <Content className="mt-2 justify-center">
        <VStack>
          <StepHeader
            title="Thông tin cá nhân"
            description="Vui lòng nhập các thông tin cá nhân của bạn để bắt đầu đăng kí làm chuyên viên tư vấn"
          />

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
                    <Profile variant="Bold" size={20} color={COLORS.primary} />
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

          <Text className="mt-4 text-center font-tregular text-primary">
            *Vui lòng kiểm tra kĩ thông tin trước khi nhắn đăng kí
          </Text>
        </VStack>
      </Content>
    </Container>
  )
}

export default SignUpScreen
