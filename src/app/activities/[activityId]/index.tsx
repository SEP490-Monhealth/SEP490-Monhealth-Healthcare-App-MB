import React, { useRef, useState } from "react"

import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback
} from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Button,
  Container,
  Content,
  ScrollArea,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { ExerciseCard } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { WorkoutTypeEnum } from "@/constants/enum/Workout"

import {
  useGetActivityById,
  useUpdateActivityStatus
} from "@/hooks/useActivity"
import {
  useGetExerciseById,
  useGetExercisesByWorkoutId
} from "@/hooks/useExercise"
import { useGetWorkoutById } from "@/hooks/useWorkout"

import { toFixed } from "@/utils/formatters"

function ActivityDetailsScreen() {
  const { activityId } = useLocalSearchParams<{ activityId: string }>()

  const SheetRef = useRef<SheetRefProps>(null)

  const [selectedExercise, setSelectedExercise] = useState<string | undefined>(
    ""
  )

  const { mutate: updateActivityStatus } = useUpdateActivityStatus()

  const { data: activityData, isLoading: isActivityLoading } =
    useGetActivityById(activityId)
  const { data: workoutData, isLoading: isWorkoutLoading } = useGetWorkoutById(
    activityData?.workoutId
  )
  const { data: exercisesData, isLoading: isExercisesLoading } =
    useGetExercisesByWorkoutId(activityData?.workoutId)
  const { data: exerciseData, isLoading: isExerciseLoading } =
    useGetExerciseById(selectedExercise)

  const warmupRounds = 2
  const workoutRounds = 3

  const sheetHeight = 400

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)

  const handleViewExercise = (exerciseId: string) => {
    setSelectedExercise(exerciseId)
    openSheet()
  }

  const handleCompleteActivity = async () => {
    if (!activityId) return
    await updateActivityStatus(activityId)
  }

  if (
    !activityData ||
    isActivityLoading ||
    !workoutData ||
    isWorkoutLoading ||
    !exercisesData ||
    isExercisesLoading
  )
    return <LoadingScreen />

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Hoạt động" />

          <Content className="mt-2">
            <ScrollArea className="flex-1">
              <VStack className="pb-12">
                <Section label="Mô tả" margin={false} />

                <Text className="-mt-2 text-justify font-tregular text-base text-secondary">
                  {workoutData?.description}
                </Text>

                <Button
                  disabled={activityData.isCompleted}
                  onPress={handleCompleteActivity}
                  className="mt-6"
                >
                  Hoàn thành
                </Button>

                {workoutData.type === WorkoutTypeEnum.Workout && (
                  <Section
                    label="Khởi động"
                    description={`${toFixed(exercisesData.warmupDuration)} phút / ${warmupRounds} vòng`}
                  />
                )}

                <VStack gap={12}>
                  {exercisesData?.warmup.map((exercise, index) => (
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
                    margin={workoutData.type === WorkoutTypeEnum.Warmup}
                    description={`${toFixed(exercisesData.workoutDuration)} phút / ${workoutRounds} vòng`}
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
          {isExerciseLoading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <VStack>
              <Section label="Hướng dẫn bài tập" margin={false} />

              <Text className="font-tregular text-base text-primary">
                {exerciseData?.instructions
                  ?.split("\n")
                  .map((line, index) => `${index + 1}. ${line}`)
                  .join("\n")}
              </Text>
            </VStack>
          )}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ActivityDetailsScreen
