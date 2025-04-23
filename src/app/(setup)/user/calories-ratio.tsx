import React, { useEffect } from "react"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, VStack } from "@/components/global/atoms"

import { DATA } from "@/constants/data"
import { GoalTypeEnum } from "@/constants/enum/Goal"

import { useSetupStore } from "@/stores/setupStore"

interface SetupCaloriesRatioProps {
  control: Control<FieldValues>
  errors: any
}

function SetupCaloriesRatio({ control, errors }: SetupCaloriesRatioProps) {
  const { goalType } = useSetupStore()

  const { field } = useController({
    name: "caloriesRatio",
    control
  })

  const caloriesRatioData = DATA.CALORIES_RATIO.filter((ratio) => {
    if (goalType === GoalTypeEnum.WeightLoss) return ratio.value < 1
    if (goalType === GoalTypeEnum.Maintenance) return ratio.value === 1
    if (goalType === GoalTypeEnum.WeightGain) return ratio.value > 1
    return true
  })

  useEffect(() => {
    if (!field.value) {
      switch (goalType) {
        case GoalTypeEnum.WeightLoss:
          field.onChange(0.8)
          break
        case GoalTypeEnum.Maintenance:
          field.onChange(1)
          break
        case GoalTypeEnum.WeightGain:
          field.onChange(1.2)
          break
        default:
          break
      }
    }
  }, [goalType, field])

  const handleSelectRatio = (value: number) => {
    field.onChange(value)
  }

  const errorMessage = get(errors, "caloriesRatio.message", "")

  return (
    <VStack gap={12}>
      {errors.caloriesRatio && <ErrorText error={errorMessage} />}

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
