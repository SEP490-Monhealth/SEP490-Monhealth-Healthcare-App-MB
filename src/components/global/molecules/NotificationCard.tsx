import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { formatTimeAgo } from "@/utils/formatters"

import { Card, HStack } from "../atoms"

interface NotificationCardProps {
  title: string
  content: string
  timestamp: string
  isRead?: boolean
  onPress?: () => void
}

export const NotificationCard = ({
  title,
  content,
  timestamp,
  isRead = false,
  onPress
}: NotificationCardProps) => {
  return (
    <Card onPress={onPress}>
      <HStack center gap={12}>
        <TouchableOpacity
          activeOpacity={1}
          className="h-12 w-12 items-center justify-center rounded-full bg-muted"
        >
          <Image
            source={require("../../../../public/icons/notification.png")}
            style={{ width: 24, height: 24 }}
          />

          {!isRead && (
            <View className="absolute right-3 top-2.5 h-3 w-3 rounded-full bg-destructive" />
          )}
        </TouchableOpacity>

        <View className="flex-1">
          <HStack center gap={12} className="justify-between">
            <Text
              className="flex-1 font-tmedium text-base text-primary"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>

            <Text className="font-tregular text-sm text-secondary">
              {formatTimeAgo(timestamp)}
            </Text>
          </HStack>

          <Text
            className="mt-1 font-tregular text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {content}
          </Text>
        </View>
      </HStack>
    </Card>
  )
}
