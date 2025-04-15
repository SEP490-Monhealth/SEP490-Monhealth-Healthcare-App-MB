import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/color"
import { MealTypeEnum } from "@/constants/enum/Food"

import { cn } from "@/lib/utils"

import { toFixed } from "@/utils/formatters"
import { getMealTypeImage, getMealTypeName } from "@/utils/helpers"

import { Card, Progress } from "../atoms"

interface MealCardProps {
  type: MealTypeEnum
  totalFoods?: number
  totalCalories: number
  progress?: number
  labelStart?: string
  labelEnd?: string
  onPress?: () => void
}

export const MealCard = ({
  type,
  totalFoods = 0,
  totalCalories,
  progress,
  labelStart,
  labelEnd,
  onPress
}: MealCardProps) => {
  const showProgress = progress !== undefined && progress !== null
  const gapClass = showProgress ? "gap-0" : "gap-1"

  return (
    <Card onPress={onPress} className="flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          source={getMealTypeImage(type)}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className={cn("flex-1", gapClass)}>
        <Text className="font-tmedium text-base text-primary">
          {getMealTypeName("vi", type)}
        </Text>

        {showProgress && (
          <Progress
            progress={progress}
            height={7}
            color={COLORS.PRIMARY.lemon}
            labelStart={labelStart}
            labelEnd={labelEnd}
            className="mt-2"
          />
        )}

        <Text className="font-tmedium text-sm text-accent">
          {totalFoods} thức ăn • {toFixed(totalCalories, 0)} kcal
        </Text>
      </View>

      {!showProgress && <ChevronRight size={20} color={COLORS.primary} />}
    </Card>
  )
}
