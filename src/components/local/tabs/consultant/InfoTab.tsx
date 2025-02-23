import React, { useEffect } from "react"

import { Linking } from "react-native"
import { Text, View } from "react-native"

import { router, useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { Star1 } from "iconsax-react-native"

import { HStack, VStack } from "@/components/global/atoms"
import {
  CertificateCard,
  ExpertDetail,
  ReviewCard
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { sampleConsultantData } from "@/constants/consultants"
import { sampleReviewsData } from "@/constants/reviews"

interface InfoTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const InfoTab = ({ onLoading, onOverlayLoading }: InfoTabProps) => {
  const { consultantId } = useLocalSearchParams() as { consultantId: string }
  const consultantData = sampleConsultantData.find(
    (c) => c.consultantId === consultantId
  )
  const reviewsData = sampleReviewsData

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  const fullStars = Math.floor(reviewsData.avgRating)
  const hasHalfStar = reviewsData.avgRating - fullStars >= 0.5

  if (!consultantData || !reviewsData) return <LoadingScreen />

  const handleDownload = (certificateLink: string) => {
    Linking.openURL(certificateLink).catch((err) =>
      console.error("Không thể mở URL:", err)
    )
  }

  const handleViewMoreReview = () => {
    router.push("/reviews")
  }

  const handleViewReview = (reviewId: string) => {
    console.log("Review nè:", reviewId)
  }
  return (
    <VStack gap={20} className="mt-4">
      <ExpertDetail
        experience={consultantData.experience}
        rating={consultantData.rating}
        patient={consultantData.patient}
      />

      <VStack>
        <Section label="Mô tả" margin={false} />
        <Text className="-mt-2 text-justify font-tregular text-base text-secondary">
          {consultantData.bio}
        </Text>
      </VStack>

      <VStack>
        <Section label="Chứng chỉ" margin={false} />
        <VStack gap={10}>
          {consultantData.certificates.map((certificate, index) => (
            <CertificateCard
              key={index}
              variant="default"
              certificateLink={certificate}
              onPress={() => handleDownload(certificate)}
            />
          ))}
        </VStack>
      </VStack>

      <VStack>
        <Section
          label="Đánh giá khách hàng"
          margin={false}
          actionText="Xem thêm"
          onPress={handleViewMoreReview}
        />
        <VStack>
          <HStack center className="-mt-2">
            <Text className="font-tbold text-3xl text-primary">
              {reviewsData.avgRating}
            </Text>

            {Array.from({ length: fullStars }).map((_, index) => (
              <Star1
                key={index}
                size="20"
                color={COLORS.primary}
                variant="Bold"
              />
            ))}
            {hasHalfStar && (
              <Star1 size="20" color={COLORS.primary} variant="Bulk" />
            )}
          </HStack>

          <Text className="font-tmedium text-base text-secondary">
            Dựa trên tổng số {reviewsData.totalReview} đánh giá
          </Text>
        </VStack>

        <VStack gap={20} className="mt-4">
          {reviewsData.reviews.slice(0, 3).map((review, index) => (
            <View key={index}>
              <ReviewCard
                name={review.name}
                avatarUrl={review.avatarUrl}
                rating={review.rating}
                comment={review.comment}
                createdAt={review.createdAt}
                onPress={() => handleViewReview(review.reviewId)}
              />
            </View>
          ))}
        </VStack>
        {reviewsData.reviews.length > 3 && (
          <Text className="mt-4 text-center text-secondary underline">
            3 trên tổng số {reviewsData.reviews.length} đánh giá
          </Text>
        )}
      </VStack>
    </VStack>
  )
}
