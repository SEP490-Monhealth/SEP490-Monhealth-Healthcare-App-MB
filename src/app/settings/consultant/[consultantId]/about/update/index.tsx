import React, { useEffect } from "react"

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
  useUpdateConsultant
} from "@/hooks/useConsultant"

import {
  UpdateConsultantType,
  updateConsultantSchema
} from "@/schemas/consultantSchema"

function ConsultantAboutUpdateScreen() {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { mutate: updateConsultant } = useUpdateConsultant()

  const { data: consultantData } = useGetConsultantById(consultantId)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateConsultantType>({
    resolver: zodResolver(updateConsultantSchema),
    defaultValues: {
      bio: "",
      experience: 0,
      meetUrl: ""
    }
  })

  useEffect(() => {
    if (consultantData) {
      reset({
        bio: consultantData.bio,
        experience: consultantData.experience,
        meetUrl: consultantData.meetUrl
      })
    }
  }, [consultantData, reset])

  if (!consultantData) return <LoadingScreen />

  const onSubmit = async (data: UpdateConsultantType) => {
    // console.log(JSON.stringify(data, null, 2))

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
        <VStack gap={32} className="pb-20">
          <VStack gap={12}>
            <Controller
              name="bio"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Mô tả ngắn"
                  onChangeText={onChange}
                  isMultiline
                  numberOfLines={8}
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
                    <Text className="font-tregular text-sm text-accent">
                      năm
                    </Text>
                  }
                  alwaysShowEndIcon
                  canClearText
                  errorMessage={errors.experience?.message}
                />
              )}
            />

            <Controller
              name="meetUrl"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Link phòng họp"
                  placeholder="VD: https://meet.google.com/abc-defg-hij"
                  onChangeText={onChange}
                  keyboardType="default"
                  canClearText
                  errorMessage={errors.meetUrl?.message}
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

export default ConsultantAboutUpdateScreen
