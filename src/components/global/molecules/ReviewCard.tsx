import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { Fontisto } from "@expo/vector-icons"

import { COLORS } from "@/constants/color"

import { formatTimeAgo } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

import { Card, HStack, VStack } from "../atoms"

interface ReviewCardProps {
  name: string
  avatarUrl?: string
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
  const [imgError, setImgError] = useState<boolean>(false)

  return (
    <Card activeOpacity={1} hasImage>
      <VStack gap={8}>
        <HStack center gap={12}>
          {imgError || !avatarUrl ? (
            <View className="flex h-14 w-14 items-center justify-center rounded-xl border border-muted bg-border">
              <Text className="font-tbold text-lg text-primary">
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
                      <Fontisto
                        key={index}
                        name="star"
                        size={14}
                        fill={COLORS.PRIMARY.lemon}
                        color={COLORS.PRIMARY.lemon}
                      />
                    )
                  } else if (rating >= starValue - 0.5) {
                    return (
                      <Fontisto
                        key={index}
                        name="star-half"
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
                {`(${rating.toFixed()})`}
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
