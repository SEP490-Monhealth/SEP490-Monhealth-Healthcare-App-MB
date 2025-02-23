import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { Star1 } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { formatTimeAgo } from "@/utils/formatters"

import { HStack, VStack } from "../atoms"

interface ReviewCardProps {
  name: string
  avatarUrl: any
  rating: number
  comment: string
  createdAt: string
  onPress?: () => void
}

export const ReviewCard = ({
  name,
  avatarUrl,
  rating,
  comment,
  createdAt,
  onPress
}: ReviewCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack gap={10}>
        <Image
          source={{ uri: avatarUrl }}
          className="h-14 w-14 rounded-xl border border-border"
        />

        <View className="flex-1">
          <HStack center className="justify-between">
            <Text className="font-tmedium text-base text-primary">{name}</Text>
            <HStack>
              {[...Array(5)].map((_, index) => (
                <Star1
                  key={index}
                  variant={index < rating ? "Bold" : "Outline"}
                  size="12"
                  color={COLORS.primary}
                />
              ))}
            </HStack>
          </HStack>

          <Text className="font-tregular text-sm text-secondary">
            {formatTimeAgo(createdAt)}
          </Text>

          <Text className="mt-2 font-tmedium text-sm text-secondary">
            {comment}
          </Text>
        </View>
      </HStack>
    </TouchableOpacity>
  )
}
