import React, { useRef, useState } from "react"

import { SafeAreaView, View } from "react-native"
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
import { ListFooter, WaterCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleReminderData } from "@/constants/reminders"

import { useRouterHandlers } from "@/hooks/useRouter"

import { ReminderType } from "@/schemas/reminderSchema"

function ReminderScreen() {
  const WaterSheetRef = useRef<SheetRefProps>(null)
  const { handleViewReminder } = useRouterHandlers()

  const [remindersData, setRemindersData] = useState(sampleReminderData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState<string>("")

  const openMealSheet = (reminder: ReminderType) => {
    setSelectedReminder(reminder.reminderId)
    WaterSheetRef.current?.scrollTo(-160)
  }

  const closeReminderSheet = () => WaterSheetRef.current?.scrollTo(0)

  const onRefresh = async () => {
    setIsRefreshing(true)

    try {
      const newData = await fetchRemindersData()
      setRemindersData(newData)
    } catch (error) {
      console.error("Lỗi khi làm mới dữ liệu:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const fetchRemindersData = async (): Promise<ReminderType[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleReminderData)
      }, 2000)
    })
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
