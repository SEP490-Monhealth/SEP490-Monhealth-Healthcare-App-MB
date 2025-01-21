import React, { useCallback, useEffect } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { WaterReminderCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useGetDailyWaterIntakeByUserId } from "@/hooks/useDailyWaterIntake"
import { useGetWaterIntakeGoal } from "@/hooks/useGoal"
import { useRouterHandlers } from "@/hooks/useRouter"
import {
  useGetWaterReminderByUserId,
  useUpdateWaterReminderDrunk
} from "@/hooks/useWaterReminder"

import { formatDateYYYYMMDD } from "@/utils/formatters"

import { WaterIntakeProgress } from "./WaterIntakeProgress"

interface WaterTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const WaterTab = ({ onLoading, onOverlayLoading }: WaterTabProps) => {
  const router = useRouter()
  const { handleViewWaterReminder } = useRouterHandlers()

  const { user } = useAuth()
  const userId = user?.userId

  const today = formatDateYYYYMMDD(new Date())

  const { data: dailyWaterIntakeData, isLoading: isDailyWaterIntakeLoading } =
    useGetDailyWaterIntakeByUserId(userId, today)

  const { data: waterRemindersData, isLoading: isWaterReminderLoading } =
    useGetWaterReminderByUserId(userId)

  const { data: waterIntakeGoalData, isLoading: isGoalLoading } =
    useGetWaterIntakeGoal(userId)

  const { mutate: updateWaterReminderDrunk } = useUpdateWaterReminderDrunk()

  const waterIntakesValue = dailyWaterIntakeData?.volume || 0
  const waterIntakesGoal = waterIntakeGoalData?.waterIntakesGoal || 0

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  // const prefillReady = isFetching === 0 && isMutating === 0

  useEffect(() => {
    if (onLoading) {
      onLoading(
        !dailyWaterIntakeData ||
          isDailyWaterIntakeLoading ||
          !waterRemindersData ||
          isWaterReminderLoading ||
          !waterIntakeGoalData ||
          isGoalLoading
      )
    }
  }, [
    dailyWaterIntakeData,
    isDailyWaterIntakeLoading,
    waterRemindersData,
    isWaterReminderLoading,
    waterIntakeGoalData,
    isGoalLoading,
    onLoading
  ])

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  // const dailyWaterIntakeProgress =
  //   waterIntakesGoal > 0 ? (waterIntakesValue / waterIntakesGoal) * 100 : 0

  const handleUpdateWaterReminder = () => router.push("/water-reminders")

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
        action="Chỉnh sửa"
        onPress={handleUpdateWaterReminder}
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
