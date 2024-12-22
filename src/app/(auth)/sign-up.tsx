import React, { useState } from "react"

import { Text, View } from "react-native"

import { Link, useRouter } from "expo-router"

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

import { Button, Container, Input, VStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

import { RegisterUserType, registerUserSchema } from "@/schemas/userSchema"

function SignUpScreen() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterUserType>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      fullName: "Van Huu Toan",
      email: "asd@gmail.com",
      phoneNumber: "0123456789",
      password: "123As@"
    }
  })

  const handleBack = () => {
    router.push("/(onboarding)/welcome")
  }

  const onSubmit = (data: RegisterUserType) => {
    console.log(data)
  }

  return (
    <Container className="gap-16">
      <IconButton
        icon={<ArrowLeft size={24} color={COLORS.primary} />}
        onPress={handleBack}
      />

      <View>
        <Text className="mb-2 font-tbold text-4xl text-primary">
          Đăng Ký
        </Text>
        <Text className="font-tregular text-xl text-secondary">
          Đăng ký để theo dõi sức khỏe và dinh dưỡng hàng ngày
        </Text>

        <VStack gap={12} className="mt-8">
          <Controller
            name="fullName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nhập họ và tên"
                keyboardType="default"
                iconStart={
                  <Profile variant="Bold" size={20} color={COLORS.primary} />
                }
                errorMessage={errors.fullName?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nhập địa chỉ email"
                keyboardType="email-address"
                iconStart={
                  <Sms variant="Bold" size={20} color={COLORS.primary} />
                }
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                iconStart={
                  <Call variant="Bold" size={20} color={COLORS.primary} />
                }
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />

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
        </VStack>

        <Button onPress={handleSubmit(onSubmit)} className="mt-8">
          Đăng ký
        </Button>

        <Text className="mt-4 text-center font-tregular">
          Đã có tài khoản?{" "}
          <Link href="/(auth)/sign-in" className="font-tmedium text-primary">
            Đăng nhập
          </Link>
        </Text>
      </View>
    </Container>
  )
}

export default SignUpScreen
