import React from "react"

import { Text } from "react-native"

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

import {
  CreateExerciseType,
  createExerciseSchema
} from "@/schemas/exerciseSchema"

function ExerciseCreateScreen() {
  const { user } = useAuth()
  const userId = user?.userId

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
    console.log(exerciseData)
  }

  console.log(errors)

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
                  placeholder="Nhập tên bài tập"
                  onChangeText={onChange}
                  keyboardType="default"
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
                  placeholder="Mô tả về bài tập"
                  onChangeText={(text) => onChange(text)}
                  keyboardType="default"
                  isMultiline
                  numberOfLines={4}
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
                  placeholder="Calories đốt mỗi phút"
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

      <Button size="lg" onPress={handleSubmit(onSubmit)} className="">
        Tạo mới
      </Button>
    </Container>
  )
}

export default ExerciseCreateScreen
