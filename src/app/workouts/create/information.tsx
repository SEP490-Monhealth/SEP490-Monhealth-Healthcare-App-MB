import React from "react"

import { Text } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import {
  Card,
  Chip,
  HStack,
  Input,
  ScrollArea,
  Select,
  VStack
} from "@/components/global/atoms"

import { sampleCategoriesData } from "@/constants/categories"
import { DifficultyLevelEnum } from "@/constants/enum/DifficultyLevel"

import { useCreateWorkoutStore } from "@/stores/workoutStore"

interface SetupInformationProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
  openSheet: (type: "category" | "difficultyLevel") => void
}

const difficultyLevelLabels: Record<DifficultyLevelEnum, string> = {
  [DifficultyLevelEnum.Easy]: "Mức dễ",
  [DifficultyLevelEnum.Medium]: "Mức trung bình",
  [DifficultyLevelEnum.Hard]: "Mức khó"
}

const InformationWorkout = ({
  control,
  errors,
  setValue,
  openSheet
}: SetupInformationProps) => {
  const { category, difficultyLevel, isPublic, updateField } =
    useCreateWorkoutStore()

  const handleVisibilitySelect = (value: boolean) => {
    updateField("isPublic", value)
    setValue("isPublic", value)
  }

  const selectedCategory =
    sampleCategoriesData.find((item) => item.categoryId === category)?.name ||
    "Phân loại"

  return (
    <ScrollArea>
      <VStack gap={32} className="pb-40">
        <VStack gap={12}>
          <Select
            label="Phân loại bài tập"
            value={selectedCategory}
            defaultValue="Phân loại"
            onPress={() => openSheet("category")}
            errorMessage={errors.category?.message}
          />

          {/* Hiển thị difficultyLevel được chọn */}
          <Select
            label="Mức độ"
            value={difficultyLevelLabels[difficultyLevel] || "Độ khó"}
            defaultValue="Độ khó"
            onPress={() => openSheet("difficultyLevel")}
            errorMessage={errors.difficultyLevel?.message}
          />

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                label="Tên bài tập"
                placeholder="VD: Luyện tập sức bền"
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
                value={value ? value.toString() : ""}
                label="Mô tả"
                placeholder="VD: Bài tập giúp cải thiện sức bền,..."
                onChangeText={(text) => onChange(text)}
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
              <Text className="font-tmedium text-lg text-primary">
                Bạn muốn lưu bài tập này như thế nào?
              </Text>
              <Text className="font-tregular text-sm text-accent">
                Chọn "Công khai" để chia sẻ bài tập với cộng đồng hoặc "Cá nhân"
                để lưu trữ riêng tư cho bạn.
              </Text>
            </VStack>
            <HStack gap={12} className="justify-end">
              <Chip
                label="Cá nhân"
                selected={!isPublic}
                onPress={() => handleVisibilitySelect(false)}
              />
              <Chip
                label="Công khai"
                selected={isPublic}
                onPress={() => handleVisibilitySelect(true)}
              />
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </ScrollArea>
  )
}

export default InformationWorkout
