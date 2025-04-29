import React, { useCallback, useEffect } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, VStack } from "@/components/global/atoms"
import { ErrorDisplay, WaterReminderCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useGetWaterIntakeGoal } from "@/hooks/useGoal"
import { useGetDailyWaterIntakeByUserId } from "@/hooks/useTracker"
import {
  useGetWaterReminderByUserId,
  useUpdateWaterReminderDrunk
} from "@/hooks/useWaterReminder"

import { formatDateY } from "@/utils/formatters"

import { WaterIntakeProgress } from "./WaterIntakeProgress"

interface WaterTabProps {
  userId?: string
  onOverlayLoading: (isLoading: boolean) => void
}

export const WaterTab = ({ userId, onOverlayLoading }: WaterTabProps) => {
  const router = useRouter()

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

      updateWaterReminderDrunk({ waterReminderId })
    },
    [userId, updateWaterReminderDrunk]
  )

  const waterIntakeData = {
    label: "Water",
    value: waterIntakesValue,
    targetValue: waterIntakesGoal
  }

  const handleViewWaterReminders = () => {
    router.push("/water-reminders")
  }

  return (
    <View className="mt-6 h-full">
      <HStack className="justify-center">
        <WaterIntakeProgress waterIntakeData={waterIntakeData} />
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
        label="Nhắc nhở hôm nay"
        actionText="Cập nhật"
        onPress={handleViewWaterReminders}
      />

      {waterRemindersData && waterRemindersData.length === 0 ? (
        <VStack gap={12}>
          {waterRemindersData?.map((item) => (
            <WaterReminderCard
              key={item.waterReminderId}
              variant="checkbox"
              name={item.name}
              time={item.time}
              volume={item.volume}
              isDrunk={item.isDrunk}
              onCheckboxChange={() =>
                handleDrunkWaterReminder(item.waterReminderId)
              }
            />
          ))}
        </VStack>
      ) : (
        <ErrorDisplay
          imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
          title="Không có dữ liệu"
          description="Không tìm thấy có nhắc nhở uống nước nào ở đây!"
          marginTop={12}
        />
      )}
    </View>
  )
}
