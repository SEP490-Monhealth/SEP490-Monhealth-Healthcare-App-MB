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
import { Add, Edit2, Star1, Trash } from "iconsax-react-native"

import {
  Container,
  Content,
  Modal,
  Sheet,
  SheetRefProps,
  SheetSelect
} from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  WithdrawalRequestCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { ConsultantBanks } from "@/components/local/banks"

import { COLORS } from "@/constants/color"

import {
  useDeleteConsultantBank,
  useGetConsultantBanksByConsultantId,
  useUpdateConsultantBankDefault
} from "@/hooks/useConsultantBank"
import { useGetWithdrawalRequestsByConsultantId } from "@/hooks/useWithdrawalRequest"

import { ConsultantBankType } from "@/schemas/consultantBankSchema"
import { WithdrawalRequestType } from "@/schemas/withdrawalRequestSchema"

const BanksScreen = () => {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const SheetRef = useRef<SheetRefProps>(null)

  const { data: consultantBanksData, isLoading: isConsultantBanksLoading } =
    useGetConsultantBanksByConsultantId(consultantId)

  const { mutate: updateBankDefault } = useUpdateConsultantBankDefault()
  const { mutate: deleteBank } = useDeleteConsultantBank()

  // console.log(JSON.stringify(consultantBanksData, null, 2))

  const [withdrawalRequestsData, setWithdrawalRequestsData] = useState<
    WithdrawalRequestType[]
  >([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isConfirm, setIsConfirm] = useState<boolean>(false)
  const [selectedConsultantBank, setSelectedConsultantBank] =
    useState<ConsultantBankType | null>(null)

  const limit = 10
  const sheetHeight = 240

  const { data, isLoading } = useGetWithdrawalRequestsByConsultantId(
    consultantId,
    page,
    limit
  )

  const openSheet = (consultantBank: ConsultantBankType) => {
    setSelectedConsultantBank(consultantBank)
    SheetRef.current?.scrollTo(-sheetHeight)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

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
  }

  const handleDefaultConsultantBank = () => {
    if (!selectedConsultantBank) return
    // console.log("Set default bank:", selectedConsultantBank.consultantBankId)
    updateBankDefault(selectedConsultantBank.consultantBankId)
    closeSheet()
  }

  const handleUpdateConsultantBank = () => {
    if (!selectedConsultantBank) return
    router.push(`/banks/consultant/${consultantId}/update`)
    router.setParams({
      consultantBankId: selectedConsultantBank.consultantBankId
    })
    closeSheet()
  }

  const handleDeleteConsultantBank = () => {
    if (!selectedConsultantBank) return
    // console.log("Delete bank:", selectedConsultantBank.consultantBankId)
    deleteBank(selectedConsultantBank.consultantBankId)
    closeSheet()
  }

  const handleConfirmDelete = () => {
    setIsConfirm(true)
    closeSheet()
  }

  const handleViewWithdrawalRequests = () => {
    router.push(`/withdrawal-requests/consultant/${consultantId}`)
  }

  const handleCreateConsultantBank = () => {
    router.push(`/banks/consultant/${consultantId}/create`)
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        <Section
          label="Lịch sử rút tiền"
          actionText="Xem tất cả"
          onPress={handleViewWithdrawalRequests}
        />
      </ListHeader>
    )
  }, [withdrawalRequestsData.length])

  if (
    !consultantBanksData ||
    isConsultantBanksLoading ||
    (withdrawalRequestsData.length === 0 && isLoading)
  ) {
    return <LoadingScreen />
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header
            back
            label="Ngân hàng"
            action={{
              icon: <Add size={24} color={COLORS.primary} />,
              href: `/banks/consultant/${consultantId}/create`
            }}
          />

          <Content className="mt-2">
            <ConsultantBanks
              consultantBanks={consultantBanksData}
              isLoading={isConsultantBanksLoading}
              onOpenSheet={openSheet}
            />

            <FlatList
              data={withdrawalRequestsData || []}
              keyExtractor={(item, index) =>
                `${item.withdrawalRequestId}-${index}`
              }
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
                  description="Không tìm thấy có yêu cầu rút tiền nào ở đây!"
                  marginTop={12}
                />
              }
              ItemSeparatorComponent={() => <View className="h-3" />}
            />
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          <SheetSelect
            label={
              selectedConsultantBank?.isDefault ? "Tài khoản phụ" : "Mặc định"
            }
            icon={
              <Star1
                variant={selectedConsultantBank?.isDefault ? "Linear" : "Bold"}
                size={20}
                color={COLORS.primary}
              />
            }
            onPress={handleDefaultConsultantBank}
          />

          <SheetSelect
            label="Chỉnh sửa"
            icon={<Edit2 variant="Bold" size="20" color={COLORS.primary} />}
            onPress={handleUpdateConsultantBank}
          />

          <SheetSelect
            variant="danger"
            label="Xóa"
            icon={<Trash variant="Bold" size="20" color={COLORS.destructive} />}
            onPress={handleConfirmDelete}
          />
        </Sheet>

        <Modal
          isVisible={isConfirm}
          onClose={() => setIsConfirm(false)}
          title="Xác nhận xóa tài khoản"
          description="Bạn có chắc chắn muốn xóa tài khoản này không? Hành động này không thể hoàn tác."
          confirmText="Đồng ý"
          cancelText="Hủy"
          onConfirm={handleDeleteConsultantBank}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default BanksScreen
