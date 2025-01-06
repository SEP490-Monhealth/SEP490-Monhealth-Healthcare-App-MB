import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { formatTimeAgo } from "@/utils/formatters"
import { getNotificationStyles } from "@/utils/helpers"

import { HStack, VStack } from "../atoms"

interface NotificationCardProps {
  icon: any
  title: string
  message: string
  type: string
  action_url: string
  status: boolean
  createdAt: string
  onPress?: () => void
  onReadChange?: (value: boolean) => void
}

export const NotificationCard = ({
  icon,
  title,
  message,
  type,
  action_url,
  status,
  createdAt,
  onPress,
  onReadChange
}: NotificationCardProps) => {
  const { borderColorClass, textColorClass, typeLabel } =
    getNotificationStyles(type)

  const handlePress = () => {
    if (onReadChange) {
      onReadChange(!status)
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      className="border-b-[1px] border-border py-4"
    >
      <HStack gap={10} onPress={onPress}>
        <Image
          source={typeof icon === "string" ? { uri: icon } : icon}
          className="h-14 w-14 rounded-xl object-cover"
        />

        <VStack>
          <Text className="font-tmedium text-xl text-primary">{title}</Text>
          <Text className="font-tregular text-sm leading-relaxed text-primary">
            {message}
          </Text>

          <HStack center className="mt-2 flex justify-between">
            <Text className="font-tbold text-sm leading-relaxed text-secondary">
              {formatTimeAgo(createdAt)}
            </Text>

            <View className={`rounded-xl border px-2 py-1 ${borderColorClass}`}>
              <Text className={`text-sm ${textColorClass}`}>{typeLabel}</Text>
            </View>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}
