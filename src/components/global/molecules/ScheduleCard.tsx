import React from "react"

import { Text, View } from "react-native"

import { Vibe } from "iconsax-react-native"

import { VStack } from "../atoms"

interface ScheduleCardProps {
  customer: string
  time: string
  notes?: string
}

export const ScheduleCard = ({ customer, time, notes }: ScheduleCardProps) => {
  return (
    <View className="flex-1 flex-row gap-4">
      <VStack center>
        <View className="rounded-full bg-secondary px-2 py-2">
          <Vibe size="28" color="#FFF" />
        </View>

        <View className="mt-2 h-24 w-1 rounded-lg border border-border bg-border"></View>
      </VStack>

      <View className="flex-1">
        <Text className="ml-1 mt-3 font-tmedium text-sm text-accent">
          {time}
        </Text>

        <View className="mt-2 rounded-2xl bg-gray-200 px-4 py-4">
          <VStack>
            <Text className="font-tmedium text-lg text-primary">
              {customer}
            </Text>
            <Text
              className="font-tmedium text-sm text-accent"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {notes}
            </Text>
          </VStack>
        </View>
      </View>
    </View>
  )
}
