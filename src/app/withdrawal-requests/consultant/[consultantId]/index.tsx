import React, { useEffect, useMemo, useRef, useState } from "react"

import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Add, Edit2, Trash } from "iconsax-react-native"

import {
  Container,
  Content,
  Modal,
  Sheet,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  WithdrawalRequestCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { WithdrawalRequestStatusEnum } from "@/constants/enum/WithdrawalRequest"

import {
  useDeleteWithdrawalRequest,
  useGetWithdrawalRequestsByConsultantId
} from "@/hooks/useWithdrawalRequest"

import { WithdrawalRequestType } from "@/schemas/withdrawalRequestSchema"

import { formatDate } from "@/utils/formatters"

interface GroupedWithdrawalRequest {
  date: string
  withdrawalRequests: WithdrawalRequestType[]
}

function WithdrawalRequestsScreen() {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const SheetRef = useRef<SheetRefProps>(null)

  const [withdrawalRequestsData, setWithdrawalRequestsData] = useState<
    WithdrawalRequestType[]
  >([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [selectedRequest, setSelectedRequest] = useState<string | null>("")

  const limit = 10

  const { mutate: deleteWithdrawalRequest } = useDeleteWithdrawalRequest()

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

  const openSheet = () => SheetRef.current?.scrollTo(-200)
  const closeSheet = () => SheetRef.current?.scrollTo(0)

  const handleAction = (
    requestId: string,
    status: WithdrawalRequestStatusEnum
  ) => {
    if (status === WithdrawalRequestStatusEnum.Pending) {
      setSelectedRequest(requestId)
      openSheet()
    }
  }

  const handleUpdate = () => {
    closeSheet()
    router.push(
      `/withdrawal-requests/consultant/${consultantId}/${selectedRequest}/update`
    )
    setSelectedRequest(null)
  }

  const handleDelete = () => {
    setIsVisible(true)
    closeSheet()
  }

  const handleConfirmDelete = () => {
    if (selectedRequest) {
      setIsVisible(false)
      deleteWithdrawalRequest(selectedRequest)
    }
    setSelectedRequest(null)
  }

  const groupTransactionsByDate = (
    withdrawalRequests: WithdrawalRequestType[]
  ): GroupedWithdrawalRequest[] => {
    const grouped: Record<string, WithdrawalRequestType[]> = {}

    withdrawalRequests.forEach((transaction) => {
      const dateKey = formatDate(transaction.createdAt)

      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }

      grouped[dateKey].push(transaction)
    })

    return Object.keys(grouped).map((date) => ({
      date,
      withdrawalRequests: grouped[date]
    }))
  }

  const groupedWithdrawalRequests = useMemo(() => {
    return groupTransactionsByDate(withdrawalRequestsData)
  }, [withdrawalRequestsData])

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        {withdrawalRequestsData.length > 0 && (
          <Section label="Lịch sử yêu cầu" margin={false} className="pt-2" />
        )}
      </ListHeader>
    )
  }, [withdrawalRequestsData.length])

  if (withdrawalRequestsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
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
              data={groupedWithdrawalRequests}
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
              renderItem={({ item }: { item: GroupedWithdrawalRequest }) => (
                <>
                  <Section label={`${item.date}`} margin={false} />

                  <VStack gap={12}>
                    {item.withdrawalRequests.map((withdrawalRequest, index) => (
                      <WithdrawalRequestCard
                        key={`${withdrawalRequest.withdrawalRequestId}-${index}`}
                        description={withdrawalRequest.description}
                        amount={withdrawalRequest.amount}
                        reason={withdrawalRequest.reason}
                        status={withdrawalRequest.status}
                        onPress={() =>
                          handleAction(
                            withdrawalRequest.withdrawalRequestId,
                            withdrawalRequest.status
                          )
                        }
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

        <Sheet ref={SheetRef} dynamicHeight={200}>
          <SheetSelect
            label="Cập nhật"
            icon={<Edit2 variant="Bold" size="20" color={COLORS.primary} />}
            onPress={handleUpdate}
          />

          <SheetSelect
            variant="danger"
            label="Xóa"
            icon={<Trash variant="Bold" size="20" color={COLORS.destructive} />}
            onPress={handleDelete}
          />
        </Sheet>

        <Modal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          title="Xóa yêu cầu"
          description="Bạn có chắc chắn muốn xóa yêu cầu này không?"
          confirmText="Đồng ý"
          cancelText="Hủy"
          onConfirm={handleConfirmDelete}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default WithdrawalRequestsScreen
