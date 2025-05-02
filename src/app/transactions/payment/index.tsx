import React, { useCallback, useEffect, useRef, useState } from "react"

import { Text } from "react-native"
import QRCode from "react-native-qrcode-svg"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { useQueryClient } from "@tanstack/react-query"

import {
  Card,
  Container,
  Content,
  HStack,
  Modal,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import {
  TransactionStatusEnum,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"
import { MonQueryKey } from "@/constants/query"

import { useAuth } from "@/contexts/AuthContext"

import {
  useGetTransactionById,
  useGetTransactionStatusById
} from "@/hooks/useTransaction"

import { whoIAm } from "@/services/authService"

import { formatCurrency, formatDateTime } from "@/utils/formatters"

const formatQRTimeRemaining = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
}

const QR_LOGO =
  "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2FSEP490%20-%20Monhealth%20-%20Logo.png?alt=media&token=4a00b1c9-6f2c-4cfe-8868-94ed554ff3d0"

function TransactionPaymentScreen() {
  const router = useRouter()
  const { transactionId, qrCode } = useLocalSearchParams<{
    transactionId: string
    qrCode: string
  }>()

  const { user, setUser } = useAuth()
  const userId = user?.userId

  const queryClient = useQueryClient()

  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(5)
  const [expireTime, setExpireTime] = useState<number>(15 * 60)

  const isMounted = useRef(true)

  const safeNavigateBack = useCallback(() => {
    if (isMounted.current) {
      router.back()
    }
  }, [router])

  const { data: transactionData, isLoading: isTransactionDataLoading } =
    useGetTransactionById(transactionId)
  const { data: transactionStatus, isLoading: isTransactionStatusLoading } =
    useGetTransactionStatusById(transactionId)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const checkTransactionStatus = async () => {
      if (
        transactionStatus?.status === TransactionStatusEnum.Completed &&
        userId
      ) {
        await invalidateRelatedQueries()
        if (isMounted.current) {
          setShowDialog(true)
        }
      }
    }

    checkTransactionStatus()
  }, [transactionStatus, userId])

  useEffect(() => {
    if (!showDialog) return

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer)
          setTimeout(safeNavigateBack, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdownTimer)
  }, [showDialog, safeNavigateBack])

  useEffect(() => {
    const qrTimer = setInterval(() => {
      setExpireTime((prev) => {
        if (prev <= 1) {
          clearInterval(qrTimer)
          setTimeout(safeNavigateBack, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(qrTimer)
  }, [safeNavigateBack])

  const invalidateRelatedQueries = async () => {
    try {
      const updatedUser = await whoIAm()
      if (isMounted.current) {
        setUser(updatedUser)
      }

      queryClient.invalidateQueries({
        queryKey: [
          MonQueryKey.Transaction.UserTransactions,
          MonQueryKey.Subscription.UserSubscriptions,
          MonQueryKey.Subscription.RemainingBookings
        ]
      })
    } catch (error) {
      console.error("Error invalidating queries:", error)
    }
  }

  const handleModalClose = useCallback(() => {
    setShowDialog(false)
    setTimeout(safeNavigateBack, 0)
  }, [safeNavigateBack])

  if (
    !transactionData ||
    isTransactionDataLoading ||
    !transactionStatus ||
    isTransactionStatusLoading
  ) {
    return <LoadingScreen />
  }

  const { label: transactionTypeLabel } = getTransactionTypeMeta(
    transactionData.type
  )

  const truncatedTransactionId = `#${transactionData.transactionId.substring(0, 8)}...`

  return (
    <>
      <Container>
        <Header label="Thanh Toán" />

        <Content className="mt-2">
          <Section label="QR Code" margin={false} />

          <Card className="items-center pb-4 pt-8">
            <QRCode
              value={qrCode}
              size={280}
              logo={{ uri: QR_LOGO }}
              logoSize={40}
            />

            <Text className="mt-4 font-tmedium text-base text-destructive">
              Mã QR hết hạn sau: {formatQRTimeRemaining(expireTime)}
            </Text>
          </Card>

          <Section label="Chi tiết giao dịch" />

          <Card>
            <VStack gap={12}>
              <HStack center className="justify-between">
                <Text className="font-tregular text-base text-secondary">
                  Mã giao dịch
                </Text>
                <Text className="font-tmedium text-base text-primary">
                  {truncatedTransactionId}
                </Text>
              </HStack>

              <HStack center className="justify-between">
                <Text className="font-tregular text-base text-secondary">
                  Loại giao dịch
                </Text>
                <Text className="font-tmedium text-base text-primary">
                  {transactionTypeLabel}
                </Text>
              </HStack>

              <HStack center className="justify-between">
                <Text className="font-tregular text-base text-secondary">
                  Ngày tạo
                </Text>
                <Text className="font-tmedium text-base text-primary">
                  {formatDateTime(transactionData.createdAt)}
                </Text>
              </HStack>

              <HStack center className="justify-between">
                <Text className="font-tregular text-base text-secondary">
                  Mô tả
                </Text>
                <Text className="font-tmedium text-base text-primary">
                  {transactionData.description}
                </Text>
              </HStack>

              <HStack
                center
                className="justify-between border-t border-border pt-4"
              >
                <Text className="font-tsemibold text-base text-secondary">
                  Số tiền
                </Text>
                <Text className="font-tbold text-lg text-primary">
                  {formatCurrency(transactionData.amount)}
                </Text>
              </HStack>
            </VStack>
          </Card>

          {transactionStatus.status === TransactionStatusEnum.Pending && (
            <Text className="mt-4 text-center font-tregular text-sm text-secondary">
              Vui lòng đợi trong khi chúng tôi xử lý giao dịch...
            </Text>
          )}
        </Content>
      </Container>

      <Modal
        isVisible={showDialog}
        title="Thanh toán thành công"
        description={`Tự động quay lại sau ${countdown} giây`}
        showConfirm={false}
        onClose={handleModalClose}
      />
    </>
  )
}

export default TransactionPaymentScreen
