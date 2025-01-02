import React from "react"

import { View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { ArcProgress, WaterCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { sampleWaterData } from "@/constants/water"

export const WaterTab = () => {
  const waterData = sampleWaterData || []

  const totalWater = 2000
  const drank = 1300
  const progress = Math.min((drank / totalWater) * 100, 100)

  return (
    <View className="mt-4">
      <ArcProgress
        size={240}
        width={14}
        fill={progress}
        prefill
        arcSweepAngle={260}
        rotation={230}
        centerCircle
        value={drank}
        maxValue={totalWater}
        label="ml"
      />

      <Section label="Nhắc nhở mỗi ngày" />

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
