import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { toFixed } from "@/utils/formatters"

import { Card } from "../atoms"

interface ActivityCardProps {
  name: string
  durationMinutes: number
  caloriesBurned: number
  onPress?: () => void
}

export const ActivityCard = ({
  name,
  durationMinutes,
  caloriesBurned,
  onPress
}: ActivityCardProps) => {
  return (
    <Card onPress={onPress} className="flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          source={require("../../../../public/icons/activities/dumbbell.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="font-tmedium text-base text-primary">{name}</Text>

        <Text className="font-tmedium text-sm text-accent">
          {toFixed(caloriesBurned)} kcal • {durationMinutes ?? 0} phút
        </Text>
      </View>
    </Card>
  )
}
