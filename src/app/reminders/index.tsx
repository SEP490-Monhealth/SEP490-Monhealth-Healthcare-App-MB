import React, { useRef, useState } from "react"

import { Image, SafeAreaView, View } from "react-native"
import { FlatList } from "react-native"

import { useRouter } from "expo-router"

import { Add } from "iconsax-react-native"

import {
  Button,
  Container,
  Content,
  HStack,
  Sheet,
  SheetRefProps
} from "@/components/global/atoms"
import { ListFooter, WaterCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleReminderData } from "@/constants/reminders"

import { ReminderType } from "@/schemas/reminderSchema"

function ReminderScreen() {
  const router = useRouter()
  const [remindersData, setRemindersData] = useState(sampleReminderData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const WaterSheetRef = useRef<SheetRefProps>(null)
  const [selectedReminderId, setSelectedReminderId] = useState<string | null>(
    null
  )
  const openMealSheet = (reminder: ReminderType) => {
    setSelectedReminderId(reminder.reminderId)
    WaterSheetRef.current?.scrollTo(-150)
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
    if (selectedReminderId) {
      console.log("Deleting reminder with ID:", selectedReminderId)
      closeReminderSheet()
    }
  }

  const handleUpdateReminder = () => {
    if (selectedReminderId) {
      const reminder = remindersData.find(
        (r) => r.reminderId === selectedReminderId
      )
      if (reminder) {
        router.push({
          pathname: "/reminders/update",
          params: {
            reminder: JSON.stringify(reminder)
          }
        })
      }
    }
    closeReminderSheet()
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Container>
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
      </Container>
      <Sheet ref={WaterSheetRef} dynamicHeight={150}>
        <HStack gap={20}>
          <Button variant="danger" icon={true} size="lg" onPress={handleDelete}>
            <Image
              source={require("../../../public/icons/delete.png")}
              style={{
                width: 20,
                height: 20
              }}
              className="object-cover"
            />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onPress={handleUpdateReminder}
            className="flex-1"
          >
            Chỉnh sửa
          </Button>
        </HStack>
      </Sheet>
    </SafeAreaView>
  )
}

export default ReminderScreen
