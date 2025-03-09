import React from "react"

import { Image, Text, View } from "react-native"

import { formatTimeAgo } from "@/utils/formatters"

import { Card, HStack, VStack } from "../atoms"
import { RatingStars } from "./RatingStars"

interface ReviewCardProps {
  name: string
  avatarUrl: string
  rating: number
  comment: string
  time: string
}

export const ReviewCard = ({
  name,
  avatarUrl,
  rating,
  comment,
  time
}: ReviewCardProps) => {
  return (
    <Card activeOpacity={1} hasImage>
      <VStack gap={8}>
        <HStack center gap={12}>
          <Image
            source={{ uri: avatarUrl }}
            className="h-14 w-14 rounded-xl border border-border"
          />

          <View className="flex-1 gap-1">
            <HStack center className="justify-between">
              <Text className="font-tmedium text-base text-primary">
                {name}
              </Text>

              <Text className="font-tregular text-sm text-secondary">
                {formatTimeAgo(time)}
              </Text>
            </HStack>

            <RatingStars rating={rating} showRating />
          </View>
        </HStack>

        <Text
          className="font-tregular text-sm text-secondary"
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {comment}
        </Text>
      </VStack>
    </Card>
  )
}
