import React, { useEffect } from "react"

import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, VStack } from "@/components/global/atoms"

import { DATA } from "@/constants/data"
import { GoalTypeEnum } from "@/constants/enum/Goal"

import { useSetupStore } from "@/stores/setupStore"

interface SetupCaloriesRatioProps {
  control: Control<FieldValues>
}

function SetupCaloriesRatio({ control }: SetupCaloriesRatioProps) {
  const { goalType } = useSetupStore()

  const { field } = useController({
    name: "caloriesRatio",
    control
  })

  const caloriesRatioData = DATA.CALORIES_RATIO.filter((ratio) => {
    if (goalType === GoalTypeEnum.WeightLoss) return ratio.value < 1
    if (goalType === GoalTypeEnum.WeightGain) return ratio.value > 1
    return false
  })

  useEffect(() => {
    if (!field.value) {
      if (goalType === GoalTypeEnum.WeightGain) {
        field.onChange(1.2)
      } else if (goalType === GoalTypeEnum.WeightLoss) {
        field.onChange(0.8)
      }
    }
  }, [goalType, field])

  const handleSelectRatio = (value: number) => {
    field.onChange(value)
  }

  return (
    <VStack gap={12}>
      {caloriesRatioData.map((ratio) => (
        <Chip
          key={ratio.label}
          size="lg"
          border
          borderWidth={2}
          label={ratio.label}
          description={ratio.description}
          selected={field.value === ratio.value}
          onPress={() => handleSelectRatio(ratio.value)}
        />
      ))}
    </VStack>
  )
}

export default SetupCaloriesRatio
