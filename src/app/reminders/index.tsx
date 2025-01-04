import React, { useRef, useState } from "react"

import { Alert, Animated, SafeAreaView, View } from "react-native"
import { FlatList } from "react-native"

import { router } from "expo-router"

import { Add } from "iconsax-react-native"
import { BellDot, BellOff, Settings, Trash2 } from "lucide-react-native"

import {
  Content,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { SheetSelect } from "@/components/global/atoms/SheetItem"
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

  const { mutate: deleteReminder } = useDeleteReminder()

  const { mutate: patchReminder } = useChangeReminderStatus()

  const {
    data: remindersData,
    isLoading,
    refetch
  } = useGetReminderByUserId(userId)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState<string>("")

  const selectedReminderStatus = remindersData?.find(
    (reminder) => reminder.reminderId === selectedReminder
  )?.status

  const openMealSheet = (reminder: ReminderType) => {
    setSelectedReminder(reminder.reminderId)
    WaterSheetRef.current?.scrollTo(-210)
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

  const handlePatchStatus = () => {
    if (selectedReminder) {
      patchReminder(selectedReminder)
    }
    closeReminderSheet()
  }

  const handleUpdateReminderWrapper = () => {
    if (!selectedReminder) return
    handleUpdateReminder(selectedReminder)
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
        <VStack gap={20} className="px-2">
          <SheetSelect
            label={selectedReminderStatus ? "Tắt thông báo" : "Bật thông báo"}
            icon={
              <View>
                {selectedReminderStatus ? (
                  <BellOff size={24} color={COLORS.primary} />
                ) : (
                  <BellDot size={24} color={COLORS.primary} />
                )}
              </View>
            }
            onPress={handlePatchStatus}
          />

          <SheetSelect
            label="Chỉnh sửa"
            icon={
              <View>
                <Settings size="24" color={COLORS.primary}/>
              </View>
            }
            onPress={handleUpdateReminderWrapper}
          />

          <SheetSelect
            variant="danger"
            label="Xóa"
            icon={
              <View>
                <Trash2 size={24} color="#ef4444" />
              </View>
            }
            onPress={handleDeleteReminder}
          />
        </VStack>
      </Sheet>
    </SafeAreaView>
  )
}

export default ReminderScreen
