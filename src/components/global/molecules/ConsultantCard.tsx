import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { Card, CardHeader, HStack, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"

import { getInitials } from "@/utils/helpers"

import { RatingStars } from "./RatingStars"

interface ConsultantCardProps {
  name: string
  avatarUrl?: string
  expertise: string
  experience: number
  ratingCount?: number
  averageRating?: number
  onPress?: () => void
}

export const ConsultantCard = ({
  name,
  avatarUrl,
  expertise,
  experience,
  ratingCount = 0,
  averageRating = 0,
  onPress
}: ConsultantCardProps) => {
  return (
    <Card
      hasImage
      onPress={onPress}
      className="flex-row items-center justify-between"
    >
      <HStack center gap={16}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              className="h-20 w-20 rounded-2xl border border-border"
            />
          ) : (
            <View className="flex h-20 w-20 items-center justify-center rounded-xl border border-muted bg-border">
              <Text className="font-tbold text-lg text-primary">
                {getInitials(name)}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <VStack>
          <VStack gap={0}>
            <CardHeader label={name} />

            <Text className="font-tmedium text-sm text-accent">
              {expertise} • KN {experience} năm
            </Text>
          </VStack>

          <RatingStars count={ratingCount} rating={averageRating} />
        </VStack>
      </HStack>

      <ChevronRight size={20} color={COLORS.primary} />
    </Card>
  )
}
