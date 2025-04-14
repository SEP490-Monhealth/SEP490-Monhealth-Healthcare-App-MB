import React from "react"

import { Text } from "react-native"

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

import {
  useGetConsultantById,
  useUpdateAboutConsultant
} from "@/hooks/useConsultant"

import {
  UpdateConsultantType,
  updateConsultantSchema
} from "@/schemas/consultantSchema"

function UpdateAboutConsultantScreen() {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { data: consultantData, isLoading } = useGetConsultantById(consultantId)

  const { mutate: updateConsultant } = useUpdateAboutConsultant()

  if (!consultantData || isLoading) return <LoadingScreen />

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateConsultantType>({
    resolver: zodResolver(updateConsultantSchema),
    defaultValues: {
      bio: consultantData.bio,
      experience: consultantData.experience
    }
  })

  const onSubmit = async (data: UpdateConsultantType) => {
    console.log(JSON.stringify(data, null, 2))

    updateConsultant(
      { consultantId, updatedData: data },
      {
        onSuccess: () => {
          router.back()
        }
      }
    )
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Cập nhật" />
      <Content className="mt-2">
        <VStack gap={12}>
          <Controller
            name="bio"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                label="Họ và tên"
                onChangeText={onChange}
                isMultiline
                numberOfLines={12}
                canClearText
                errorMessage={errors.bio?.message}
              />
            )}
          />

          <Controller
            name="experience"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value ? value.toString() : ""}
                label="Kinh nghiệm"
                placeholder="VD: 5"
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                keyboardType="numeric"
                endIcon={
                  <Text className="font-tregular text-sm text-accent">năm</Text>
                }
                alwaysShowEndIcon
                canClearText
                errorMessage={errors.experience?.message}
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

export default UpdateAboutConsultantScreen
