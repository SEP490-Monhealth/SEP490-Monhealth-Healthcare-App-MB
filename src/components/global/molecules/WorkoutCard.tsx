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
            className="flex h-16 w-16 items-center justify-center rounded-full bg-muted"
          >
            <Image source={image} style={{ width: 36, height: 36 }} />
          </TouchableOpacity>

          <VStack gap={0} className="ml-1">
            <Text className="font-tmedium text-lg text-primary">{name}</Text>
            <Text className="font-tmedium text-sm text-accent">
              {totalDuration} phút • {totalExercise} bài tập •{" "}
              {totalCaloriesBurned} kcal
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Card>
  )
}
