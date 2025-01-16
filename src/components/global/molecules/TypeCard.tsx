import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"

import { Card, HStack, VStack } from "../atoms"

interface TypeCardProps {
  name: string
  image: any
  totalExercises: number
  durationRanger: string
  totalCaloriesBurned: number
  onPress?: () => void
}

export const TypeCard = ({
  name,
  image,
  durationRanger,
  totalExercises,
  totalCaloriesBurned,
  onPress
}: TypeCardProps) => {
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
              {durationRanger} phút • {totalExercises} bài tập • ~
              {totalCaloriesBurned} kcal/phút
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Card>
  )
}
