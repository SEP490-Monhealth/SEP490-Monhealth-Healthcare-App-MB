import React from "react"

import { Text, View } from "react-native"

import { HStack, VStack } from "@/components/global/atoms"
import { MealCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { MealTypeEnum } from "@/constants/enum/Food"

import { BarChart } from "./BarChart"

const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

const bookingData = [
  { date: "2025-03-24", calories: 500 },
  { date: "2025-03-25", calories: 1500 },
  { date: "2025-03-26", calories: 2500 },
  { date: "2025-03-27", calories: 1000 },
  { date: "2025-03-28", calories: 700 },
  { date: "2025-03-29", calories: 800 },
  { date: "2025-03-30", calories: 2000 }
]

interface BookingTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const BookingTab = ({
  onLoading,
  onOverlayLoading
}: BookingTabProps) => {
  const today = "2025-03-29"

  return (
    <>
      <VStack className="px-2">
        <Text className="font-tbold text-xl text-secondary">Tổng quan</Text>

        <HStack className="-mb-2 items-center justify-between">
          <HStack className="items-end">
            <Text className="font-tbold text-3xl text-primary">3000</Text>
            <Text className="mb-1 font-tmedium text-base text-secondary">
              tổng kcal
            </Text>
          </HStack>

          <Text className="font-tmedium text-primary">3 - 9 Tháng 2 2025</Text>
        </HStack>
      </VStack>

      <BarChart date={today} labels={labels} data={bookingData} />

      <Section label="Chi tiết bữa ăn" />

      <VStack gap={12}>
        <MealCard
          type={MealTypeEnum.Breakfast}
          totalFoods={3}
          totalCalories={800}
          progress={75}
        />

        <MealCard
          type={MealTypeEnum.Lunch}
          totalFoods={3}
          totalCalories={800}
          progress={70}
        />

        <MealCard
          type={MealTypeEnum.Dinner}
          totalFoods={3}
          totalCalories={1000}
          progress={100}
        />

        <MealCard
          type={MealTypeEnum.Snack}
          totalFoods={1}
          totalCalories={300}
          progress={65}
        />
      </VStack>
    </>
  )
}
