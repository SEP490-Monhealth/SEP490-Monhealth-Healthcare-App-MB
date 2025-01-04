import React, { useRef, useState } from "react"

import { Animated, SafeAreaView, View } from "react-native"
import { FlatList } from "react-native"

import { Add, Edit } from "iconsax-react-native"
import { Trash2 } from "lucide-react-native"

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
import { sampleReminderData } from "@/constants/reminders"

import { useAuth } from "@/contexts/AuthContext"

import { useAnimation } from "@/hooks/useAnimation"
import { useGetReminderByUserId } from "@/hooks/useReminder"
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

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState<string>("")

  console.log(selectedReminder)

  const openMealSheet = (reminder: ReminderType) => {
    setSelectedReminder(reminder.reminderId)
    WaterSheetRef.current?.scrollTo(-160)
  }

  const closeReminderSheet = () => WaterSheetRef.current?.scrollTo(0)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }

  const handleDelete = () => {
    if (selectedReminder) {
      console.log("Deleting reminder with ID:", selectedReminder)
      closeReminderSheet()
    }
  }

  const handleUpdateReminderWrapper = () => {
    if (!selectedReminder) return
    handleUpdateReminder(selectedReminder)
  }

  const handleUpdateReminder = (reminderId: string) => {
    handleViewReminder(reminderId)
    closeReminderSheet()
  }

  if (!remindersData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6">
        <Header
          back
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

      <Sheet ref={WaterSheetRef} dynamicHeight={160}>
        <VStack gap={20} className="px-2">
          <SheetSelect
            label="Chỉnh sửa"
            icon={
              <View>
                <Edit size="24" color={COLORS.primary} />
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
            onPress={handleDelete}
          />
        </VStack>
      </Sheet>
    </SafeAreaView>
  )
}

export default ReminderScreen
