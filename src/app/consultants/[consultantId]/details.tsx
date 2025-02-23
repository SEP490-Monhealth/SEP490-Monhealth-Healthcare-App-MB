import React from "react"

import { Image, Linking, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Star1 } from "iconsax-react-native"

import {
  Button,
  Container,
  Content,
  HStack,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import {
  CertificateCard,
  ExpertDetail,
  ReviewCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { sampleConsultantData } from "@/constants/consultants"
import { sampleReviewsData } from "@/constants/reviews"

const ConsultantDetailsScreen = () => {
  const { consultantId } = useLocalSearchParams() as { consultantId: string }
  const consultantData = sampleConsultantData.find(
    (c) => c.consultantId === consultantId
  )
  const reviewsData = sampleReviewsData

  const fullStars = Math.floor(reviewsData.avgRating)
  const hasHalfStar = reviewsData.avgRating - fullStars >= 0.5

  if (!consultantData) return <LoadingScreen />

  const handleDownload = (certificateLink: string) => {
    Linking.openURL(certificateLink).catch((err) =>
      console.error("Không thể mở URL:", err)
    )
  }

  const handleViewMoreReview = () => {
    console.log("trang mới")
  }

  const handleViewReview = (reviewId: string) => {
    console.log("Review nè:", reviewId)
  }

  return (
    <Container>
      <Header back label={consultantData?.name} />
      <Content className="mt-2">
        <ScrollArea className="flex-1">
          <VStack gap={20}>
            <HStack center gap={20}>
              <Image
                source={{ uri: consultantData.avatarUrl }}
                className="h-28 w-28 rounded-2xl border border-border"
              />
              <View className="flex-1 gap-1">
                <Text className="font-tbold text-2xl text-primary">
                  {consultantData.name}
                </Text>
                <Text className="font-tmedium text-base text-secondary">
                  {consultantData.expertise}
                </Text>
              </View>
            </HStack>

            <ExpertDetail
              experience={consultantData.experience}
              rating={consultantData.rating}
              patient={consultantData.patient}
            />

            <VStack>
              <Section label="Mô tả" margin={false} />
              <Text className="-mt-2 font-tregular text-base text-secondary">
                {consultantData.bio}
              </Text>
            </VStack>

            <VStack>
              <Section label="Chứng chỉ" margin={false} />
              <VStack gap={10}>
                {consultantData.certificates.map((certificate, index) => (
                  <View key={index}>
                    <CertificateCard
                      variant="default"
                      certificateLink={certificate}
                      onPress={() => handleDownload(certificate)}
                    />
                  </View>
                ))}
              </VStack>
            </VStack>

            <VStack>
              <Section label="Đánh giá khách hàng" margin={false} />
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
                <Button
                  size="lg"
                  onPress={() => handleViewMoreReview()}
                  className="mt-4"
                >
                  Xem thêm đánh giá
                </Button>
              )}
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantDetailsScreen
