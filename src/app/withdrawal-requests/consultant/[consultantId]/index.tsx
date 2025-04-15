import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  WithdrawalRequestCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetWithdrawalRequestsByConsultantId } from "@/hooks/useWithdrawalRequest"

import { WithdrawalRequestType } from "@/schemas/withdrawalRequestSchema"

function WithdrawalRequestsScreen() {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const [withdrawalRequestsData, setWithdrawalRequestsData] = useState<
    WithdrawalRequestType[]
  >([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading, refetch } = useGetWithdrawalRequestsByConsultantId(
    consultantId,
    page,
    limit
  )

  useEffect(() => {
    if (data?.withdrawalRequests) {
      setWithdrawalRequestsData((prev) =>
        page === 1
          ? data.withdrawalRequests
          : [...prev, ...data.withdrawalRequests]
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

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        {withdrawalRequestsData.length > 0 && (
          <Section label="Danh sách yêu cầu" margin={false} className="pt-2" />
        )}
      </ListHeader>
    )
  }, [withdrawalRequestsData.length])

  if (withdrawalRequestsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header
        back
        label="Yêu cầu rút tiền"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          href: `/withdrawal-requests/consultant/${consultantId}/create`
        }}
      />

      <Content className="mt-2">
        <FlatList
          data={withdrawalRequestsData || []}
          keyExtractor={(item, index) => `${item.withdrawalRequestId}-${index}`}
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
            <WithdrawalRequestCard
              description={item.description}
              amount={item.amount}
              time={item.createdAt}
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
              imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
              title="Không có dữ liệu"
              description="Không tìm thấy có yêu cầu nào ở đây!"
              marginTop={24}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default WithdrawalRequestsScreen
