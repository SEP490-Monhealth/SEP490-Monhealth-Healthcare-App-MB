import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { toFixed } from "@/utils/formatters"

import { Card, CardHeader, Checkbox, HStack, VStack } from "../atoms"

interface ActivityCardProps {
  name: string
  durationMinutes: number
  caloriesBurned: number
  isCompleted: boolean
  isDefault: boolean
  onPress?: () => void
  onCheckboxChange?: (value: boolean) => void
}

export const ActivityCard = ({
  name,
  durationMinutes,
  caloriesBurned,
  isCompleted,
  isDefault,
  onPress,
  onCheckboxChange
}: ActivityCardProps) => {
  const handlePress = () => {
    if (onCheckboxChange) {
      onCheckboxChange(!isCompleted)
    }
  }

  return (
    <Card onPress={handlePress}>
      <HStack className="w-full items-center justify-between">
        <HStack center gap={12} onPress={onPress}>
          <TouchableOpacity
            activeOpacity={1}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
          >
            <Image
              source={require("../../../../public/icons/activity.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <VStack gap={0}>
            <HStack center gap={8}>
              <CardHeader label={name} />
            </HStack>

            <Text className="font-tmedium text-sm text-accent">
              {toFixed(caloriesBurned)} kcal • {durationMinutes ?? 0} phút
            </Text>
          </VStack>
        </HStack>

        {isDefault ? (
          <ChevronRight size={20} color={COLORS.primary} />
        ) : (
          <Checkbox checked={isCompleted} onCheckChange={onCheckboxChange} />
        )}
      </HStack>
    </Card>
  )
}
