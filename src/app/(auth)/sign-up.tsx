import React, { useState } from "react"

import { Text, View } from "react-native"

import { Link, useRouter } from "expo-router"

import { COLORS } from "@/constants/appConstants"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Add,
  Call,
  Eye,
  EyeSlash,
  Lock1,
  Profile,
  Sms,
  User
} from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import { Button, Input, VStack } from "@/components/global/atoms"

import { RegisterUserType, registerUserSchema } from "@/schemas/userSchema"

function SignUpScreen() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(true)

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
    router.replace("/(onboarding)/welcome")
  }

  const onSubmit = (data: RegisterUserType) => {
    console.log(data)
  }

  return (
    <VStack gap={60} className="bg-background px-5 py-16">
      <Add
        size="36"
        color={COLORS.primary}
        style={{ transform: [{ rotate: "45deg" }] }}
        onPress={handleBack}
      />

      <View>
        <Text className="mb-2 font-nbold text-3xl text-primary">Đăng Ký</Text>
        <Text className="text-xl text-typography-description">
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
                iconStart={
                  <Profile variant="Bold" size={20} color={COLORS.primary} />
                }
                keyboardType="default"
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
                iconStart={
                  <Sms variant="Bold" size={20} color={COLORS.primary} />
                }
                keyboardType="email-address"
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
                iconStart={
                  <Call variant="Bold" size={20} color={COLORS.primary} />
                }
                keyboardType="phone-pad"
                errorMessage={errors.phoneNumber?.message}
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
                secureTextEntry={showPassword}
                iconStart={
                  <Lock1 variant="Bold" size={20} color={COLORS.primary} />
                }
                iconEnd={
                  showPassword ? (
                    <EyeSlash variant="Bold" size={20} color="#888" />
                  ) : (
                    <Eye variant="Bold" size={20} color="#FF7043" />
                  )
                }
                toggleSecureTextEntry={() => setShowPassword(!showPassword)}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </VStack>

        <Button
          variant="primary"
          size="md"
          onPress={handleSubmit(onSubmit)}
          className="mt-8"
        >
          Đăng Ký
        </Button>

        <Text className="mt-4 text-center font-nregular">
          Đã có tài khoản?{" "}
          <Link href="/(auth)/sign-in" className="font-nsemibold text-primary">
            Đăng nhập
          </Link>
        </Text>
      </View>
    </VStack>
  )
}

export default SignUpScreen
