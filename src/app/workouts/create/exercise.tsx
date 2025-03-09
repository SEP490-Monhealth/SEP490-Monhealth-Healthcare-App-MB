import React, { useEffect, useState } from "react"

import { Text, View } from "react-native"

import { Control, FieldValues } from "react-hook-form"

import { ScrollArea, VStack } from "@/components/global/atoms"

import { ExerciseCard } from "@/components/local/workouts"

import { sampleExercisesData } from "@/constants/exercises"

import {
  useWorkoutStore,
  useExerciseItemsStore
} from "@/stores/workoutStore"

interface SetupInformationProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
  openSheet: (type: "exercise", exerciseId?: string) => void
}

function ExerciseWorkout({
  control,
  errors,
  openSheet
}: SetupInformationProps) {
  const exerciseData = sampleExercisesData

  const { exercises, updateField } = useWorkoutStore()
  const { exercisesSelected } = useExerciseItemsStore()

  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({})

  const onPressExercise = (exerciseId: string) => {
    const selectedExercise = exerciseData.find(
      (exercise) => exercise.exerciseId === exerciseId
    )

    if (selectedExercise) {
      const durationValue = inputValues[exerciseId] || 0
      const repsValue = inputValues[exerciseId] || 0

      if (durationValue === 0 && repsValue === 0) {
        return
      }

      const existingExerciseIndex = exercises.findIndex(
        (exercise) => exercise.exerciseId === exerciseId
      )

      const selectedExerciseData = exercisesSelected.find(
        (exercise) => exercise.exerciseId === exerciseId
      )

      if (!selectedExerciseData) {
        return
      }

      const exerciseType = selectedExerciseData?.exerciseType ?? "duration"

      if (existingExerciseIndex !== -1) {
        const updatedExercises = exercises.filter(
          (exercise) => exercise.exerciseId !== exerciseId
        )
        updateField("exercises", updatedExercises)
      } else {
        let newExercise = {}

        if (exerciseType === "duration") {
          newExercise = {
            exerciseId: selectedExercise.exerciseId,
            duration: durationValue,
            reps: 0
          }
        } else if (exerciseType === "reps") {
          newExercise = {
            exerciseId: selectedExercise.exerciseId,
            duration: 0,
            reps: repsValue
          }
        }

        const updatedExercises = [...exercises, newExercise]
        updateField("exercises", updatedExercises)
      }
    }
  }

  useEffect(() => {
    exercisesSelected.forEach((exerciseSelected) => {
      const existingExerciseIndex = exercises.findIndex(
        (exercise) => exercise.exerciseId === exerciseSelected.exerciseId
      )

      if (!exerciseSelected) {
        return
      }

      if (existingExerciseIndex !== -1) {
        const updatedExercises = [...exercises]
        const exerciseType = exerciseSelected?.exerciseType ?? "duration"

        if (exerciseType === "duration") {
          updatedExercises[existingExerciseIndex] = {
            ...updatedExercises[existingExerciseIndex],
            duration: inputValues[exerciseSelected.exerciseId] || 0,
            reps: 0
          }
        } else if (exerciseType === "reps") {
          updatedExercises[existingExerciseIndex] = {
            ...updatedExercises[existingExerciseIndex],
            duration: 0,
            reps: inputValues[exerciseSelected.exerciseId] || 0
          }
        }

        updateField("exercises", updatedExercises)
      }
    })
  }, [exercisesSelected, inputValues])

  const handleSetInputValue = (exerciseId: string, value: number) => {
    const selectedExercise = exercisesSelected.find(
      (exercise) => exercise.exerciseId === exerciseId
    )

    if (selectedExercise) {
      let { exerciseType } = selectedExercise

      if (!exerciseType) {
        exerciseType = "duration"
      }
      setInputValues((prevValues) => ({
        ...prevValues,
        [exerciseId]: value
      }))

      if (exerciseType === "reps") {
      } else if (exerciseType === "duration") {
      }
    }
  }

  return (
    <>
      <Text className="font-tregular text-destructive">
        {errors.exercises?.message}
      </Text>
      <View className="h-2" />

      <ScrollArea>
        <VStack className="pb-40">
          {exerciseData.map((exercise) => (
            <View key={exercise.exerciseId} className="mb-4 mt-10">
              <ExerciseCard
                exerciseId={exercise.exerciseId}
                name={exercise.name}
                control={control}
                inputValue={inputValues[exercise.exerciseId] || 0}
                onPress={() => onPressExercise(exercise.exerciseId)}
                onPressSelect={() => openSheet("exercise", exercise.exerciseId)}
                onInputChange={handleSetInputValue}
              />
            </View>
          ))}
        </VStack>
      </ScrollArea>
    </>
  )
}

export default ExerciseWorkout
