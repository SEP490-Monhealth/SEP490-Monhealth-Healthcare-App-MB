import React, { useState } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { VStack } from "@/components/global/atoms"
import { ArcProgress, WaterCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleReminderData } from "@/constants/reminders"

export const WaterTab = () => {
  const router = useRouter()

  const [remindersData, setRemindersData] = useState(sampleReminderData)

  const totalWater = 2000
  const drank = 1300
  const progress = Math.min((drank / totalWater) * 100, 100)

  const toggleReminderStatus = (reminderId: string) => {
    setRemindersData((prevData) =>
      prevData.map((reminder) =>
        reminder.reminderId === reminderId
          ? { ...reminder, status: !reminder.status }
          : reminder
      )
    )
  }

  const handleUpdateReminder = () => {
    router.push("/reminders")
  }

  return (
    <View className="mt-6">
      <ArcProgress
        size={240}
        width={14}
        fill={progress}
        prefill
        tintColor={COLORS.water}
        arcSweepAngle={260}
        rotation={230}
        centerCircle
        value={drank}
        maxValue={totalWater}
        label="ml"
      />

      <Section
        label="Nhắc nhở mỗi ngày"
        action="Chỉnh sửa"
        onPress={handleUpdateReminder}
      />

      <VStack gap={12}>
        {remindersData.map((item) => (
          <WaterCard
            key={item.reminderId}
            variant="switch"
            name={item.name}
            time={item.time}
            volume={item.volume}
            status={item.status}
            onSwitchChange={() => toggleReminderStatus(item.reminderId)}
          />
        ))}
      </VStack>
    </View>
  )
}
