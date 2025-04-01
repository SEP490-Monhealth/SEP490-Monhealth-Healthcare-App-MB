import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { Star, StarHalf } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { formatTimeAgo } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

import { Card, HStack, VStack } from "../atoms"

interface ReviewCardProps {
  name: string
  avatarUrl: string | undefined
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
  const [imgError, setImgError] = useState(false)

  return (
    <Card activeOpacity={1} hasImage>
      <VStack gap={8}>
        <HStack center gap={12}>
          {imgError || !avatarUrl ? (
            <View className="h-14 w-14 rounded-xl border border-border">
              <Text className="font-tbold text-2xl text-secondary">
                {getInitials(name)}
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: avatarUrl }}
              className="h-14 w-14 rounded-xl border border-border"
              onError={() => setImgError(true)}
            />
          )}

          <View className="flex-1 gap-1">
            <HStack center className="justify-between">
              <Text className="font-tmedium text-base text-primary">
                {name}
              </Text>

              <Text className="font-tregular text-sm text-secondary">
                {formatTimeAgo(time)}
              </Text>
            </HStack>

            <HStack center>
              {Array.from({ length: 5 })
                .map((_, index) => {
                  const starValue = index + 1

                  if (rating >= starValue) {
                    return (
                      <Star
                        key={index}
                        size={14}
                        fill={COLORS.PRIMARY.lemon}
                        color={COLORS.PRIMARY.lemon}
                      />
                    )
                  } else if (rating >= starValue - 0.5) {
                    return (
                      <StarHalf
                        key={index}
                        size={14}
                        fill={COLORS.PRIMARY.lemon}
                        color={COLORS.PRIMARY.lemon}
                      />
                    )
                  }
                  return null
                })
                .filter(Boolean)}
              <Text className="font-tmedium text-sm text-accent">
                {`(${rating.toFixed(1)})`}
              </Text>
            </HStack>
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
