import React from "react"

import { Text, View } from "react-native"

import { Star } from "lucide-react-native"

import { HStack, Progress, VStack } from "@/components/global/atoms"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

interface ReviewOverviewProps {
  totalReviews: number
  averageRating: number
  ratingData: { stars: number; percent: number }[]
  showSection?: boolean
}

export const ReviewOverview = ({
  totalReviews,
  averageRating,
  ratingData,
  showSection = true
}: ReviewOverviewProps) => {
  return (
    <View>
      {showSection && (
        <Section
          label={`Điểm đánh giá (${totalReviews})`}
          actionText={`${averageRating.toFixed(1)} / 5.0`}
          margin={false}
        />
      )}

      <VStack gap={8}>
        {ratingData.map(({ stars, percent }) => (
          <HStack center key={stars} gap={12} className="justify-between">
            <HStack center gap={4} className="">
              <Text className="w-2.5 font-tmedium text-base text-primary">
                {stars}
              </Text>

              <Star
                size={14}
                fill={COLORS.PRIMARY.lemon}
                color={COLORS.PRIMARY.lemon}
              />
            </HStack>

            <Progress
              progress={percent}
              height={8}
              color={COLORS.PRIMARY.lemon}
              className="mt-1 flex-1"
            />

            <Text className="w-12 text-right font-tmedium text-base text-primary">
              {percent}%
            </Text>
          </HStack>
        ))}
      </VStack>
    </View>
  )
}
