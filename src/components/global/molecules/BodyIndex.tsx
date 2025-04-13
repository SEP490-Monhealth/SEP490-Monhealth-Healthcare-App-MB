import React from "react"

import { Text, View } from "react-native"

import { HStack } from "../atoms"

interface BodyIndexProps {
  height: number
  weight: number
  gender: string
}

export const BodyIndex = ({ height, weight, gender }: BodyIndexProps) => {
  return (
    <View className="rounded-lg bg-background px-6 py-2">
      <Text className="mb-2 font-tmedium text-base text-primary">
        Chỉ số cơ thể
      </Text>

      <HStack className="justify-between">
        <View className="items-center">
          <Text className="font-tmedium text-sm text-accent">Chiều cao</Text>
          <Text className="font-tbold text-lg text-primary">{height} cm</Text>
        </View>

        <View className="items-center">
          <Text className="font-tmedium text-sm text-accent">Cân nặng</Text>
          <Text className="font-tbold text-lg text-primary">{weight} kg</Text>
        </View>

        <View className="items-center">
          <Text className="font-tmedium text-sm text-accent">Giới tính</Text>
          <Text className="font-tbold text-lg text-primary">{gender}</Text>
        </View>
      </HStack>
    </View>
  )
}
