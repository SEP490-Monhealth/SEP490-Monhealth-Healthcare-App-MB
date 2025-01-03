import React, { useState } from "react"

import { View } from "react-native"
import { FlatList } from "react-native"

import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import { ListFooter, WaterCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleReminderData } from "@/constants/reminders"

import { ReminderType } from "@/schemas/reminderSchema"

function ReminderScreen() {
  const [remindersData, setRemindersData] = useState(sampleReminderData)
  const [isRefreshing, setIsRefreshing] = useState(false)

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

  return (
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
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default ReminderScreen
