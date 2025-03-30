import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, Keyboard, View } from "react-native"
import { FlatList } from "react-native"

import { useRouter } from "expo-router"

import { Container, Content } from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { TransactionCard } from "@/components/global/molecules/TransactionCard"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { useGetTransactionsByConsultantId } from "@/hooks/useTransaction"

import { TransactionType } from "@/schemas/transactionSchema"

import { LoadingScreen } from "../loading"

function TransactionsScreen() {
  const { user } = useAuth()
  const consultantId = user?.consultantId

  const [transactionsData, setTransactionsData] = useState<TransactionType[]>(
    []
  )
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading } = useGetTransactionsByConsultantId(
    consultantId,
    page,
    limit
  )

  useEffect(() => {
    if (data?.transactions) {
      setTransactionsData((prev) =>
        page === 1 ? data.transactions : [...prev, ...data.transactions]
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
      <ListHeader className="mt-2">
        <Section label="Danh sách giao dịch" margin={false} />
      </ListHeader>
    )
  }, [])

  if (transactionsData.length === 0 && isLoading) return <LoadingScreen />

  return (
    <Container>
      <Header back label="Giao dịch" />

      <Content>
        <FlatList
          data={transactionsData || []}
          keyExtractor={(item, index) => `${item.transactionId}-${index}`}
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
            <TransactionCard
              type={item.type}
              datetime={item.createdAt}
              amount={item.amount}
              showStatus
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
              imageSource={require("../../../public/images/monhealth-no-data-image.png")}
              title="Không có dữ liệu"
              description="Không tìm thấy có giao dịch nào ở đây!"
              marginTop={24}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default TransactionsScreen
