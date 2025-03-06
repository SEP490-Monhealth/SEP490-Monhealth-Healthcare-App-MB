import React from "react"

import { Text, View } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import { ScrollArea, VStack } from "@/components/global/atoms"

import { ExerciseCard } from "@/components/local/workouts"

import { sampleExercisesData } from "@/constants/exercises"

import { useCreateWorkoutStore } from "@/stores/workoutStore"

// Import store

interface SetupInformationProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
  openSheet: (type: "exercise") => void
}

function ExerciseWorkout({
  control,
  errors,
  setValue,
  openSheet
}: SetupInformationProps) {
  const exerciseData = sampleExercisesData

  const { updateField } = useCreateWorkoutStore()

  const onPressExercise = (exerciseId: string) => {
    console.log("Pressed exercise ID:", exerciseId)

    const selectedExercise = exerciseData.find(
      (exercise) => exercise.exerciseId === exerciseId
    )

    if (selectedExercise) {
      const newExercise = {
        exerciseId: selectedExercise.exerciseId,
        duration: 0,
        reps: 0
      }
      updateField("exercises", newExercise, true)
    }
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
              onPress={() => onPressExercise(exercise.exerciseId)}
              onPressSelect={() => openSheet("exercise")}
            />
          </View>
        ))}
      </VStack>
    </ScrollArea>
  )
}

export default ExerciseWorkout
