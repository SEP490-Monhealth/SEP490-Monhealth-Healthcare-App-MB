import React, { useEffect, useMemo, useState } from "react"

import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  TouchableOpacity,
  View
} from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { SearchNormal1 } from "iconsax-react-native"

import {
  Badge,
  Container,
  Content,
  HStack,
  Input
} from "@/components/global/atoms"
import {
  ConsultantCard,
  CustomHeader,
  ErrorDisplay,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import ConsultantExpertise from "@/components/local/tabs/consultant/ConsultantExpertise"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"
import { useSearch } from "@/contexts/SearchContext"

import { useGetAllConsultants } from "@/hooks/useConsultant"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetAllExpertise } from "@/hooks/useExpertise"
import { useGetRemainingBookingByUserId } from "@/hooks/useUserSubscription"

import { ConsultantType } from "@/schemas/consultantSchema"

function ConsultantScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId
  // const userSubscription = user?.subscription

  const {
    searchConsultantHistory,
    addSearchConsultantHistory,
    clearSearchConsultantHistory
  } = useSearch()

  const [consultantsData, setConsultantsData] = useState<ConsultantType[]>([])
  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [selectedExpertise, setSelectedExpertise] = useState<string>("Tất cả")
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  // const [hasShownModal, setHasShownModal] = useState<boolean>(false)

  const limit = 10

  const debouncedSearch = useDebounce(searchQuery)
  const debouncedFilter = useDebounce(selectedExpertise, 0)

  const { data: userSubscriptionData } = useGetRemainingBookingByUserId(userId)

  const { data: expertiseData, isLoading: isExpertiseLoading } =
    useGetAllExpertise(1, 100)

  const { data, isLoading } = useGetAllConsultants(
    page,
    limit,
    debouncedFilter === "Tất cả" ? "" : debouncedFilter,
    debouncedSearch,
    true,
    true,
    true
  )

  useEffect(() => {
    if (data?.consultants) {
      setConsultantsData((prev) =>
        page === 1 ? data.consultants : [...prev, ...data.consultants]
      )
      setHasMore(page * limit < data.totalItems)
    }
  }, [data, page])

  useEffect(() => {
    setPage(1)
  }, [debouncedFilter, debouncedSearch])

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
    setIsRefreshing(false)
  }

  // useEffect(() => {
  //   if (userSubscription === "Gói Cơ Bản" && !hasShownModal) {
  //     setIsModalVisible(true)
  //     setHasShownModal(true)
  //   }
  // }, [userSubscription])

  const handleViewConsultant = (consultantId: string, fullName: string) => {
    addSearchConsultantHistory({ consultantId, fullName })
    router.push(`/consultants/${consultantId}`)
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader className="pt-4">
        <ConsultantExpertise
          expertiseData={expertiseData?.expertise || []}
          selectedExpertise={selectedExpertise}
          onSelectExpertise={setSelectedExpertise}
        />

        {searchConsultantHistory.length > 0 && (
          <Section
            label="Tìm kiếm gần đây"
            actionText="Xóa tất cả"
            onPress={clearSearchConsultantHistory}
          />
        )}

        <HStack gap={6} className="flex-wrap">
          {searchConsultantHistory.map((search, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() =>
                handleViewConsultant(search.consultantId, search.fullName)
              }
            >
              <Badge key={index} label={search.fullName} />
            </TouchableOpacity>
          ))}
        </HStack>

        <Section
          label="Danh sách chuyên viên"
          actionText={`Số lần đặt lịch: ${userSubscriptionData || 0}`}
        />
      </ListHeader>
    )
  }, [expertiseData, selectedExpertise, searchConsultantHistory])

  if (
    (consultantsData.length === 0 && isLoading) ||
    !expertiseData ||
    isExpertiseLoading
  )
    return <LoadingScreen />

  return (
    <>
      <Container>
        <CustomHeader
          content={
            <Input
              value={searchQuery}
              placeholder="Tìm kiếm chuyên viên..."
              onChangeText={(text) => setSearchQuery(text)}
              startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
              canClearText
            />
          }
        />

        <Content>
          <FlatList
            data={consultantsData || []}
            keyExtractor={(item, index) => `${item.consultantId}-${index}`}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={21}
            removeClippedSubviews
            updateCellsBatchingPeriod={50}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={FlatListHeader}
            renderItem={({ item }) => (
              <ConsultantCard
                key={item.consultantId}
                name={item.fullName}
                avatarUrl={item.avatarUrl}
                expertise={item.expertise}
                experience={item.experience}
                ratingCount={item.ratingCount}
                averageRating={item.averageRating}
                onPress={() =>
                  handleViewConsultant(item.consultantId, item.fullName)
                }
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
                description="Không tìm thấy có chuyên viên nào ở đây!"
                marginTop={12}
              />
            }
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </Content>
      </Container>

      {/* <Modal
        isVisible={isModalVisible}
        title="Thông báo"
        description="Bạn đang sử dụng Gói Cơ Bản. Một số tính năng có thể bị giới hạn."
        confirmText="Đồng ý"
        onClose={() => setIsModalVisible(false)}
        onConfirm={() => setIsModalVisible(false)}
      /> */}
    </>
  )
}
export default ConsultantScreen
