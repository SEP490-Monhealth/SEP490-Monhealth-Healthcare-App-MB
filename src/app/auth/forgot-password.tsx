import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Call } from "iconsax-react-native"
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

import { PhoneNumberType, phoneNumberSchema } from "@/schemas/userSchema"

function ForgotPasswordScreen() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PhoneNumberType>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: "0792766979"
    }
  })

  const onSubmit = (data: PhoneNumberType) => {
    console.log(data)
    router.push("/auth/otp-verification")
  }

  return (
    <Container>
      <Content className="mt-2">
        <VStack gap={40}>
          <Header back />

          <View>
            <Text className="mb-2 font-tbold text-3xl text-primary">
              Quên Mật Khẩu
            </Text>
            <Text className="font-tregular text-xl text-accent">
              Xác nhận số điện thoại của bạn để tiếp tục quá trình khôi phục mật
              khẩu
            </Text>

            <View className="mt-8">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    label="Số điện thoại"
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
            </View>

            <Button onPress={handleSubmit(onSubmit)} className="mt-8">
              Gửi mã
            </Button>
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default ForgotPasswordScreen
