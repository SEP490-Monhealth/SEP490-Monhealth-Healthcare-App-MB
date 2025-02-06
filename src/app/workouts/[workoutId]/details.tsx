import React from "react"

import { Text } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import {
  Button,
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import ExerciseCard from "@/components/global/molecules/ExerciseCard"
import { Header, Section } from "@/components/global/organisms"

import { sampleWorkoutsData } from "@/constants/workouts"

function WorkoutDetailsScreen() {
  const router = useRouter()

  const { workoutId } = useLocalSearchParams() as { workoutId: string }

  const workoutData = sampleWorkoutsData

  const handleViewExercise = (exerciseId: string) => {
    console.log(exerciseId)
  }

  return (
    <Container>
      <Header back label={workoutData.name} />

      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack>
            <Section label="Mô tả" margin={false} />

            <Text className="-mt-2 font-tregular text-base text-secondary">
              {workoutData.description}
            </Text>

            <Button className="mt-4">Bắt đầu</Button>

            <Section label="Danh sách bài tập" />

            <VStack gap={12}>
              {workoutData.items.map((exercise) => (
                <ExerciseCard
                  key={exercise.exerciseId}
                  name={exercise.name}
                  duration={exercise.duration}
                  caloriesBurned={exercise.caloriesBurned}
                  difficulty={exercise.difficulty}
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
