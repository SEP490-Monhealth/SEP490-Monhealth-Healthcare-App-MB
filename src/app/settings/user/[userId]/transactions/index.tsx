import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content, VStack } from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { TransactionCard } from "@/components/global/molecules/TransactionCard"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { TransactionTypeEnum } from "@/constants/enum/Transaction"

import { useGetTransactionsByUserId } from "@/hooks/useTransaction"

import { TransactionType } from "@/schemas/transactionSchema"

import { formatDate } from "@/utils/formatters"

interface GroupedTransaction {
  date: string
  transactions: TransactionType[]
}

function UserTransactionsScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const [transactionsData, setTransactionsData] = useState<TransactionType[]>(
    []
  )
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading, refetch } = useGetTransactionsByUserId(
    userId,
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
    refetch()
    setIsRefreshing(false)
  }

  const groupTransactionsByDate = (
    transactions: TransactionType[]
  ): GroupedTransaction[] => {
    const grouped: Record<string, TransactionType[]> = {}

    transactions.forEach((transaction) => {
      const dateKey = formatDate(transaction.createdAt)

      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }

      grouped[dateKey].push(transaction)
    })

    return Object.keys(grouped).map((date) => ({
      date,
      transactions: grouped[date]
    }))
  }

  const groupedTransactions = useMemo(() => {
    return groupTransactionsByDate(transactionsData)
  }, [transactionsData])

  const FlatListHeader = () => (
    <ListHeader>
      {transactionsData.length > 0 && (
        <Section label="Lịch sử thanh toán" margin={false} className="pt-2" />
      )}
    </ListHeader>
  )

  if (transactionsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back label="Thanh toán" />

      <Content className="mt-2">
        <FlatList
          data={groupedTransactions}
          keyExtractor={(item) => item.date}
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
          renderItem={({ item }: { item: GroupedTransaction }) => (
            <>
              <Section label={`${item.date}`} margin={false} />

              <VStack gap={12}>
                {item.transactions.map((transaction, index) => (
                  <TransactionCard
                    key={`${transaction.transactionId}-${index}`}
                    type={TransactionTypeEnum.Fee}
                    description={transaction.description}
                    amount={transaction.amount}
                    status={transaction.status}
                  />
                ))}
              </VStack>
            </>
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

export default UserTransactionsScreen
