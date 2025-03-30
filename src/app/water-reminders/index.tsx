import React, { useRef, useState } from "react"

import { SafeAreaView, View } from "react-native"
import { FlatList } from "react-native"

import { useRouter } from "expo-router"

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

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import {
  useDeleteWaterReminder,
  useGetWaterReminderByUserId,
  useUpdateWaterReminderStatus
} from "@/hooks/useWaterReminder"

import { WaterReminderType } from "@/schemas/waterReminderSchema"

import { LoadingScreen } from "../loading"

function WaterRemindersScreen() {
  const router = useRouter()

  const WaterSheetRef = useRef<SheetRefProps>(null)

  const { user } = useAuth()
  const userId = user?.userId

  const { mutate: updateWaterReminderStatus } = useUpdateWaterReminderStatus()
  const { mutate: deleteWaterReminder } = useDeleteWaterReminder()

  const {
    data: remindersData,
    isLoading,
    refetch
  } = useGetWaterReminderByUserId(userId)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState<string>("")

  const selectedReminderStatus = remindersData?.find(
    (waterReminder) => waterReminder.waterReminderId === selectedReminder
  )?.status

  const openWaterReminderSheet = (waterReminder: WaterReminderType) => {
    setSelectedReminder(waterReminder.waterReminderId)
    WaterSheetRef.current?.scrollTo(-240)
  }

  const closeWaterReminderSheet = () => WaterSheetRef.current?.scrollTo(0)

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

    closeWaterReminderSheet()
  }

  const handleDeleteReminder = () => {
    closeWaterReminderSheet()
    setIsModalVisible(true)
  }

  const handleUpdateReminderWrapper = () => {
    if (!selectedReminder) return
    handleUpdateReminder(selectedReminder)
  }

  const handleUpdateReminder = (waterReminderId: string) => {
    handleViewWaterReminder(waterReminderId)
    closeWaterReminderSheet()
  }

  const handleViewWaterReminder = (waterReminderId: string) => {
    router.push(`/water-reminders/${waterReminderId}`)
  }

  const handleBack = () => {
    router.replace({ pathname: "/(tabs)/user/home", params: { tab: "water" } })
  }

  if (!remindersData || isLoading) return <LoadingScreen />

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
                isDrunk={item.status}
                onPress={() => handleViewWaterReminder(item.waterReminderId)}
                onMorePress={() => openWaterReminderSheet(item)}
              />
            )}
            ListEmptyComponent={() => (
              <ErrorDisplay
                imageSource={require("../../../public/images/monhealth-no-data-image.png")}
                title="Không có dữ liệu"
                description="Không tìm thấy có nhắc nhở uống nước nào ở đây!"
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

export default WaterRemindersScreen
