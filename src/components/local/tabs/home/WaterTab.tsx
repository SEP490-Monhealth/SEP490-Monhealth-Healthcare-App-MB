import React, { useEffect } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { VStack } from "@/components/global/atoms"
import { ArcProgress, WaterReminderCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import {
  useGetWaterReminderByUserId,
  useUpdateWaterReminderStatus
} from "@/hooks/useWaterReminder"
import { useRouterHandlers } from "@/hooks/useRouter"

interface WaterTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const WaterTab = ({ onLoading, onOverlayLoading }: WaterTabProps) => {
  const router = useRouter()
  const { handleViewWaterReminder } = useRouterHandlers()

  const { mutate: updateWaterReminderStatus } = useUpdateWaterReminderStatus()

  const { user } = useAuth()
  const userId = user?.userId

  const { data: waterRemindersData, isLoading } =
    useGetWaterReminderByUserId(userId)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const prefillReady = isFetching === 0 && isMutating === 0

  const waterGoal = 2000

  const totalConsumedWater = waterRemindersData
    ? waterRemindersData.reduce(
        (total, waterReminder) =>
          waterReminder.status ? total + waterReminder.volume : total,
        0
      )
    : 0

  const progress = Math.min((totalConsumedWater / waterGoal) * 100, 100)

  const handleUpdateWaterReminder = () => router.push("/water-reminders")

  const toggleReminderStatus = (waterReminderId: string) => {
    updateWaterReminderStatus(waterReminderId)
  }

  useEffect(() => {
    if (onLoading) {
      onLoading(!waterRemindersData || isLoading)
    }
  }, [waterRemindersData, isLoading, onLoading])

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  return (
    <View className="mt-6 h-full">
      <ArcProgress
        size={240}
        width={14}
        fill={progress}
        prefill={prefillReady}
        tintColor={COLORS.PRIMARY.water}
        arcSweepAngle={260}
        rotation={230}
        centerCircle
        value={totalConsumedWater}
        maxValue={waterGoal}
        label="ml"
      />

      <Section
        label="Nhắc nhở mỗi ngày"
        margin={false}
        action="Chỉnh sửa"
        onPress={handleUpdateWaterReminder}
      />

      <VStack gap={12}>
        {waterRemindersData?.map((item) => (
          <WaterReminderCard
            key={item.waterReminderId}
            variant="checkbox"
            name={item.name}
            time={item.time}
            volume={item.volume}
            status={item.status}
            onMorePress={() => handleViewWaterReminder(item.waterReminderId)}
            onCheckboxChange={() => toggleReminderStatus(item.waterReminderId)}
          />
        ))}
      </VStack>
    </View>
  )
}
