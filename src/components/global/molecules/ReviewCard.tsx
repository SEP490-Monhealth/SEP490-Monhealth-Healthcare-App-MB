import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { Star1 } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { formatTimeAgo } from "@/utils/formatters"

import { HStack, VStack } from "../atoms"

interface ReviewCardProps {
  name: string
  avatarUrl: string
  rating: number
  comment: string
  time: string
  onPress?: () => void
}

export const ReviewCard = ({
  name,
  avatarUrl,
  rating,
  comment,
  time,
  onPress
}: ReviewCardProps) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <VStack>
        <HStack center gap={16}>
          <Image
            source={{ uri: avatarUrl }}
            className="h-14 w-14 rounded-xl border border-border"
          />

          <View className="flex-1 flex-row items-center justify-between">
            <VStack>
              <Text className="font-tmedium text-base text-primary">
                {name}
              </Text>

              <HStack>
                {[...Array(5)].map((_, index) => (
                  <Star1
                    key={index}
                    variant={index < rating ? "Bold" : "Outline"}
                    size="16"
                    color={COLORS.primary}
                  />
                ))}
              </HStack>
            </VStack>

            <Text className="font-tregular text-sm text-secondary">
              {formatTimeAgo(time)}
            </Text>
          </View>
        </HStack>

        <Text className="mt-2 font-tmedium text-sm text-secondary">
          {comment}
        </Text>
      </VStack>
    </TouchableOpacity>
  )
}
