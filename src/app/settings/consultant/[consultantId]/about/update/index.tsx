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
  ScrollArea,
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

  if (!consultantData) return <LoadingScreen />

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateConsultantType>({
    resolver: zodResolver(updateConsultantSchema),
    defaultValues: {
      bio: consultantData.bio,
      experience: consultantData.experience,
      meetUrl: consultantData.meetUrl
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
        <ScrollArea>
          <VStack gap={12} className="pb-20">
            <Controller
              name="bio"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Mô tả ngắn"
                  onChangeText={onChange}
                  isMultiline
                  numberOfLines={12}
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
        </ScrollArea>
      </Content>

      <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
        Cập nhật
      </Button>
    </Container>
  )
}

export default ConsultantAboutUpdateScreen
