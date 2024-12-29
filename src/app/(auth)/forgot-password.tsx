import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Call } from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import { Button, Container, Input, VStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

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

  const handleBack = () => {
    router.push("/(auth)/sign-in")
  }

  const onSubmit = (data: PhoneNumberType) => {
    console.log(data)
    router.push("/(auth)/reset-password")
  }

  return (
    <Container className="gap-16">
      <IconButton
        icon={<ArrowLeft size={24} color={COLORS.primary} />}
        onPress={handleBack}
      />

      <View>
        <Text className="mb-2 font-tbold text-3xl text-primary">
          Quên Mật Khẩu
        </Text>
        <Text className="font-tregular text-xl text-secondary">
          Xác nhận số điện thoại của bạn để tiếp tục quá trình khôi phục mật
          khẩu
        </Text>

        <VStack gap={12} className="mt-8">
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
        </VStack>

        <Button onPress={handleSubmit(onSubmit)} className="mt-8">
          Gửi mã
        </Button>
      </View>
    </Container>
  )
}

export default ForgotPasswordScreen
