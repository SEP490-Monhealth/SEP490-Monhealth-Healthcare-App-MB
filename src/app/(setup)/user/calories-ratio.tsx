import React from "react"

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
    if (goalType === GoalTypeEnum.WeightGain) return ratio.value > 1
    return false
  })

  const handleSelectRatio = (value: number) => {
    field.onChange(value)
  }

  const errorMessage = get(errors, "goalType.message", null)

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

      {errors.goalType && <ErrorText text={errorMessage} />}
    </VStack>
  )
}

export default SetupCaloriesRatio
