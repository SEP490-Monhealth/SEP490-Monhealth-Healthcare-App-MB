import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content, Modal } from "@/components/global/atoms"
import {
  BookingCard,
  ErrorDisplay,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetBookingsByUserId } from "@/hooks/useBooking"

import { BookingType } from "@/schemas/bookingSchema"

function BookingsUserScreen() {
  const router = useRouter()
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const [bookingsData, setBookingsData] = useState<BookingType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const [modalType, setModalType] = useState<"cancel" | "report">("cancel")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  const limit = 10

  const { data, isLoading, refetch } = useGetBookingsByUserId(
    userId,
    page,
    limit
  )

  useEffect(() => {
    if (data?.bookings) {
      setBookingsData((prev) =>
        page === 1 ? data.bookings : [...prev, ...data.bookings]
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
    refetch()
    setIsRefreshing(false)
  }

  const handleViewBooking = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`)
  }

  const handleCancel = (bookingId: string) => {
    setSelectedBooking(bookingId)
    setModalType("cancel")
    setIsModalVisible(true)
  }

  const handleReview = (bookingId: string) => {
    router.push(`/bookings/${bookingId}/review`)
  }

  const handleReport = (bookingId: string) => {
    setSelectedBooking(bookingId)
    setModalType("report")
    setIsModalVisible(true)
  }

  const handleViewReport = (bookingId: string) => {
    router.push(`/bookings/${bookingId}/report`)
  }

  const handleConfirmAction = () => {
    if (!selectedBooking) return

    if (modalType === "cancel") {
      setIsModalVisible(false)
      router.push(`/bookings/${selectedBooking}/cancel`)
    } else if (modalType === "report") {
      setIsModalVisible(false)
      router.push(`/bookings/${selectedBooking}/report/create`)
    }

    setSelectedBooking(null)
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        {bookingsData.length > 0 && (
          <Section label="Danh sách lịch hẹn" margin={false} className="pt-2" />
        )}
      </ListHeader>
    )
  }, [bookingsData.length])

  if (bookingsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container>
        <Header back label="Lịch hẹn" />

        <Content className="mt-2">
          <FlatList
            data={bookingsData || []}
            keyExtractor={(item, index) => `${item.bookingId}-${index}`}
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
              <BookingCard
                key={item.bookingId}
                variant="member"
                name={item.consultant.fullName}
                date={item.date}
                startTime={item.startTime}
                endTime={item.endTime}
                notes={item.notes}
                isReviewed={item.isReviewed}
                comment={item.review.comment}
                status={item.status}
                cancellationReason={item.cancellationReason}
                onPress={() => handleViewBooking(item.bookingId)}
                onCancelPress={() => handleCancel(item.bookingId)}
                onReviewPress={() => handleReview(item.bookingId)}
                onReportPress={() =>
                  item.isReported
                    ? handleViewReport(item.bookingId)
                    : handleReport(item.bookingId)
                }
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
                imageSource={require("../../../../../../public/images/monhealth-no-data-image.png")}
                title="Không có dữ liệu"
                description="Không tìm thấy có lịch hẹn nào ở đây!"
                marginTop={24}
              />
            }
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </Content>
      </Container>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={modalType === "cancel" ? "Hủy lịch hẹn" : "Báo cáo lịch hẹn"}
        description={
          modalType === "cancel"
            ? "Bạn có chắc chắn muốn hủy lịch hẹn này không?"
            : "Bạn có chắc chắn muốn báo cáo lịch hẹn không?"
        }
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleConfirmAction}
      />
    </>
  )
}

export default BookingsUserScreen
