import React from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { VStack } from "@/components/global/atoms"
import { ArcProgress, WaterCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { sampleWaterData } from "@/constants/water"

export const WaterTab = () => {
  const router = useRouter()

  const waterData = sampleWaterData || []

  const totalWater = 2000
  const drank = 1300
  const progress = Math.min((drank / totalWater) * 100, 100)

  const handleUpdateReminder = () => {
    router.push("/update-notification")
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
        {waterData.map((item) => (
          <WaterCard
            key={item.waterIntakeId}
            waterIntakeId={item.waterIntakeId}
            variant="switch"
            amount={item.amount}
            time={item.time}
            status={item.status}
            onToggleChange={(data) => {
              console.log(data)
            }}
          />
        ))}
      </VStack>
    </View>
  )
}
