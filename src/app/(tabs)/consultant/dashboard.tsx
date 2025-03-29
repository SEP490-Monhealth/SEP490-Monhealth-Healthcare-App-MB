import React from "react"

import { Text } from "react-native"

import {
  Container,
  Content,
  HStack,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { TransactionCard } from "@/components/global/molecules/TransactionCard"
import { Section } from "@/components/global/organisms"

import { IncomeExpenseChart } from "@/components/local/tabs/dashboard"
import { HomeHeader } from "@/components/local/tabs/home"

import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "@/constants/enum/Transaction"

import { useAuth } from "@/contexts/AuthContext"

import { formatCurrency } from "@/utils/formatters"

const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

const data = {
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

function DashboardScreen() {
  const { user } = useAuth()
  const userId = user?.userId
  const fullName = user?.fullName

  const today = "2025-03-29"

  return (
    <Container>
      <HomeHeader fullName={fullName} />

      <ScrollArea>
        <Content className="pb-12">
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

          <IncomeExpenseChart data={data} labels={labels} />

          <Section label="Chi tiết chi tiêu" actionText="Xem tất cả" />

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
        </Content>
      </ScrollArea>
    </Container>
  )
}

export default DashboardScreen
