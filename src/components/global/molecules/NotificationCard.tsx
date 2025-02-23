import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { ICONS } from "@/constants/app"
import { COLORS } from "@/constants/color"

import { formatTimeAgo } from "@/utils/formatters"

import { Card, HStack } from "../atoms"

export type NotificationType = "reminder" | "suggestion" | "warning"

interface NotificationCardProps {
  type: NotificationType
  title: string
  description: string
  time: string
  href?: string
  status: boolean
  onPress?: () => void
  onReadChange?: (value: boolean) => void
}

export const NotificationCard = ({
  type,
  title,
  description,
  time,
  href = "",
  status,
  onPress,
  onReadChange
}: NotificationCardProps) => {
  const router = useRouter()

  const bgColor = COLORS.NOTIFICATIONS[type] || COLORS.accent
  const IconComponent =
    ICONS.NOTIFICATIONS[type] || ICONS.NOTIFICATIONS.reminder

  const handlePress = () => {
    if (href) router.push(href)
    if (onReadChange) onReadChange(!status)
    if (onPress) onPress()
  }

  return (
    <Card onPress={handlePress}>
      <HStack center gap={12}>
        <View className="rounded-xl p-4" style={{ backgroundColor: bgColor }}>
          <IconComponent variant="Bold" size={24} color="white" />
        </View>

        <View className="flex-1">
          <HStack center gap={12} className="justify-between">
            <Text
              className="flex-1 font-tmedium text-base text-primary"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text className="mr-1 font-tregular text-sm text-secondary">
              {formatTimeAgo(time)}
            </Text>
          </HStack>

          <Text
            className="mt-1 font-tregular text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        </View>
      </HStack>
    </Card>
  )
}
