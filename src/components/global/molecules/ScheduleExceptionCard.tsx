import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { formatDate } from "@/utils/formatters"

import { Card } from "../atoms"
import { IconButton } from "./IconButton"

interface ScheduleExceptionCardProps {
  date: string
  reason: string
  onPress?: () => void
}

export const ScheduleExceptionCard = ({
  date,
  reason,
  onPress
}: ScheduleExceptionCardProps) => {
  return (
    <Card className="flex-row items-center justify-between gap-4">
      <View className="flex flex-1 flex-row items-center">
        <TouchableOpacity
          activeOpacity={1}
          className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
        >
          <Image
            source={require("../../../../public/icons/schedules/exception.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="font-tmedium text-base text-primary">
            {formatDate(date)}
          </Text>

          <Text
            className="mt-1 text-justify font-tregular text-sm text-accent"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {reason}
          </Text>
        </View>
      </View>

      <IconButton
        size="sm"
        icon={<MoreHorizontal size={20} color={COLORS.primary} />}
        onPress={onPress}
      />
    </Card>
  )
}
