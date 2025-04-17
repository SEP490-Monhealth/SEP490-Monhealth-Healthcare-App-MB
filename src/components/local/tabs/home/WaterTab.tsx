import React, { useCallback, useEffect } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { WaterReminderCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useGetWaterIntakeGoal } from "@/hooks/useGoal"
import {
  useGetDailyWaterIntakeByUserId,
  useGetWaterReminderByUserId,
  useUpdateWaterReminderDrunk
} from "@/hooks/useWaterReminder"

import { formatDateY } from "@/utils/formatters"

import { WaterIntakeProgress } from "./WaterIntakeProgress"

interface WaterTabProps {
  onOverlayLoading: (isLoading: boolean) => void
}

export const WaterTab = ({ onOverlayLoading }: WaterTabProps) => {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const today = formatDateY(new Date())

  const { mutate: updateWaterReminderDrunk } = useUpdateWaterReminderDrunk()

  const { data: dailyWaterIntakeData } = useGetDailyWaterIntakeByUserId(
    userId,
    today
  )
  const { data: waterRemindersData } = useGetWaterReminderByUserId(userId, true)
  const { data: waterIntakeGoalData } = useGetWaterIntakeGoal(userId)

  const waterIntakesValue = dailyWaterIntakeData?.totalVolume || 0
  const waterIntakesGoal = waterIntakeGoalData?.waterIntakesGoal || 0

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  // const prefillReady = isFetching === 0 && isMutating === 0

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  // const dailyWaterIntakeProgress =
  //   waterIntakesGoal > 0 ? (waterIntakesValue / waterIntakesGoal) * 100 : 0

  const handleDrunkWaterReminder = useCallback(
    (waterReminderId: string) => {
      if (!userId) return

      updateWaterReminderDrunk({ waterReminderId, userId, today })
    },
    [updateWaterReminderDrunk]
  )

  const data = {
    label: "Water",
    value: waterIntakesValue,
    targetValue: waterIntakesGoal
  }

  const handleViewWaterReminders = () => {
    router.push("/water-reminders")
  }

  const handleViewWaterReminder = (waterReminderId: string) => {
    router.push(`/water-reminders/${waterReminderId}`)
  }

  return (
    <View className="mt-6 h-full">
      <HStack className="justify-center">
        <WaterIntakeProgress waterIntakeData={data} />
      </HStack>

      {/* <ArcProgress
        size={240}
        width={14}
        fill={dailyWaterIntakeProgress}
        prefill={prefillReady}
        tintColor={COLORS.PRIMARY.water}
        arcSweepAngle={260}
        rotation={230}
        centerCircle
        value={dailyWaterIntakeData?.volume || 0}
        maxValue={waterIntakesGoal}
        label="ml"
      /> */}

      <Section
        label="Nhắc nhở mỗi ngày"
        actionText="Cập nhật"
        onPress={handleViewWaterReminders}
        className="mt-8"
      />

      <VStack gap={12}>
        {waterRemindersData?.map((item) => (
          <WaterReminderCard
            key={item.waterReminderId}
            variant="checkbox"
            name={item.name}
            time={item.time}
            volume={item.volume}
            isDrunk={item.isDrunk}
            onMorePress={() => handleViewWaterReminder(item.waterReminderId)}
            onCheckboxChange={() =>
              handleDrunkWaterReminder(item.waterReminderId)
            }
          />
        ))}
      </VStack>
    </View>
  )
}
