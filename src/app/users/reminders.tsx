import React, { useState } from "react"

import { Text } from "react-native"

import { Container, Content, Toggle, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/profile"

const reminderOptions = [
  { key: "notifications", label: "Bật thông báo" },
  { key: "reminders", label: "Bật nhắc nhở" }
]

function RemindersScreen() {
  const [reminderSettings, setReminderSettings] = useState<
    Record<string, boolean>
  >({
    notifications: false,
    reminders: false
  })

  const toggleSwitch = (key: string) => {
    setReminderSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <Container>
      <Header back label="Nhắc nhở" />

      <Content className="mt-2">
        <VStack>
          {reminderOptions.map((option) => (
            <ListItem
              key={option.key}
              label={option.label}
              endIcon={
                <Toggle
                  value={reminderSettings[option.key]}
                  onValueChange={() => toggleSwitch(option.key)}
                />
              }
              more={false}
              onPress={() => toggleSwitch(option.key)}
            />
          ))}

          {reminderSettings.notifications && reminderSettings.reminders && (
            <Text className="mt-2 text-base text-accent">
              Bạn đã bật thông báo và nhắc nhở. Hãy sẵn sàng nhận thông tin cập
              nhật và nhắc nhở hàng ngày!
            </Text>
          )}

          {reminderSettings.notifications && !reminderSettings.reminders && (
            <Text className="mt-2 text-base text-accent">
              Thông báo đã được bật, bạn sẽ nhận được thông tin cập nhật quan
              trọng.
            </Text>
          )}

          {!reminderSettings.notifications && reminderSettings.reminders && (
            <Text className="mt-2 text-base text-accent">
              Nhắc nhở đã được bật, bạn sẽ nhận thông báo nhắc nhở hàng ngày.
            </Text>
          )}
        </VStack>
      </Content>
    </Container>
  )
}

export default RemindersScreen
