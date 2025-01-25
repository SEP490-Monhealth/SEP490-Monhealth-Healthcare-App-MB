import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"

import { Card, HStack, VStack } from "../atoms"

interface WorkoutCardProps {
  name: string
  image: any
  totalExercise: number
  totalDuration: number
  totalCaloriesBurned: number
  onPress?: () => void
}

export const WorkoutCard = ({
  name,
  image,
  totalExercise,
  totalDuration,
  totalCaloriesBurned,
  onPress
}: WorkoutCardProps) => {
  return (
    <Card onPress={onPress}>
      <HStack className="w-full items-center justify-between">
        <HStack gap={12} center onPress={onPress}>
          <TouchableOpacity
            activeOpacity={1}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
          >
            <Image source={image} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>

          <VStack gap={0}>
            <Text className="font-tmedium text-lg text-primary">{name}</Text>
            <Text className="font-tmedium text-sm text-accent">
              {totalCaloriesBurned} kcal - {totalDuration} phút -{" "}
              {totalExercise} bài tập
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Card>
  )
}
