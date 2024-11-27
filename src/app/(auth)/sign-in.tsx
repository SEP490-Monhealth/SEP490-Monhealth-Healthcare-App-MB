import React, { useState } from "react"

import { Text, View } from "react-native"

import { Link, useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Add, Eye, EyeSlash, Lock1, Sms } from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import { Button, Input, VStack } from "@/components/global/atoms"

import { LoginUserType, loginUserSchema } from "@/schemas/userSchema"

function SignInScreen() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(true)

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
    <VStack gap={60} className="px-5 py-16">
      <Add
        size="36"
        color="#334155"
        style={{ transform: [{ rotate: "45deg" }] }}
        onPress={handleBack}
      />

      <View>
        <Text className="mb-2 font-nbold text-3xl text-primary">Đăng Nhập</Text>
        <Text className="text-xl text-typography-description">
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
                iconStart={<Sms variant="Bold" size={20} color="#334155" />}
                keyboardType="email-address"
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
                onChangeText={onChange}
                placeholder="Nhập mật khẩu"
                secureTextEntry={showPassword}
                iconStart={<Lock1 variant="Bold" size={20} color="#334155" />}
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

        <Link
          href="(auth)/forgot-password"
          className="mt-2 w-fit text-right font-nsemibold text-primary"
        >
          Quên mật khẩu
        </Link>

        <Button
          variant="primary"
          size="md"
          onPress={handleSubmit(onSubmit)}
          className="mt-8"
        >
          Đăng Nhập
        </Button>

        <Text className="mt-4 text-center font-nregular">
          Chưa có tài khoản?{" "}
          <Link href="/(auth)/sign-up" className="font-nsemibold text-primary">
            Đăng ký
          </Link>
        </Text>
      </View>
    </VStack>
  )
}

export default SignInScreen
