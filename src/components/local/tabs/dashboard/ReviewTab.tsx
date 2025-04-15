import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, Text, View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  ReviewCard
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetConsultantById } from "@/hooks/useConsultant"
import { useGetReviewsByConsultantId } from "@/hooks/useReview"

import { ReviewType } from "@/schemas/reviewSchema"

import { ReviewOverview } from "../../consultants"

interface ReviewTabProps {
  consultantId?: string
  onOverlayLoading: (isLoading: boolean) => void
}

export const ReviewTab = ({
  consultantId,
  onOverlayLoading
}: ReviewTabProps) => {
  const router = useRouter()

  const [reviewsData, setReviewsData] = useState<ReviewType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data: consultantData, isLoading: isConsultantLoading } =
    useGetConsultantById(consultantId)
  const { data, isLoading, refetch } = useGetReviewsByConsultantId(
    consultantId,
    page,
    limit
  )

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0 || isConsultantLoading)
  }, [isFetching, isMutating, isConsultantLoading, onOverlayLoading])

  useEffect(() => {
    if (data?.reviews) {
      setReviewsData((prev) =>
        page === 1 ? data.reviews : [...prev, ...data.reviews]
      )
      setHasMore(page * limit < data.totalItems)
    }
  }, [data, page])

  useEffect(() => {
    if (!isLoading && isRefreshing) {
      setIsRefreshing(false)
    }
  }, [isLoading, isRefreshing])

  const onRefresh = () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setPage(1)
    refetch()
    setIsRefreshing(false)
  }

  const loadMoreData = () => {
    if (!hasMore || isLoading) return
    setPage((prev) => prev + 1)
  }

  const onEndReached = () => {
    if (isLoading || !hasMore) return
    Keyboard.dismiss()
    loadMoreData()
  }

  const totalReviews = consultantData?.ratingCount ?? 0
  const averageRating = consultantData?.averageRating ?? 0

  const ratingData = useMemo(() => {
    const countPerStar: Record<number, number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
    reviewsData.forEach((review) => {
      countPerStar[review.rating] += 1
    })

    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      percent:
        totalReviews > 0
          ? Math.round((countPerStar[stars] / totalReviews) * 100)
          : 0
    }))
  }, [reviewsData, totalReviews])

  const handleViewReviews = () => {
    router.push(`/reviews/consultant/${consultantId}`)
  }

  const FlatListHeader = useMemo(() => {
    if (!consultantData) return null

    return (
      <ListHeader>
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
                {averageRating.toFixed(1)} / 5.0
              </Text>
            </HStack>
          </VStack>

          <View className="px-2">
            <ReviewOverview
              totalReviews={totalReviews}
              averageRating={averageRating}
              ratingData={ratingData}
              showSection={false}
            />
          </View>
        </VStack>

        <Section
          label="Danh sách đánh giá"
          actionText="Xem tất cả"
          onPress={handleViewReviews}
        />
      </ListHeader>
    )
  }, [consultantData, ratingData])

  const renderItem = ({ item }: { item: ReviewType }) => (
    <ReviewCard
      name={item.member.fullName}
      avatarUrl={item.member.avatarUrl || ""}
      rating={item.rating}
      comment={item.comment}
      time={item.updatedAt}
    />
  )

  return (
    <FlatList
      data={reviewsData}
      keyExtractor={(item, index) => `${item.reviewId}-${index}`}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={FlatListHeader}
      renderItem={renderItem}
      ListFooterComponent={
        hasMore ? (
          <ListFooter>
            <ActivityIndicator color={COLORS.primary} />
          </ListFooter>
        ) : (
          <ListFooter />
        )
      }
      ListEmptyComponent={
        <ErrorDisplay
          imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
          title="Không có dữ liệu"
          description="Không tìm thấy có đánh giá nào ở đây!"
          marginTop={12}
        />
      }
      ItemSeparatorComponent={() => <View className="h-3" />}
    />
  )
}
