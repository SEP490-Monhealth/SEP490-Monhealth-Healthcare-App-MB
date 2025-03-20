import React from "react"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useGetUserById, useUpdateUser } from "@/hooks/useUser"

import { UpdateUserType, updateUserSchema } from "@/schemas/userSchema"

function UpdateInformationScreen() {
  const router = useRouter()
  const { userId } = useLocalSearchParams() as { userId: string }

  // const { setUser } = useAuth()

  const { data: userData, isLoading: isUserLoading } = useGetUserById(userId)

  const { mutate: updateUser } = useUpdateUser()

  if (!userData || isUserLoading) return <LoadingScreen />

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber
    }
  })

  const onSubmit = async (data: UpdateUserType) => {
    updateUser(
      { userId, updateData: data },
      {
        onSuccess: () => {
          router.back()
        },
        onError: (error) => {
          console.error("Cập nhật thất bại:", error)
        }
      }
    )
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Cập nhật thông tin" />

      <Content className="mt-2">
        <VStack gap={12}>
          <Controller
            name="fullName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                label="Họ và tên"
                onChangeText={onChange}
                canClearText
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
                label="Email"
                onChangeText={onChange}
                canClearText
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
                label="Số điện thoại"
                onChangeText={onChange}
                keyboardType="phone-pad"
                canClearText
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />
        </VStack>
      </Content>

      <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
        Cập nhật
      </Button>
    </Container>
  )
}

export default UpdateInformationScreen
