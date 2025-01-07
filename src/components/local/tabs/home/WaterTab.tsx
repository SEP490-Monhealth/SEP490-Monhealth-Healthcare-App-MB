import React, { useEffect } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { VStack } from "@/components/global/atoms"
import { ArcProgress, WaterCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import {
  useGetReminderByUserId,
  useUpdateReminderStatus
} from "@/hooks/useReminder"
import { useRouterHandlers } from "@/hooks/useRouter"

interface WaterTabProps {
  onLoading: (isLoading: boolean) => void
}

export const WaterTab = ({ onLoading }: WaterTabProps) => {
  const router = useRouter()
  const { handleViewReminder } = useRouterHandlers()

  const { mutate: patchReminder } = useUpdateReminderStatus()

  const { user } = useAuth()
  const userId = user?.userId

  const { data: remindersData, isLoading } = useGetReminderByUserId(userId)

  useEffect(() => {
    onLoading(!remindersData || isLoading)
  }, [remindersData, isLoading, onLoading])

  const goalWater = 2000

  const totalConsumedWater = remindersData
    ? remindersData.reduce(
        (total, reminder) =>
          reminder.status ? total + reminder.volume : total,
        0
      )
    : 0

  const progress = Math.min((totalConsumedWater / goalWater) * 100, 100)

  const handleUpdateReminder = () => {
    router.push("/reminders")
  }

  const toggleReminderStatus = (reminderId: string) => {
    patchReminder(reminderId)
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
        value={totalConsumedWater}
        maxValue={goalWater}
        label="ml"
      />

      <Section
        label="Nhắc nhở mỗi ngày"
        margin={false}
        action="Chỉnh sửa"
        onPress={handleUpdateReminder}
      />

      <VStack gap={12}>
        {remindersData?.map((item) => (
          <WaterCard
            key={item.reminderId}
            variant="checkbox"
            name={item.name}
            time={item.time}
            volume={item.volume}
            status={item.status}
            onMorePress={() => handleViewReminder(item.reminderId)}
            onCheckboxChange={() => toggleReminderStatus(item.reminderId)}
          />
        ))}
      </VStack>
    </View>
  )
}
