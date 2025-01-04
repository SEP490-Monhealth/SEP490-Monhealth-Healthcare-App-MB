import React, { useRef, useState } from "react"

import { Alert, Animated, SafeAreaView, View } from "react-native"
import { FlatList } from "react-native"

import { router } from "expo-router"

import { Add, Edit2, Notification, Trash } from "iconsax-react-native"

import {
  Content,
  Sheet,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import {
  ListFooter,
  ListHeader,
  WaterCard
} from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import { useAnimation } from "@/hooks/useAnimation"
import {
  useChangeReminderStatus,
  useDeleteReminder,
  useGetReminderByUserId
} from "@/hooks/useReminder"
import { useRouterHandlers } from "@/hooks/useRouter"

import { ReminderType } from "@/schemas/reminderSchema"

import LoadingScreen from "../loading"

function ReminderScreen() {
  const WaterSheetRef = useRef<SheetRefProps>(null)
  const { handleViewReminder } = useRouterHandlers()

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const { user } = useAuth()
  const userId = user?.userId

  const {
    data: remindersData,
    isLoading,
    refetch
  } = useGetReminderByUserId(userId)

  const { mutate: deleteReminder } = useDeleteReminder()
  const { mutate: updateReminderStatus } = useChangeReminderStatus()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState<string>("")

  const selectedReminderStatus = remindersData?.find(
    (reminder) => reminder.reminderId === selectedReminder
  )?.status

  const openMealSheet = (reminder: ReminderType) => {
    setSelectedReminder(reminder.reminderId)
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
      deleteReminder(selectedReminder)
    }
  }

  const handleUpdateReminderStatus = () => {
    if (selectedReminder) {
      updateReminderStatus(selectedReminder)
    }
    closeReminderSheet()
  }

  const handleDeleteReminder = () => {
    closeReminderSheet()
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa nhắc nhở?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: handleDelete,
          style: "destructive"
        }
      ],
      { cancelable: true }
    )
  }
  const handleUpdateReminder = (reminderId: string) => {
    handleViewReminder(reminderId)
    closeReminderSheet()
  }

  const handleBack = () => {
    router.push("/(tabs)/home")
  }

  if (!remindersData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6">
        <Header
          back
          onBackPress={handleBack}
          label="Nhắc nhở uống nước"
          action={{
            icon: <Add size={24} color={COLORS.primary} />,
            href: "/reminders/create"
          }}
        />

        <Content className="mt-2">
          <FlatList
            data={remindersData || []}
            keyExtractor={(item) => item.reminderId}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ListHeader />}
            renderItem={({ item }) => (
              <WaterCard
                key={item.reminderId}
                variant="more"
                name={item.name}
                time={item.time}
                volume={item.volume}
                status={item.status}
                onPress={() => handleViewReminder(item.reminderId)}
                onMorePress={() => openMealSheet(item)}
              />
            )}
            ListEmptyComponent={() => (
              <VStack center gap={20} className="mt-24">
                <View className="w-full items-center">
                  <Animated.Image
                    source={require("../../../public/images/monhealth-no-data-image.png")}
                    style={{
                      width: 320,
                      height: 320,
                      opacity: fadeAnim,
                      transform: [{ scale: scaleAnim }]
                    }}
                  />
                </View>

                <VStack>
                  <Animated.Text
                    style={{
                      opacity: textFadeAnim,
                      transform: [{ translateY: textTranslateAnim }]
                    }}
                    className="text-center font-tbold text-3xl text-primary"
                  >
                    Không có dữ liệu
                  </Animated.Text>

                  <Animated.Text
                    style={{
                      opacity: textFadeAnim,
                      transform: [{ translateY: textTranslateAnim }]
                    }}
                    className="text-center font-tmedium text-lg text-accent"
                  >
                    Bạn chưa lưu món ăn nào trong danh sách
                  </Animated.Text>
                </VStack>
              </VStack>
            )}
            ListFooterComponent={<ListFooter />}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </Content>
      </View>

      <Sheet ref={WaterSheetRef} dynamicHeight={210}>
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
          onPress={handleDeleteReminder}
        />

        <SheetSelect
          variant="danger"
          label="Xóa"
          icon={<Trash variant="Bold" size={24} color="#ef4444" />}
          onPress={handleDeleteReminder}
        />
      </Sheet>
    </SafeAreaView>
  )
}

export default ReminderScreen
