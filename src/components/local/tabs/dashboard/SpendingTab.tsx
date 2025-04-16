import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, Text } from "react-native"
import { View } from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { TipText } from "@/components/global/atoms/Typography"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { TransactionCard } from "@/components/global/molecules/TransactionCard"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetYearlyTransactionByConsultantId } from "@/hooks/useReport"
import { useGetTransactionsByConsultantId } from "@/hooks/useTransaction"

import { TransactionType } from "@/schemas/transactionSchema"

import { formatCurrency } from "@/utils/formatters"
import { getMonthRange, getRandomTip } from "@/utils/helpers"

import { IncomeExpenseChart } from "./IncomeExpenseChart"

interface SpendingTabProps {
  consultantId?: string
  date: string
  onOverlayLoading: (isLoading: boolean) => void
}

export const SpendingTab = ({
  consultantId,
  date,
  onOverlayLoading
}: SpendingTabProps) => {
  const router = useRouter()

  const [transactionsData, setTransactionsData] = useState<TransactionType[]>(
    []
  )
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 5

  const { data: monthlyTransactionData, refetch: refetchMonthlyTransaction } =
    useGetYearlyTransactionByConsultantId(consultantId, date)
  const {
    data,
    isLoading,
    refetch: refetchTransactions
  } = useGetTransactionsByConsultantId(consultantId, page, limit)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

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
    refetchMonthlyTransaction()
    refetchTransactions()
    setIsRefreshing(false)
  }

  const currentDate = new Date(date)
  const currentMonthNum = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const startMonthDate = new Date(currentYear, currentMonthNum - 5, 1)
  const startMonth = `${startMonthDate.getFullYear()}-${String(startMonthDate.getMonth() + 1).padStart(2, "0")}`

  const monthRange = getMonthRange(startMonth, date)

  const totalIncome =
    monthlyTransactionData?.income?.reduce(
      (sum, item) => sum + item.amount,
      0
    ) || 0

  const totalExpense =
    monthlyTransactionData?.expense?.reduce(
      (sum, item) => sum + item.amount,
      0
    ) || 0

  const totalBalance = totalIncome - totalExpense

  const labels = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(currentYear, currentMonthNum - 5 + index, 1)
    const monthNumber = month.getMonth() + 1
    return `T${monthNumber}`
  })

  const handleViewTransactions = () => {
    router.push("/transactions")
  }

  const incomeData = monthlyTransactionData?.income || []
  const expenseData = monthlyTransactionData?.expense || []

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        <VStack className="px-2">
          <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

          <HStack className="-mb-2 items-center justify-between">
            <Text className="font-tbold text-2xl text-primary">
              {formatCurrency(totalBalance)}
            </Text>

            <Text className="font-tmedium text-primary">{monthRange}</Text>
          </HStack>
        </VStack>

        <IncomeExpenseChart
          data={{ income: incomeData, expense: expenseData }}
          labels={labels}
        />

        <Section
          label="Danh sách chi tiêu"
          actionText="Xem tất cả"
          onPress={handleViewTransactions}
        />
      </ListHeader>
    )
  }, [
    totalBalance,
    monthRange,
    incomeData,
    expenseData,
    transactionsData.length
  ])

  if (transactionsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <FlatList
      data={transactionsData || []}
      keyExtractor={(item, index) => `${item.transactionId}-${index}`}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      showsVerticalScrollIndicator={false}
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
          <ListFooter className="pb-12">
            <TipText text={getRandomTip()} />
          </ListFooter>
        )
      }
      ListEmptyComponent={
        <ErrorDisplay
          imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
          title="Không có dữ liệu"
          description="Không tìm thấy có giao dịch nào ở đây!"
          marginTop={12}
        />
      }
      ItemSeparatorComponent={() => <View className="h-3" />}
    />
  )
}
