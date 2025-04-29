import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { formatDate, toFixed } from "@/utils/formatters"

import { Card } from "../atoms"

interface WeightCardProps {
  date: string
  weight: number
  height: number
  onPress: () => void
}

export const WeightCard = ({
  date,
  weight = 0,
  height = 0,
  onPress
}: WeightCardProps) => {
  return (
    <Card onPress={onPress} className="flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          source={require("../../../../public/icons/weight.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="font-tmedium text-base text-primary">
          {formatDate(date)}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {toFixed(weight, 0)} kg • {toFixed(height, 0)} cm
        </Text>
      </View>
    </Card>
  )
}
