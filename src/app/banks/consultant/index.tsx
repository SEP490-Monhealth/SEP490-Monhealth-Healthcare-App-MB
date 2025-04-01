import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ConsultantBankCard,
  ErrorDisplay,
  ListFooter,
  ListHeader,
  WithdrawalRequestCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { useGetConsultantBanksByConsultantId } from "@/hooks/useConsultantBank"
import { useGetWithdrawalRequestsByConsultantId } from "@/hooks/useWithdrawalRequest"

import { WithdrawalRequestType } from "@/schemas/withdrawalRequestSchema"

const BanksScreen = () => {
  const router = useRouter()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const { data: consultantBanksData, isLoading: isConsultantBanksLoading } =
    useGetConsultantBanksByConsultantId(consultantId)

  // console.log(JSON.stringify(consultantBanksData, null, 2))

  const [withdrawalRequestsData, setWithdrawalRequestsData] = useState<
    WithdrawalRequestType[]
  >([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading } = useGetWithdrawalRequestsByConsultantId(
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
  }

  const handleViewWithdrawalRequests = () => {
    router.push("/withdrawal-requests")
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader className="mt-2">
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
    <Container>
      <Header
        back
        label="Ngân hàng"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          href: "/banks/create"
        }}
      />

      <Content>
        <ListHeader className="pt-2">
          <Section label="Danh sách tài khoản" margin={false} />
        </ListHeader>

        {consultantBanksData?.map((item) => (
          <ConsultantBankCard
            key={item.consultantBankId}
            bank={item.bank}
            number={item.number}
            name={item.name}
            isDefault={item.isDefault}
          />
        ))}

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
              imageSource={require("../../../../public/images/monhealth-no-data-image.png")}
              title="Không có dữ liệu"
              description="Không tìm thấy có yêu cầu rút tiền nào ở đây!"
              marginTop={12}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default BanksScreen
