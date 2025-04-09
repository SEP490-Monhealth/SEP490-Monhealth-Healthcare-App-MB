import React from "react"

import { Text } from "react-native"

import { HStack, VStack } from "@/components/global/atoms"

import { toFixed } from "@/utils/formatters"

interface ConsultantOverviewProps {
  experience: number
  patients?: number
  rating: number
}

export const ConsultantOverview = ({
  experience,
  patients = 0,
  rating
}: ConsultantOverviewProps) => {
  return (
    <HStack center className="flex justify-between px-2">
      <VStack center gap={0}>
        <Text className="font-tbold text-xl text-primary">
          {experience} năm
        </Text>
        <Text className="font-tmedium text-base text-accent">Kinh nghiệm</Text>
      </VStack>

      <VStack center gap={0}>
        <Text className="font-tbold text-xl text-primary">{patients}</Text>
        <Text className="font-tmedium text-base text-accent">Khách hàng</Text>
      </VStack>

      <VStack center gap={0}>
        <Text className="font-tbold text-xl text-primary">
          {toFixed(rating, 1)}
        </Text>
        <Text className="font-tmedium text-base text-accent">Đánh giá</Text>
      </VStack>
    </HStack>
  )
}
