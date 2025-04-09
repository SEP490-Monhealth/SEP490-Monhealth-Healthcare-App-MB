import React, { useEffect, useState } from "react"

import { ActivityIndicator, ScrollView, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { VStack } from "@/components/global/atoms"
import { ListFooter, ReviewCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetReviewsByConsultantId } from "@/hooks/useReview"

import { ReviewType } from "@/schemas/reviewSchema"

import { ReviewOverview } from "./ReviewOverview"

export const ReviewTab = () => {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const [reviewsData, setReviewsData] = useState<ReviewType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)

  const limit = 5

  const { data, isLoading } = useGetReviewsByConsultantId(
    consultantId,
    page,
    limit
  )

  useEffect(() => {
    if (data?.reviews) {
      setReviewsData((prev) => [...prev, ...data.reviews])
      setHasMore(page * limit < data.totalItems)
    }
  }, [data])

  const loadMoreData = () => {
    if (!hasMore || isLoadingMore) return

    setIsLoadingMore(true)
    setPage((prevPage) => prevPage + 1)
    setIsLoadingMore(false)
  }

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
      loadMoreData()
    }
  }

  const totalReviews = reviewsData.length
  const totalRating = reviewsData.reduce(
    (sum, review) => sum + review.rating,
    0
  )
  const averageRating =
    totalReviews > 0 ? parseFloat((totalRating / totalReviews).toFixed(1)) : 0

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

  if (reviewsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <VStack gap={12} className="mt-2">
      <ReviewOverview
        totalReviews={totalReviews}
        averageRating={averageRating}
        ratingData={ratingData}
      />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Section label="Tất cả đánh giá" margin={false} />

        <VStack gap={12}>
          {reviewsData.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.member.fullName}
              avatarUrl={review.member.avatarUrl || ""}
              rating={review.rating}
              comment={review.comment}
              time={review.updatedAt}
            />
          ))}
        </VStack>

        {isLoadingMore && (
          <ListFooter>
            <ActivityIndicator color={COLORS.primary} />
          </ListFooter>
        )}
      </ScrollView>
    </VStack>
  )
}
