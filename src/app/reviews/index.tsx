import React from "react"

import { Text, View } from "react-native"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { ReviewCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { sampleReviewsData } from "@/constants/reviews"

import { LoadingScreen } from "../loading"

function ReviewScreen() {
  const reviewsData = sampleReviewsData

  const handleViewReview = (reviewId: string) => {
    console.log("Review nè:", reviewId)
  }

  if (!reviewsData) return <LoadingScreen />
  return (
    <Container>
      <Header back label="Đánh giá" />
      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20} className="mt-4">
            {reviewsData.reviews.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                avatarUrl={review.avatarUrl}
                rating={review.rating}
                comment={review.comment}
                createdAt={review.createdAt}
                onPress={() => handleViewReview(review.reviewId)}
              />
            ))}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ReviewScreen
