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
import { sampleExercisesData } from "@/constants/exercises"
import { sampleWorkoutsData } from "@/constants/workouts"

import { useGetWorkoutById } from "@/hooks/useWorkout"

function WorkoutDetailsScreen() {
  const { workoutId } = useLocalSearchParams() as { workoutId: string }

  const { data: workoutData, isLoading } = useGetWorkoutById(workoutId)

  const exercisesData = sampleExercisesData

  const [isWarmup, setIsWarmup] = useState(true)

  const warmupRounds = 2
  const workoutRounds = 3

  const totalDuration = exercisesData.reduce((total, exercise) => {
    return total + (exercise.duration || 0)
  }, 0)

  const totalMinutes = Math.floor(totalDuration / 60) * workoutRounds

  const handleViewExercise = (exerciseId: string) => console.log(exerciseId)

  if (!workoutData || isLoading) return <LoadingScreen />

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
                description={`8 phút / ${warmupRounds} vòng`}
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
                exercisesData.map((exercise) => (
                  <ExerciseCard
                    key={exercise.exerciseId}
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
                description={`${totalMinutes} phút / 3 vòng`}
              />

              {exercisesData.map((exercise) => (
                <ExerciseCard
                  key={exercise.exerciseId}
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
