import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { Card, HStack, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"

import { RatingStars } from "./RatingStars"

interface ConsultantCardProps {
  name: string
  avatarUrl: string
  expertise: string
  experience: number
  rating: number
  onPress?: () => void
}

export const ConsultantCard = ({
  name,
  avatarUrl,
  expertise,
  experience,
  rating,
  onPress
}: ConsultantCardProps) => {
  const reviewsCount = 100

  return (
    <Card
      hasImage
      onPress={onPress}
      className="flex-row items-center justify-between"
    >
      <HStack center gap={16}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Image
            source={{ uri: avatarUrl }}
            className="h-20 w-20 rounded-2xl border border-border"
          />
        </TouchableOpacity>

        <VStack>
          <VStack gap={0}>
            <Text className="font-tmedium text-lg text-primary">{name}</Text>
            <Text className="font-tmedium text-sm text-accent">
              {expertise} • {experience} năm
            </Text>
          </VStack>

          <RatingStars rating={rating} count={reviewsCount} />
        </VStack>
      </HStack>

      <ChevronRight size={20} color={COLORS.primary} />
    </Card>
  )
}
