import React, { useState } from "react"

import { Keyboard, Text, TouchableWithoutFeedback } from "react-native"

import { router } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Card,
  Chip,
  Container,
  Content,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import {
  CreateFoodStep1Type,
  createFoodStep1Schema
} from "@/schemas/foodSchema"

function InformationFood() {
  const [selectedType, setSelectedType] = useState<string>("User")

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateFoodStep1Type>({
    resolver: zodResolver(createFoodStep1Schema),
    defaultValues: {
      userId: "1",
      type: "User",
      name: "",
      description: ""
    }
  })

  const onSubmit = (data: CreateFoodStep1Type) => {
    console.log(data)

    router.push("/foods/createStep2")
  }

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setValue("type", type)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header back title="Tạo món ăn" />
        <Content>
          <VStack gap={40}>
            <VStack gap={20}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Nhập tên món ăn"
                    keyboardType="default"
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Nhập mô tả món ăn"
                    keyboardType="default"
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </VStack>
            <VStack gap={10}>
              <Card>
                <Text className="font-tmedium text-lg text-primary">
                  Gửi dữ liệu thực phẩm vào cơ sở dữ liệu?
                </Text>
                <Text className="font-tmedium text-sm text-muted-foreground">
                  Bật tùy chọn này để đóng góp dữ liệu thực phẩm mới
                </Text>
              </Card>
              <HStack gap={10} className="flex justify-end">
                <Chip
                  label="Cá nhân"
                  selected={selectedType === "User"}
                  onPress={() => handleTypeSelect("User")}
                />
                <Chip
                  label="Công khai"
                  selected={selectedType === "Public"}
                  onPress={() => handleTypeSelect("Public")}
                />
              </HStack>
            </VStack>

            <Button size="lg" onPress={handleSubmit(onSubmit)}>
              Tiếp tục
            </Button>
          </VStack>
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default InformationFood
