import React from "react"

import { Keyboard, Text } from "react-native"

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

function CreateExerciseScreen() {
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
    Keyboard.dismiss()

    console.log(exerciseData)
  }
  return (
    <Container>
      <Header back label="Tạo bài tập" />
      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={40}>
            <VStack gap={8}>
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
                    placeholder="Mô tả về bài tập của bạn"
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
                    placeholder="Kcal đốt mỗi phút"
                    onChangeText={(text) => onChange(parseFloat(text) || 0)}
                    keyboardType="numeric"
                    endIcon={
                      <Text className="font-tregular text-sm text-accent">
                        kcal
                      </Text>
                    }
                    errorMessage={errors.caloriesPerMinute?.message}
                  />
                )}
              />
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
      <Button size="lg" onPress={handleSubmit(onSubmit)}>
        Tạo mới
      </Button>
    </Container>
  )
}

export default CreateExerciseScreen
