import React, { useEffect } from "react"

import { Keyboard } from "react-native"

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

import { useAuth } from "@/contexts/AuthContext"

import { useGetUserById, useUpdateUser } from "@/hooks/useUser"

import { UpdateUserType, updateUserSchema } from "@/schemas/userSchema"

import { whoIAm } from "@/services/authService"

function UserInformationUpdateScreen() {
  const router = useRouter()
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { setUser } = useAuth()

  const { mutate: updateUser } = useUpdateUser()

  const { data: userData, isLoading: isUserLoading } = useGetUserById(userId)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: ""
    }
  })

  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber
      })
    }
  }, [userData, reset])

  if (!userData || isUserLoading) return <LoadingScreen />

  const onSubmit = async (data: UpdateUserType) => {
    Keyboard.dismiss()

    updateUser(
      { userId, updateData: data },
      {
        onSuccess: async () => {
          const updatedUser = await whoIAm()
          setUser(updatedUser)
          router.back()
        }
      }
    )
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Cập nhật" />

      <Content className="mt-2">
        <VStack gap={32} className="pb-20">
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

          <Button onPress={handleSubmit(onSubmit)}>Cập nhật</Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default UserInformationUpdateScreen
