import React, { useState } from "react"

import { Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Button,
  Container,
  Content,
  ScrollArea,
  Toggle,
  VStack
} from "@/components/global/atoms"
import ExerciseCard from "@/components/global/molecules/ExerciseCard"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useGetExercisesByWorkoutId } from "@/hooks/useExercise"
import { useGetWorkoutById } from "@/hooks/useWorkout"

function WorkoutDetailsScreen() {
  const { workoutId } = useLocalSearchParams() as { workoutId: string }

  console.log(workoutId)

  const { data: workoutData, isLoading: isWorkoutLoading } =
    useGetWorkoutById(workoutId)
  const { data: exercisesData, isLoading: isExercisesLoading } =
    useGetExercisesByWorkoutId(workoutId)

  const [isWarmup, setIsWarmup] = useState(true)

  const warmupRounds = 2
  const workoutRounds = 3

  const totalWarmupDuration =
    exercisesData?.warmup.reduce((acc, exercise) => {
      let duration = 0

      if (exercise.type === 0) {
        duration = exercise.duration || 0
      } else if (exercise.type === 1) {
        duration = (exercise.reps || 0) * 2
      }

      return acc + duration
    }, 0) || 0

  const totalWorkoutDuration =
    exercisesData?.workout.reduce((acc, exercise) => {
      let duration = 0

      if (exercise.type === 0) {
        duration = exercise.duration || 0
      } else if (exercise.type === 1) {
        duration = (exercise.reps || 0) * 2
      }

      return acc + duration
    }, 0) || 0

  const totalWarmupMinutes = (totalWarmupDuration * warmupRounds) / 60
  const totalWorkoutMinutes = (totalWorkoutDuration * workoutRounds) / 60

  console.log("total warmup duration:", totalWarmupDuration / 60)
  console.log("total workout duration:", totalWorkoutDuration / 60)

  const handleViewExercise = (exerciseId: string) => console.log(exerciseId)

  if (!workoutData || isWorkoutLoading || !exercisesData || isExercisesLoading)
    return <LoadingScreen />

  return (
    <Container>
      <Header back label={workoutData?.name} />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack>
            <Section label="Mô tả" margin={false} />
            <Text className="-mt-2 font-tregular text-base text-secondary">
              {workoutData?.description}
            </Text>

            <Button className="mt-4">Bắt đầu</Button>

            <View className="flex">
              <Section
                label="Warm up"
                description={`${totalWarmupMinutes} phút / ${warmupRounds} vòng`}
                action={
                  <Toggle
                    value={isWarmup}
                    onValueChange={setIsWarmup}
                    trackColor={{
                      false: COLORS.border,
                      true: COLORS.border
                    }}
                    thumbColorFalse="#fff"
                    thumbColorTrue={COLORS.primary}
                  />
                }
              />
            </View>

            <VStack gap={12}>
              {isWarmup &&
                exercisesData?.warmup.map((exercise, index) => (
                  <ExerciseCard
                    key={`${exercise.exerciseId}-${index}`}
                    type={exercise.type}
                    name={exercise.name}
                    duration={exercise.duration}
                    reps={exercise.reps}
                    calories={exercise.caloriesPerMinute}
                    onPress={() => handleViewExercise(exercise.exerciseId)}
                  />
                ))}

              <Section
                label="Workout"
                margin={false}
                description={`${totalWorkoutMinutes} phút / ${workoutRounds} vòng`}
              />

              {exercisesData?.workout.map((exercise, index) => (
                <ExerciseCard
                  key={`${exercise.exerciseId}-${index}`}
                  type={exercise.type}
                  name={exercise.name}
                  duration={exercise.duration}
                  reps={exercise.reps}
                  calories={exercise.caloriesPerMinute}
                  onPress={() => handleViewExercise(exercise.exerciseId)}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default WorkoutDetailsScreen
