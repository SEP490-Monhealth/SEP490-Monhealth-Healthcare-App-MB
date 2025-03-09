import React, { useEffect, useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { Check, Plus, SquareEqual } from "lucide-react-native"
import { Control, Controller, FieldValues } from "react-hook-form"

import {
  CardHeader,
  HStack,
  Input,
  Select,
  VStack
} from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"

import { useExerciseItemsStore, useWorkoutStore } from "@/stores/workoutStore"

const exerciseOptions = [
  { label: "Thời gian", value: "duration" },
  { label: "Lần", value: "reps" }
]

interface ExerciseItemsType {
  exerciseId: string
  exerciseType: string
}

interface ExerciseCardProps {
  name: string
  exerciseId: string
  control: Control<FieldValues>
  inputValue: number
  onPress?: () => void
  onPressSelect?: () => void
  onInputChange: (exerciseId: string, value: number) => void
}

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
  const [typeExercise, setTypeExercise] = useState<string>("")

  const { exercises, updateField } = useWorkoutStore()
  const { exercisesSelected } = useExerciseItemsStore()

  const selectedExercise = exercisesSelected.find(
    (exercise: ExerciseItemsType) => exercise.exerciseId === exerciseId
  )

  useEffect(() => {
    if (selectedExercise) {
      setTypeExercise(selectedExercise.exerciseType)
    }
  }, [selectedExercise])

  const isExerciseAdded = exercises.some(
    (exercise) => exercise.exerciseId === exerciseId
  )

  const exercise = exercises.find(
    (exercise) => exercise.exerciseId === exerciseId
  )

  const valueFilter = exercise
    ? exercise.duration !== 0
      ? exercise.duration
      : exercise.reps !== 0
        ? exercise.reps
        : inputValue
    : inputValue

  const handleOpen = () => {
    setIsOpenValue(!isOpenValue)
  }

  const handleSetValue = (value: number) => {
    onInputChange(exerciseId, value)

    if (typeExercise === "reps") {
      const updatedExercises = exercises.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? {
              ...exercise,
              reps: value
            }
          : exercise
      )
      updateField("exercises", updatedExercises)
    } else {
      const updatedExercises = exercises.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? {
              ...exercise,
              duration: value
            }
          : exercise
      )
      updateField("exercises", updatedExercises)
    }
  }

  const icon = isExerciseAdded ? (
    exercise?.reps === 0 && exercise?.duration === 0 ? (
      <SquareEqual size={18} strokeWidth={2.3} color={COLORS.secondary} />
    ) : (
      <Check size={16} strokeWidth={2.5} color={COLORS.primary} />
    )
  ) : (
    <Plus size={18} strokeWidth={2.3} color={COLORS.secondary} />
  )

  return (
    <View
      className={`rounded-2xl border-2 px-4 py-6 ${isExerciseAdded ? "border-primary" : "border-border"} bg-card`}
    >
      <TouchableOpacity onPress={handleOpen}>
        <HStack center className="justify-between">
          <CardHeader label={name} />

          <IconButton size="sm" icon={icon} onPress={onPress} />
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
