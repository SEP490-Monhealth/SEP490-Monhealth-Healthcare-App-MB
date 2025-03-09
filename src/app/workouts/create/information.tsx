import React from "react"

import { Text } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import {
  Card,
  CardHeader,
  Chip,
  HStack,
  Input,
  ScrollArea,
  Select,
  VStack
} from "@/components/global/atoms"

import { sampleCategoriesData } from "@/constants/categories"

import { useWorkoutStore } from "@/stores/workoutStore"

import { getDifficultyLevelLabel } from "@/utils/helpers"

interface WorkoutInformationProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
  openSheet: (type: "category" | "difficultyLevel") => void
}

function WorkoutInformation({
  control,
  errors,
  setValue,
  openSheet
}: WorkoutInformationProps) {
  const { category, difficultyLevel, isPublic, updateField } = useWorkoutStore()

  const handleVisibilitySelect = (value: boolean) => {
    updateField("isPublic", value)
    setValue("isPublic", value)
  }

  const selectedCategory = sampleCategoriesData.find(
    (item) => item.categoryId === category
  )?.name

  return (
    <ScrollArea>
      <VStack gap={32} className="pb-40">
        <VStack gap={12}>
          <Select
            label="Danh mục"
            defaultValue="VD: Toàn thân"
            value={selectedCategory}
            onPress={() => openSheet("category")}
            errorMessage={errors.category?.message}
          />

          <Select
            label="Mức độ"
            defaultValue="VD: Trung bình"
            value={
              difficultyLevel ? getDifficultyLevelLabel(difficultyLevel) : ""
            }
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
                placeholder="VD: Bài tập giúp cải thiện sức bền..."
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
              <CardHeader label="Bạn muốn lưu món ăn này như thế nào?" />

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

export default WorkoutInformation
