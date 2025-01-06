import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { formatTimeAgo } from "@/utils/formatters"
import { getNotificationStyles } from "@/utils/helpers"

import { HStack } from "../atoms"

interface NotificationCardProps {
  title: string
  description: string
  type: string
  href: string
  status: boolean
  createdAt: string
  onPress?: () => void
  onReadChange?: (value: boolean) => void
}

export const NotificationCard = ({
  title,
  description,
  type,
  href,
  status,
  createdAt,
  onPress,
  onReadChange
}: NotificationCardProps) => {
  const { imageSource, bgColorClass } = getNotificationStyles(type)

  const handlePress = () => {
    if (onReadChange) {
      onReadChange(!status)
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      className="rounded-2xl border-2 border-border px-4 py-6"
    >
      <HStack gap={10} onPress={onPress}>
        <View
          className={`h-16 w-16 overflow-hidden rounded-xl px-4 py-4 ${bgColorClass}`}
        >
          <Image source={imageSource} className="h-full w-full object-cover" />
        </View>

        <View className="flex-1 flex-col">
          <View className="flex-1 flex-row items-center justify-between">
            <Text
              className="w-2/3 font-tmedium text-lg text-primary"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text className="w-1/3 text-right font-tregular text-sm text-accent">
              {formatTimeAgo(createdAt)}
            </Text>
          </View>

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="font-tregular text-sm leading-relaxed text-secondary"
          >
            {description}
          </Text>
        </View>
      </HStack>
    </TouchableOpacity>
  )
}
