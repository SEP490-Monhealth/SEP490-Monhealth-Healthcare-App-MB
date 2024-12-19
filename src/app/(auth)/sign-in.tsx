import React, { useState } from "react"

import { Text, View } from "react-native"

import { Link, useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Eye, EyeSlash, Lock1, Sms } from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import { Button, Container, Input, VStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/appConstants"

import { LoginUserType, loginUserSchema } from "@/schemas/userSchema"

function SignInScreen() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "asd@gmail.com",
      password: "123As@"
    }
  })

  const handleBack = () => {
    router.replace("/(onboarding)/welcome")
  }

  const onSubmit = (data: LoginUserType) => {
    console.log(data)
    router.replace("/(tabs)/home")
  }

  return (
    <Container className="gap-16">
      <IconButton
        icon={<ArrowLeft size={24} color={COLORS.primary} />}
        onPress={handleBack}
      />

      <View>
        <Text className="mb-2 font-tbold text-4xl text-primary">
          Đăng Nhập
        </Text>
        <Text className="font-tregular text-xl text-secondary">
          Đăng nhập để tiếp tục theo dõi sức khỏe của bạn
        </Text>

        <VStack gap={12} className="mt-8">
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

        <Link
          href="/(auth)/forgot-password"
          className="mt-2 w-fit text-right font-tmedium text-primary"
        >
          Quên mật khẩu
        </Link>

        <Button onPress={handleSubmit(onSubmit)} className="mt-8">
          Đăng nhập
        </Button>

        <Text className="mt-4 text-center font-tregular">
          Chưa có tài khoản?{" "}
          <Link href="/(auth)/sign-up" className="font-tmedium text-primary">
            Đăng ký
          </Link>
        </Text>
      </View>
    </Container>
  )
}

export default SignInScreen
