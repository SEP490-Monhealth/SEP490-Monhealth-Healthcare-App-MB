import React from "react"

import { Text, View } from "react-native"

import { Star } from "lucide-react-native"

import { HStack, Progress, VStack } from "@/components/global/atoms"
import { ReviewCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { sampleReviewsData } from "@/constants/reviews"

export const ReviewTab = () => {
  const reviewsData = sampleReviewsData.reviews

  const totalReviews = reviewsData.length

  const ratingsCount: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  reviewsData.forEach((review) => {
    ratingsCount[review.rating] += 1
  })

  const ratingData = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percent:
      totalReviews > 0
        ? Math.round((ratingsCount[stars] / totalReviews) * 100)
        : 0
  }))

  return (
    <View className="mt-2">
      <Section
        label={`Điểm đánh giá (${totalReviews})`}
        actionText={sampleReviewsData.avgRating.toString()}
        margin={false}
      />

      <VStack gap={8}>
        {ratingData.map(({ stars, percent }) => (
          <HStack center key={stars} gap={12} className="justify-between">
            <HStack center gap={4} className="w-8">
              <Text className="font-tmedium text-base text-primary">
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
              className="-mb-1 flex-1"
            />

            <Text className="w-10 text-right font-tmedium text-base text-primary">
              {percent}%
            </Text>
          </HStack>
        ))}
      </VStack>

      <Section label="Tất cả đánh giá" />

      <VStack gap={16}>
        {reviewsData.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            avatarUrl={review.avatarUrl}
            rating={review.rating}
            comment={review.comment}
            time={review.updatedAt}
          />
        ))}
      </VStack>
    </View>
  )
}
