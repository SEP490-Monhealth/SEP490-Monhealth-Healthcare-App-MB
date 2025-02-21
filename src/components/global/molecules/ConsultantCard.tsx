import React from "react"

import { Image, Text } from "react-native"

import { CalendarTick, MedalStar, Star1 } from "iconsax-react-native"

import { Button, Card, HStack, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"

import { formatVietnameseDate } from "@/utils/formatters"

interface ConsultantCardProps {
  name: string
  avatarUrl: any
  expertise: string
  experience: number
  rating: number
  schedule: string
  onPress?: () => void
  onChatPress?: () => void
}

export const ConsultantCard = ({
  name,
  avatarUrl,
  expertise,
  experience,
  rating,
  schedule,
  onPress,
  onChatPress
}: ConsultantCardProps) => {
  return (
    <Card activeOpacity={1} onPress={onPress}>
      <VStack gap={10}>
        <HStack center gap={12}>
          <Image
            source={{ uri: avatarUrl }}
            className="h-full w-20 rounded-xl border border-border"
          />

          <VStack gap={6}>
            <VStack gap={0}>
              <Text className="font-tmedium text-lg text-primary">{name}</Text>

              <Text
                className="font-tmedium text-sm text-accent"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {expertise}
              </Text>
            </VStack>

            <HStack gap={12}>
              <HStack center>
                <MedalStar variant="Bold" size="18" color={COLORS.primary} />
                <Text className="font-tregular text-base text-primary">
                  {experience} năm
                </Text>
              </HStack>

              <HStack center>
                <Star1 variant="Bold" size="18" color={COLORS.primary} />
                <Text className="font-tregular text-base text-primary">
                  {rating}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>

        <HStack center className="justify-between">
          <HStack center>
            <CalendarTick variant="Bold" size="20" color={COLORS.secondary} />
            <Text className="font-tmedium text-base text-secondary">
              {formatVietnameseDate(schedule)}
            </Text>
          </HStack>

          <Button size="sm" onPress={onChatPress}>
            Nhắn tin
          </Button>
        </HStack>
      </VStack>
    </Card>
  )
}
