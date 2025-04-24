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
  SheetSelect
} from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  ScheduleExceptionCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import {
  useDeleteScheduleException,
  useGetScheduleExceptionByConsultantId
} from "@/hooks/useScheduleException"

import { ScheduleExceptionType } from "@/schemas/scheduleExceptionSchema"

function ScheduleExceptionsScreen() {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const SheetRef = useRef<SheetRefProps>(null)

  const [scheduleExceptionsData, setScheduleExceptionsData] = useState<
    ScheduleExceptionType[]
  >([])

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedScheduleExceptionId, setSelectedScheduleExceptionId] =
    useState<string | null>("")

  const openSheetAction = () => SheetRef.current?.scrollTo(-200)
  const closeSheetAction = () => SheetRef.current?.scrollTo(0)

  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { data, isLoading, refetch } = useGetScheduleExceptionByConsultantId(
    consultantId,
    page,
    limit
  )

  const { mutate: deleteScheduleException } = useDeleteScheduleException()

  useEffect(() => {
    if (data?.scheduleExceptions) {
      setScheduleExceptionsData((prev) =>
        page === 1
          ? data.scheduleExceptions
          : [...prev, ...data.scheduleExceptions]
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

  const handleAction = (exceptionId: string) => {
    if (exceptionId) {
      setSelectedScheduleExceptionId(exceptionId)
      openSheetAction()
    }
  }
  const handleUpdate = () => {
    closeSheetAction()

    router.push(
      `/settings/consultant/${consultantId}/exceptions/${selectedScheduleExceptionId}/update`
    )

    setSelectedScheduleExceptionId(null)
  }

  const handleDelete = () => {
    closeSheetAction()
    setIsModalVisible(true)
  }

  const handleConfirm = () => {
    if (selectedScheduleExceptionId) {
      deleteScheduleException(selectedScheduleExceptionId)
    }
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        {scheduleExceptionsData.length > 0 && (
          <Section label="Danh sách lịch bận" margin={false} className="pt-2" />
        )}
      </ListHeader>
    )
  }, [scheduleExceptionsData.length])

  if (scheduleExceptionsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header
            back
            label="Lịch nghỉ"
            action={{
              icon: <Add size={24} color={COLORS.primary} />,
              href: `/settings/consultant/${consultantId}/exceptions/create`
            }}
          />

          <Content className="mt-2">
            <FlatList
              data={scheduleExceptionsData || []}
              keyExtractor={(item, index) =>
                `${item.scheduleExceptionId}-${index}`
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
                <ScheduleExceptionCard
                  date={item.date}
                  reason={item.reason}
                  onPress={() => handleAction(item.scheduleExceptionId)}
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
                  imageSource={require("../../../../../../public/images/monhealth-no-data-image.png")}
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
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Xóa lịch bận"
          description="Bạn có chắc chắn muốn xóa lịch bận này không?"
          confirmText="Đồng ý"
          cancelText="Hủy"
          onConfirm={handleConfirm}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ScheduleExceptionsScreen
