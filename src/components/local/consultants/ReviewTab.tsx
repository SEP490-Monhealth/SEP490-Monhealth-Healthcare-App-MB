import React from "react"

import { View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { ReviewCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { sampleReviewsData } from "@/constants/reviews"

import { ReviewOverview } from "./ReviewOverview"

export const ReviewTab = () => {
  const reviewsData = sampleReviewsData.reviews

  const totalReviews = reviewsData.length
  const averageRating = sampleReviewsData.avgRating

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
    <VStack gap={12} className="mt-2">
      <ReviewOverview
        totalReviews={totalReviews}
        averageRating={averageRating}
        ratingData={ratingData}
      />

      <View>
        <Section label="Tất cả đánh giá" margin={false} />

        <VStack gap={20}>
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
    </VStack>
  )
}
