import React from "react"

import { Text } from "react-native"

import { Star1 } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { Card, HStack, VStack } from "../atoms"

interface ExpertDetailProps {
  experience: number
  rating: number
  patient: number
  className?: string
}

export const ExpertDetail = ({
  experience,
  rating,
  patient,
  className = ""
}: ExpertDetailProps) => {
  return (
    <Card className={className}>
      <HStack center className="flex justify-between">
        <VStack center gap={6}>
          <Text className="font-tbold text-2xl text-primary">
            {experience}+
          </Text>
          <Text className="font-tmedium text-secondary">Kinh nghiệm</Text>
        </VStack>
        <VStack center gap={6}>
          <Text className="font-tbold text-2xl text-primary">{patient}+</Text>
          <Text className="font-tmedium text-secondary">Khách hàng</Text>
        </VStack>
        <VStack center gap={6}>
          <HStack center>
            <Text className="font-tbold text-2xl text-primary">{rating}</Text>
            <Star1 variant="Bold" size="14" color={COLORS.primary} />
          </HStack>

          <Text className="font-tmedium text-secondary">Đánh giá</Text>
        </VStack>
      </HStack>
    </Card>
  )
}
