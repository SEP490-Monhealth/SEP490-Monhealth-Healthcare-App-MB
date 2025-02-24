import React, { useRef, useState } from "react"

import { Keyboard, Text } from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Button,
  Container,
  Content,
  ScrollArea,
  Sheet,
  SheetRefProps,
  Toggle,
  VStack
} from "@/components/global/atoms"
import { ExerciseCard } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { TypeWorkoutEnum } from "@/constants/enums"

import {
  useGetExerciseById,
  useGetExercisesByWorkoutId
} from "@/hooks/useExercise"
import { useGetWorkoutById } from "@/hooks/useWorkout"

import { toFixed } from "@/utils/formatters"

function WorkoutDetailsScreen() {
  const SheetRef = useRef<SheetRefProps>(null)

  const { workoutId } = useLocalSearchParams() as { workoutId: string }

  const [isWarmup, setIsWarmup] = useState<boolean>(true)
  const [selectedExercise, setSelectedExercise] = useState<string | undefined>(
    ""
  )

  const { data: workoutData, isLoading: isWorkoutLoading } =
    useGetWorkoutById(workoutId)
  const { data: exercisesData, isLoading: isExercisesLoading } =
    useGetExercisesByWorkoutId(workoutId)
  const { data: exerciseData, isLoading: isExerciseLoading } =
    useGetExerciseById(selectedExercise)

  const warmupRounds = 2
  const workoutRounds = 3

  // const sheetHeight = 400

  const sheetHeight = 540

  const totalWarmupDuration = 100
  // exercisesData?.warmup.reduce((acc, exercise) => {
  //   let duration = 0

  //   if (exercise.type === 0) {
  //     duration = exercise.duration || 0
  //   } else if (exercise.type === 1) {
  //     duration = (exercise.reps || 0) * 2
  //   }

  //   return acc + duration
  // }, 0) || 0

  const totalWorkoutDuration = 200
  // exercisesData?.workout.reduce((acc, exercise) => {
  //   let duration = 0

  //   if (exercise.type === 0) {
  //     duration = exercise.duration || 0
  //   } else if (exercise.type === 1) {
  //     duration = (exercise.reps || 0) * 2
  //   }

  //   return acc + duration
  // }, 0) || 0

  const totalWarmupMinutes = (totalWarmupDuration * warmupRounds) / 60
  const totalWorkoutMinutes = (totalWorkoutDuration * workoutRounds) / 60

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)

  const handleViewExercise = (exerciseId: string) => {
    setSelectedExercise(exerciseId)
    openSheet()
  }

  if (!workoutData || isWorkoutLoading || !exercisesData || isExercisesLoading)
    return <LoadingScreen />

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label={workoutData?.name} />

          <Content className="mt-2">
            <ScrollArea className="flex-1">
              <VStack>
                <Section label="Mô tả" margin={false} />

                <Text className="-mt-2 text-justify font-tregular text-base text-secondary">
                  {workoutData?.description}
                </Text>

                <Button className="mt-4">Bắt đầu</Button>

                {workoutData.type === TypeWorkoutEnum.Workout && (
                  <Section
                    label="Khởi động"
                    description={`${toFixed(totalWarmupMinutes, 1)} phút / ${warmupRounds} vòng`}
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
                )}

                <VStack gap={12}>
                  {isWarmup &&
                    exercisesData?.warmup.map((exercise, index) => (
                      <ExerciseCard
                        key={`${exercise.exerciseId}-${index}`}
                        name={exercise.name}
                        duration={exercise.duration}
                        reps={exercise.reps}
                        calories={exercise.caloriesPerMinute}
                        onPress={() => handleViewExercise(exercise.exerciseId)}
                      />
                    ))}

                  <Section
                    label="Bài tập"
                    margin={workoutData.type === TypeWorkoutEnum.Warmup}
                    description={`${toFixed(totalWorkoutMinutes, 1)} phút / ${workoutRounds} vòng`}
                  />

                  {exercisesData?.workout.map((exercise, index) => (
                    <ExerciseCard
                      key={`${exercise.exerciseId}-${index}`}
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

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          <VStack>
            <Section label="Hướng dẫn bài tập" margin={false} />

            <Text className="font-tregular text-base text-primary">
              {exerciseData?.instructions
                ?.split("\n")
                .map((line, index) => `${index + 1}. ${line}`)
                .join("\n")}
            </Text>
          </VStack>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default WorkoutDetailsScreen
