import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { HStack, VStack } from "@/components/global/atoms"
import { ReviewCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { sampleReviewsData } from "@/constants/reviews"

import { ReviewOverview } from "../../consultants"

interface ReviewTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const ReviewTab = ({ onLoading, onOverlayLoading }: ReviewTabProps) => {
  const router = useRouter()

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

  const handleViewReviews = () => {
    router.push("/reviews")
  }

  return (
    <View>
      <VStack gap={20}>
        <VStack className="px-2">
          <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

          <HStack className="-mb-2 items-center justify-between">
            <HStack className="items-end">
              <Text className="font-tbold text-3xl text-primary">
                {totalReviews}
              </Text>
              <Text className="mb-1 font-tmedium text-base text-secondary">
                đánh giá
              </Text>
            </HStack>

            <Text className="font-tmedium text-primary">
              {`${averageRating.toString()} / 5.0`}
            </Text>
          </HStack>
        </VStack>

        <ReviewOverview
          totalReviews={totalReviews}
          averageRating={averageRating}
          ratingData={ratingData}
          showSection={false}
        />
      </VStack>

      <Section
        label="Tất cả đánh giá"
        actionText="Xem tất cả"
        onPress={handleViewReviews}
      />

      <VStack gap={12}>
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
