import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { ArrowSwapHorizontal } from "iconsax-react-native"
import { Control, Controller, FieldValues } from "react-hook-form"

import { HStack, Input, Select, VStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"

interface ExerciseCardProps {
  name: string
  exerciseId: string
  control: Control<FieldValues>
  onPress?: () => void
  onPressSelect?: () => void
}

const exerciseOptions = [
  { label: "Thời gian", value: "duration" },
  { label: "Lần", value: "reps" }
]

export const ExerciseCard = ({
  name,
  exerciseId,
  control,
  onPress,
  onPressSelect
}: ExerciseCardProps) => {
  const [isOpenValue, setIsOpenValue] = useState<boolean>(false)
  const [typeExercise, setTypeExercise] = useState<string>("duration")

  const handleOpen = () => {
    setIsOpenValue(!isOpenValue)
  }

  return (
    <View className="rounded-2xl border border-border bg-card px-4 py-6">
      <TouchableOpacity onPress={handleOpen}>
        <HStack center className="justify-between">
          <Text className="font-tmedium text-lg text-primary">{name}</Text>
          <IconButton
            size="sm"
            icon={<ArrowSwapHorizontal size={16} color={COLORS.primary} />}
            onPress={onPress}
          />
        </HStack>
      </TouchableOpacity>

      {isOpenValue && (
        <VStack gap={10} className="mt-4">
          <Select
            defaultValue="Chọn loại"
            value={
              exerciseOptions.find((opt) => opt.value === typeExercise)
                ?.label || "Chọn loại"
            }
            onPress={onPressSelect || (() => {})}
          />

          <Controller
            name={`${exerciseId}.${typeExercise}`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value ? value.toString() : ""}
                placeholder="Nhập giá trị"
                endIcon={
                  <Text className="font-tregular text-sm text-accent">
                    {typeExercise === "duration" ? "giây" : "lần"}
                  </Text>
                }
                alwaysShowEndIcon
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                keyboardType="numeric"
              />
            )}
          />
        </VStack>
      )}
    </View>
  )
}
