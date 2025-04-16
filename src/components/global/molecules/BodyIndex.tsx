import React from "react"

import { Text } from "react-native"

import { Card, HStack, VStack } from "../atoms"

interface BodyIndexProps {
  height: number
  weight: number
  gender: string
}

export const BodyIndex = ({ height, weight, gender }: BodyIndexProps) => {
  return (
    <Card className="bg-background">
      <HStack className="justify-between">
        <VStack center gap={2}>
          <Text className="font-tmedium text-sm text-accent">Giới tính</Text>
          <Text className="font-tbold text-lg text-primary">{gender}</Text>
        </VStack>

        <VStack center gap={2}>
          <Text className="font-tmedium text-sm text-accent">Chiều cao</Text>
          <Text className="font-tbold text-lg text-primary">{height} cm</Text>
        </VStack>

        <VStack center gap={2}>
          <Text className="font-tmedium text-sm text-accent">Cân nặng</Text>
          <Text className="font-tbold text-lg text-primary">{weight} kg</Text>
        </VStack>
      </HStack>
    </Card>
  )
}
