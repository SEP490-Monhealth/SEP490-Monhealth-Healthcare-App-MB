import React from "react"

import { Text } from "react-native"
import { View } from "react-native"

import { useRouter } from "expo-router"

import { HStack, VStack } from "@/components/global/atoms"
import { TipText } from "@/components/global/atoms/Typography"
import { TransactionCard } from "@/components/global/molecules/TransactionCard"
import { Section } from "@/components/global/organisms"

import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "@/constants/enum/Transaction"

import { formatCurrency } from "@/utils/formatters"
import { getRandomTip } from "@/utils/helpers"

import { IncomeExpenseChart } from "./IncomeExpenseChart"

const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

const spendingData = {
  income: [
    { date: "2025-03-24", amount: 100000 },
    { date: "2025-03-25", amount: 150000 },
    { date: "2025-03-26", amount: 1000000 },
    { date: "2025-03-27", amount: 500000 },
    { date: "2025-03-28", amount: 700000 },
    { date: "2025-03-29", amount: 2000000 },
    { date: "2025-03-30", amount: 300000 }
  ],
  expense: [
    { date: "2025-03-24", amount: 50000 },
    { date: "2025-03-25", amount: 100000 },
    { date: "2025-03-26", amount: 800000 },
    { date: "2025-03-27", amount: 400000 },
    { date: "2025-03-28", amount: 600000 },
    { date: "2025-03-29", amount: 1500000 },
    { date: "2025-03-30", amount: 200000 }
  ]
}

interface SpendingTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const SpendingTab = ({
  onLoading,
  onOverlayLoading
}: SpendingTabProps) => {
  const router = useRouter()

  const handleViewTransactions = () => {
    router.push("/transactions")
  }

  return (
    <View className="mt-2">
      <VStack className="px-2">
        <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

        <HStack className="-mb-2 items-center justify-between">
          <Text className="font-tbold text-2xl text-primary">
            {formatCurrency(5000000)}
          </Text>

          <Text className="font-tmedium text-primary">
            24 - 30 Tháng 3 2025
          </Text>
        </HStack>
      </VStack>

      <IncomeExpenseChart data={spendingData} labels={labels} />

      <Section
        label="Chi tiết chi tiêu"
        actionText="Xem tất cả"
        onPress={handleViewTransactions}
      />

      <VStack gap={12}>
        <TransactionCard
          type={TransactionTypeEnum.Withdrawal}
          datetime="2025-03-26T10:00:00Z"
          amount={300000}
          status={TransactionStatusEnum.Completed}
        />

        <TransactionCard
          type={TransactionTypeEnum.Bonus}
          datetime="2025-03-27T12:00:00Z"
          amount={10000}
          status={TransactionStatusEnum.Failed}
        />

        <TransactionCard
          type={TransactionTypeEnum.Earning}
          datetime="2025-03-28T22:00:00Z"
          amount={5000000}
          status={TransactionStatusEnum.Pending}
        />
      </VStack>

      <View className="mt-8">
        <TipText text={getRandomTip()} />
      </View>
    </View>
  )
}
