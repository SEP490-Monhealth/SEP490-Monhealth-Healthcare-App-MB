import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"

import { ChevronRight, Star, StarHalf } from "lucide-react-native"

import { Card, HStack, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"

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
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <Image source={{ uri: avatarUrl }} className="h-20 w-20 rounded-xl" />
        </TouchableOpacity>

        <VStack>
          <VStack gap={0}>
            <Text className="font-tmedium text-lg text-primary">{name}</Text>
            <Text className="font-tmedium text-sm text-accent">
              {expertise} • {experience} năm
            </Text>
          </VStack>

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
              ({reviewsCount})
            </Text>
          </HStack>
        </VStack>
      </HStack>

      <ChevronRight size={20} color={COLORS.primary} />
    </Card>
  )
}
