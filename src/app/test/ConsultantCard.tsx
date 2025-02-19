import React from "react"

import { Image, Text, View } from "react-native"

import { CalendarTick, MedalStar, Star1 } from "iconsax-react-native"

import { Button, Card, HStack, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

import { formatVietnameseDate } from "@/utils/formatters"

interface ConsultantCardProps {
  name: string
  avatarUrl: any
  expertise: string
  experience: number
  rating: number
  schedule: string
  onPress?: () => void
  onChatStart?: () => void
}

export const ConsultantCard = ({
  name,
  avatarUrl,
  expertise,
  experience,
  rating,
  schedule,
  onPress,
  onChatStart
}: ConsultantCardProps) => {
  return (
    <Card onPress={onPress}>
      <VStack gap={10}>
        <HStack center gap={12}>
          <Image
            source={{ uri: avatarUrl }}
            className="h-full w-20 rounded-xl border border-border"
          />

          <View className="flex-1 flex-col">
            <Text className="font-tmedium text-xl text-primary">{name}</Text>
            <Text
              className="font-tmedium text-base text-secondary"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {expertise}
            </Text>

            <HStack gap={10} className="mt-1">
              <HStack center>
                <MedalStar variant="Bold" size="20" color={COLORS.secondary} />
                <Text className="font-tmedium text-base text-secondary">
                  {experience} năm
                </Text>
              </HStack>

              <HStack center>
                <Star1 variant="Bold" size="20" color={COLORS.secondary} />
                <Text className="font-tmedium text-base text-secondary">
                  {rating}
                </Text>
              </HStack>
            </HStack>
          </View>
        </HStack>

        <View className="mt-2 border border-border"></View>

        <HStack center className="justify-between">
          <HStack center>
            <CalendarTick variant="Bold" size="20" color={COLORS.secondary} />
            <Text className="font-tmedium text-base text-secondary">
              {formatVietnameseDate(schedule)}
            </Text>
          </HStack>

          <Button size="sm" onPress={onChatStart}>
            Nhắn tin
          </Button>
        </HStack>
      </VStack>
    </Card>
  )
}
