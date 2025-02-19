import React, { useRef, useState } from "react"

import { SafeAreaView, View } from "react-native"
import { FlatList } from "react-native"

import { router } from "expo-router"

import { Add, Edit2, Notification, Trash } from "iconsax-react-native"

import {
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
  WaterReminderCard
} from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import { useRouterHandlers } from "@/hooks/useRouter"
import {
  useDeleteWaterReminder,
  useGetWaterReminderByUserId,
  useUpdateWaterReminderStatus
} from "@/hooks/useWaterReminder"

import { WaterReminderType } from "@/schemas/waterReminderSchema"

import { LoadingScreen } from "../loading"

function WaterReminderScreen() {
  const WaterSheetRef = useRef<SheetRefProps>(null)
  const { handleViewWaterReminder } = useRouterHandlers()

  const { user } = useAuth()
  const userId = user?.userId

  const {
    data: remindersData,
    isLoading,
    refetch
  } = useGetWaterReminderByUserId(userId)

  const { mutate: updateWaterReminderStatus } = useUpdateWaterReminderStatus()
  const { mutate: deleteWaterReminder } = useDeleteWaterReminder()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState<string>("")

  const selectedReminderStatus = remindersData?.find(
    (waterReminder) => waterReminder.waterReminderId === selectedReminder
  )?.status

  const openMealSheet = (waterReminder: WaterReminderType) => {
    setSelectedReminder(waterReminder.waterReminderId)
    WaterSheetRef.current?.scrollTo(-240)
  }

  const closeReminderSheet = () => WaterSheetRef.current?.scrollTo(0)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }

  const handleDelete = () => {
    if (selectedReminder) {
      deleteWaterReminder(selectedReminder)
      setIsModalVisible(false)
    }
  }

  const handleUpdateReminderStatus = () => {
    if (selectedReminder) {
      updateWaterReminderStatus(selectedReminder)
    }

    closeReminderSheet()
  }

  const handleDeleteReminder = () => {
    closeReminderSheet()
    setIsModalVisible(true)
  }

  const handleUpdateReminderWrapper = () => {
    if (!selectedReminder) return
    handleUpdateReminder(selectedReminder)
  }

  const handleUpdateReminder = (waterReminderId: string) => {
    handleViewWaterReminder(waterReminderId)
    closeReminderSheet()
  }

  const handleBack = () => {
    router.replace({ pathname: "/tabs/user/home", params: { tab: "water" } })
  }

  if (!remindersData || isLoading) <LoadingScreen />

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6">
        <Header
          back
          onBackPress={handleBack}
          label="Nhắc nhở uống nước"
          action={{
            icon: <Add size={24} color={COLORS.primary} />,
            href: "/water-reminders/create"
          }}
        />

        <Content className="mt-2">
          <FlatList
            data={remindersData || []}
            keyExtractor={(item) => item.waterReminderId}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ListHeader />}
            renderItem={({ item }) => (
              <WaterReminderCard
                key={item.waterReminderId}
                variant="more"
                name={item.name}
                time={item.time}
                volume={item.volume}
                status={item.status}
                onPress={() => handleViewWaterReminder(item.waterReminderId)}
                onMorePress={() => openMealSheet(item)}
              />
            )}
            ListEmptyComponent={() => (
              <ErrorDisplay
                imageSource={require("../../../public/images/monhealth-no-data-image.png")}
                title="Không có nhắc nhở"
                description="Bạn chưa tạo nhắc nhở nào. Hãy thêm nhắc nhở để theo dõi lượng nước hàng ngày của bạn"
                marginTop={24}
              />
            )}
            ListFooterComponent={<ListFooter />}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </Content>
      </View>

      <Sheet ref={WaterSheetRef} dynamicHeight={240}>
        <SheetSelect
          label={selectedReminderStatus ? "Tắt nhắc nhở" : "Bật nhắc nhở"}
          icon={
            <Notification
              variant={selectedReminderStatus ? "Bold" : "Linear"}
              size={24}
              color={COLORS.primary}
            />
          }
          onPress={handleUpdateReminderStatus}
        />

        <SheetSelect
          label="Chỉnh sửa"
          icon={<Edit2 variant="Bold" size="24" color={COLORS.primary} />}
          onPress={handleUpdateReminderWrapper}
        />

        <SheetSelect
          variant="danger"
          label="Xóa"
          icon={<Trash variant="Bold" size={24} color={COLORS.destructive} />}
          onPress={handleDeleteReminder}
        />
      </Sheet>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Xóa nhắc nhở"
        description="Bạn có chắc chắn muốn xóa nhắc nhở này không?"
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDelete}
      />
    </SafeAreaView>
  )
}

export default WaterReminderScreen
