import React, { useRef, useState } from "react"

import { Animated, SafeAreaView, View } from "react-native"
import { FlatList } from "react-native"

import { useRouter } from "expo-router"

import { Add } from "iconsax-react-native"

import {
  Button,
  Content,
  Sheet,
  SheetItem,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
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

import { ReminderType } from "@/schemas/reminderSchema"

import LoadingScreen from "../loading"

function ReminderScreen() {
  const router = useRouter()
  const WaterSheetRef = useRef<SheetRefProps>(null)

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
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null)

  console.log(selectedReminder)

  const openMealSheet = (reminder: ReminderType) => {
    setSelectedReminder(reminder.reminderId)
    WaterSheetRef.current?.scrollTo(-150)
  }

  const closeReminderSheet = () => WaterSheetRef.current?.scrollTo(0)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
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

      <Sheet ref={WaterSheetRef} dynamicHeight={200}>
        <VStack gap={20}>
          <SheetItem item="Chỉnh sửa" isSelected={false} onSelect={() => {}} />
          <SheetItem item="Xóa" isSelected={false} onSelect={() => {}} />
        </VStack>
      </Sheet>
    </SafeAreaView>
  )
}

export default ReminderScreen
