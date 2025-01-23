import React from "react"

import { FlatList, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import {
  Button,
  Container,
  Content,
  HStack,
  VStack
} from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import ExerciseCard from "@/components/global/molecules/ExerciseCard"
import { Header } from "@/components/global/organisms"

import { sampleWorkoutData } from "@/constants/workouts"

function WorkoutDetailsScreen() {
  const { workoutId } = useLocalSearchParams() as {
    workoutId: string
  }

  console.log(workoutId)

  const workoutData = sampleWorkoutData

  const handleViewExercise = (exerciseId: string) => {
    console.log(exerciseId)
  }

  return (
    <Container>
      <Header back label="Chi tiết" />

      <Content className="mt-2">
        <VStack gap={10}>
          <Text className="font-tbold text-3xl text-primary">
            {workoutData.name}
          </Text>

          <VStack>
            <Text className="font-tmedium text-sm text-secondary">
              {workoutData.totalExercise} bài tập • {workoutData.totalDuration}{" "}
              phút • {workoutData.totalCaloriesBurned} kcal
            </Text>

            <Text className="font-tregular text-base text-secondary">
              {workoutData.description}
            </Text>
          </VStack>
        </VStack>

        <FlatList
          data={workoutData.items || []}
          keyExtractor={(item) => item.exerciseId}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeader className="mt-2" />}
          renderItem={({ item }) => (
            <ExerciseCard
              key={item.exerciseId}
              name={item.name}
              duration={item.duration}
              caloriesBurned={item.caloriesBurned}
              instructions={item.instructions}
              onPress={() => handleViewExercise(item.exerciseId)}
            />
          )}
          ListEmptyComponent={() => (
            <ErrorDisplay
              imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
              title="Không có bài tập"
              description="Bạn chưa có bài tập nào. Hãy thêm các bài tập để cải thiện sức khỏe và đạt được mục tiêu đặt ra"
              marginTop={24}
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>

      <Button size="lg" className="bottom-4">
        Hoàn thành
      </Button>
    </Container>
  )
}

export default WorkoutDetailsScreen
