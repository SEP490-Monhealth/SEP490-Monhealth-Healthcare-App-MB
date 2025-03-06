import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { Check, Plus } from "lucide-react-native"
import { Control, Controller, FieldValues } from "react-hook-form"

import { HStack, Input, Select, VStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"

import { useCreateWorkoutStore } from "@/stores/workoutStore"

interface ExerciseCardProps {
  name: string
  exerciseId: string
  control: Control<FieldValues>
  inputValue: number
  onPress?: () => void
  onPressSelect?: () => void
  onInputChange: (exerciseId: string, value: number) => void
}

const exerciseOptions = [
  { label: "Thời gian", value: "duration" },
  { label: "Lần", value: "reps" }
]

export const ExerciseCard = ({
  name,
  exerciseId,
  control,
  inputValue,
  onPress,
  onPressSelect,
  onInputChange
}: ExerciseCardProps) => {
  const [isOpenValue, setIsOpenValue] = useState<boolean>(false)
  const [typeExercise, setTypeExercise] = useState<string>("duration")

  const { exercises, updateField } = useCreateWorkoutStore()

  const isExerciseAdded = exercises.some(
    (exercise) => exercise.exerciseId === exerciseId
  )

  const exercise = exercises.find(
    (exercise) => exercise.exerciseId === exerciseId
  )

  const valueFilter = exercise ? exercise.duration : inputValue

  const handleOpen = () => {
    setIsOpenValue(!isOpenValue)
  }

  const handleSetValue = (value: number) => {
    onInputChange(exerciseId, value)
    const updatedExercises = exercises.map((exercise) =>
      exercise.exerciseId === exerciseId
        ? {
            ...exercise,
            [typeExercise]: value
          }
        : exercise
    )
    updateField("exercises", updatedExercises)
  }

  return (
    <View
      className={`rounded-2xl border-2 px-4 py-6 ${
        isExerciseAdded ? "border-primary" : "border-border"
      } bg-card`}
    >
      <TouchableOpacity onPress={handleOpen}>
        <HStack center className="justify-between">
          <Text className="font-tmedium text-lg text-primary">{name}</Text>
          <IconButton
            size="sm"
            icon={
              isExerciseAdded ? (
                <Check size={16} strokeWidth={2.5} color={COLORS.primary} />
              ) : (
                <Plus size={18} strokeWidth={2.3} color={COLORS.secondary} />
              )
            }
            onPress={onPress}
          />
        </HStack>
      </TouchableOpacity>

      {isOpenValue ? (
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
            render={({ field: { onChange } }) => (
              <Input
                value={valueFilter ? valueFilter.toString() : "0"}
                placeholder="Nhập giá trị"
                endIcon={
                  <Text className="font-tregular text-sm text-accent">
                    {typeExercise === "duration" ? "giây" : "lần"}
                  </Text>
                }
                alwaysShowEndIcon
                onChangeText={(text) => {
                  const numericValue = parseFloat(text) || 0
                  onChange(numericValue)
                  handleSetValue(numericValue)
                }}
                keyboardType="numeric"
              />
            )}
          />
        </VStack>
      ) : null}
    </View>
  )
}
