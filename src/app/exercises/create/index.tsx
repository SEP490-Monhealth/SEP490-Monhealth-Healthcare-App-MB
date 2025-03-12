import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

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

import { useAuth } from "@/contexts/AuthContext"

import { useCreateExercise } from "@/hooks/useExercise"

import {
  CreateExerciseType,
  createExerciseSchema
} from "@/schemas/exerciseSchema"

function ExerciseCreateScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { mutate: createExercise } = useCreateExercise()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateExerciseType>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      userId: userId,
      name: "",
      instructions: "",
      caloriesPerMinute: 0
    }
  })

  const onSubmit = async (exerciseData: CreateExerciseType) => {
    console.log(JSON.stringify(exerciseData, null, 2))

    createExercise(exerciseData, {
      onSuccess: () => {
        router.push("/exercises")
      }
    })
  }

  return (
    <Container>
      <Header back label="Tạo bài tập" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={12}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Tên bài tập"
                  placeholder="VD: Chạy bộ, đạp xe"
                  onChangeText={onChange}
                  canClearText
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="instructions"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value ? value.toString() : ""}
                  label="Hướng dẫn"
                  placeholder="VD: Đứng thẳng, chân mở rộng bằng vai,..."
                  onChangeText={(text) => onChange(text)}
                  isMultiline
                  numberOfLines={6}
                  canClearText
                  errorMessage={errors.instructions?.message}
                />
              )}
            />

            <Controller
              name="caloriesPerMinute"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value ? value.toString() : ""}
                  label="Calories đốt mỗi phút"
                  placeholder="VD: 5.5"
                  onChangeText={(text) => {
                    const formattedText = text.replace(",", ".")
                    if (
                      /^\d*\.?\d*$/.test(formattedText) ||
                      formattedText === ""
                    ) {
                      onChange(formattedText)
                    }
                  }}
                  keyboardType="decimal-pad"
                  endIcon={
                    <Text className="font-tregular text-sm text-accent">
                      kcal
                    </Text>
                  }
                  alwaysShowEndIcon
                  errorMessage={errors.caloriesPerMinute?.message}
                />
              )}
            />
          </VStack>
        </ScrollArea>
      </Content>

      <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
        Tạo mới
      </Button>
    </Container>
  )
}

export default ExerciseCreateScreen
