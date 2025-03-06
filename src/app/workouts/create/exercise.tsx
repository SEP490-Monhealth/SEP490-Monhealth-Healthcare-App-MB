import React, { useState } from "react"

import { View } from "react-native"

import { Control, FieldValues } from "react-hook-form"

import { ScrollArea, VStack } from "@/components/global/atoms"

import { ExerciseCard } from "@/components/local/workouts"

import { sampleExercisesData } from "@/constants/exercises"

import { useCreateWorkoutStore } from "@/stores/workoutStore"

interface SetupInformationProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
  openSheet: (type: "exercise") => void
}

function ExerciseWorkout({ control, openSheet }: SetupInformationProps) {
  const exerciseData = sampleExercisesData

  const { exercises, updateField } = useCreateWorkoutStore()

  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({})

  const onPressExercise = (exerciseId: string) => {
    console.log("Pressed exercise ID:", exerciseId)

    const selectedExercise = exerciseData.find(
      (exercise) => exercise.exerciseId === exerciseId
    )

    if (selectedExercise) {
      const existingExerciseIndex = exercises.findIndex(
        (exercise) => exercise.exerciseId === exerciseId
      )

      if (existingExerciseIndex !== -1) {
        const updatedExercises = exercises.filter(
          (exercise) => exercise.exerciseId !== exerciseId
        )
        updateField("exercises", updatedExercises)
      } else {
        const newExercise = {
          exerciseId: selectedExercise.exerciseId,
          duration: inputValues[exerciseId] || 0,
          reps: 0
        }
        const updatedExercises = [...exercises, newExercise]
        updateField("exercises", updatedExercises)
      }
    }
  }

  const handleSetInputValue = (exerciseId: string, value: number) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [exerciseId]: value
    }))
  }

  return (
    <ScrollArea>
      <VStack className="pb-40">
        {exerciseData.map((exercise) => (
          <View key={exercise.exerciseId} className="mb-4">
            <ExerciseCard
              exerciseId={exercise.exerciseId}
              name={exercise.name}
              control={control}
              inputValue={inputValues[exercise.exerciseId] || 0}
              onPress={() => onPressExercise(exercise.exerciseId)}
              onPressSelect={() => openSheet("exercise")}
              onInputChange={handleSetInputValue}
            />
          </View>
        ))}
      </VStack>
    </ScrollArea>
  )
}

export default ExerciseWorkout
