import React, { useState } from "react"

import { Text } from "react-native"

import { Controller } from "react-hook-form"

import { Card, Chip, HStack, Input, VStack } from "@/components/global/atoms"

interface CreateInformationProps {
  control: any
  errors: any
  setValue: any
}

export const CreateInformation = ({
  control,
  errors,
  setValue
}: CreateInformationProps) => {
  const [selectedType, setSelectedType] = useState("User")

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setValue("type", type)
  }

  return (
    <VStack gap={40} className="mt-2 h-full px-6 pb-12">
      <VStack gap={12}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              placeholder="Nhập tên món ăn"
              onChangeText={onChange}
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
              placeholder="Nhập mô tả món ăn"
              onChangeText={onChange}
              keyboardType="default"
              isMultiline
              numberOfLines={4}
              errorMessage={errors.description?.message}
            />
          )}
        />
      </VStack>

      <Card>
        <VStack gap={12}>
          <VStack>
            <Text className="font-tbold text-base text-primary">
              Bạn muốn chia sẻ thông tin món ăn này?
            </Text>
            <Text className="font-tmedium text-sm text-accent">
              Chọn "Công khai" để đóng góp dữ liệu hoặc "Cá nhân" để giữ riêng
              tư.
            </Text>
          </VStack>

          <HStack gap={8} className="justify-end">
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
      </Card>
    </VStack>
  )
}
