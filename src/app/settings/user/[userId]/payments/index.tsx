import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content } from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  PaymentCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetPaymentsByUserId } from "@/hooks/usePayment"

import { PaymentType } from "@/schemas/paymentSchema"

function PaymentScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const [paymentsData, setPaymentsData] = useState<PaymentType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading } = useGetPaymentsByUserId(userId, page, limit)

  useEffect(() => {
    if (data?.payments) {
      setPaymentsData((prev) =>
        page === 1 ? data.payments : [...prev, ...data.payments]
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
        {paymentsData.length > 0 && (
          <Section
            label="Danh sách thanh toán"
            margin={false}
            className="pt-2"
          />
        )}
      </ListHeader>
    )
  }, [paymentsData.length])

  if (paymentsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back label="Lịch sử thanh toán" />

      <Content>
        <FlatList
          data={paymentsData || []}
          keyExtractor={(item, index) => `${item.paymentId}-${index}`}
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
            <PaymentCard
              description={item.description}
              amount={item.amount}
              createdAt={item.createdAt}
              status={item.status}
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
              description="Không tìm thấy có thanh toán nào ở đây!"
              marginTop={24}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default PaymentScreen
