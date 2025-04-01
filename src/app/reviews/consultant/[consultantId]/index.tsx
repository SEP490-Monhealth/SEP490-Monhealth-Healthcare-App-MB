import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content } from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  ReviewCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetReviewsByConsultantId } from "@/hooks/useReview"

import { ReviewType } from "@/schemas/reviewSchema"

function ReviewsScreen() {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const [reviewsData, setReviewsData] = useState<ReviewType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading } = useGetReviewsByConsultantId(
    consultantId,
    page,
    limit
  )

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

  const loadMoreData = () => {
    if (!hasMore || isLoading) return
    setPage((prev) => prev + 1)
  }

  const onEndReached = () => {
    if (isLoading || !hasMore) return
    Keyboard.dismiss()
    loadMoreData()
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setPage(1)
  }
  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        {reviewsData.length > 0 && (
          <Section label="Tất cả đánh giá" margin={false} className="pt-2" />
        )}
      </ListHeader>
    )
  }, [reviewsData.length])

  if (reviewsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back label="Đánh giá" />

      <Content>
        <FlatList
          data={reviewsData || []}
          keyExtractor={(item, index) => `${item.reviewId}-${index}`}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={FlatListHeader}
          renderItem={({ item }) => (
            <ReviewCard
              name={item.member.fullName}
              avatarUrl={item.member.avatarUrl}
              rating={item.rating}
              comment={item.comment}
              time={item.createdAt}
            />
          )}
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
              description="Không tìm thấy có phản hồi nào ở đây!"
              marginTop={24}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default ReviewsScreen
