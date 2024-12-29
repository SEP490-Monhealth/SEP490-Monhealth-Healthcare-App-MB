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
    <VStack gap={32} className="mt-2 h-full px-6 pb-12">
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
              canClearText
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
              canClearText
              errorMessage={errors.description?.message}
            />
          )}
        />
      </VStack>

      <Card activeOpacity={1}>
        <VStack gap={12}>
          <VStack>
            <Text className="font-tbold text-lg text-primary">
              Bạn muốn lưu món ăn này như thế nào?
            </Text>
            <Text className="font-tregular text-sm text-accent">
              Chọn "Công khai" để chia sẻ món ăn với cộng đồng hoặc "Cá nhân" để
              lưu trữ riêng tư cho bạn.
            </Text>
          </VStack>

          <HStack gap={12} className="justify-end">
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
