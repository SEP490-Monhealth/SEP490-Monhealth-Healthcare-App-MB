import React, { useEffect } from "react"

import { Feather } from "@expo/vector-icons"
import {
  Control,
  FieldValues,
  UseFormSetValue,
  useController
} from "react-hook-form"

import { Chip, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import { GoalTypeEnum } from "@/constants/enum/Goal"

import { useSetupStore } from "@/stores/setupStore"

import { calculateBMI } from "@/utils/calculations"

interface SetupGoalTypeProps {
  control: Control<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

function SetupGoalType({ control, setValue }: SetupGoalTypeProps) {
  const { weight, height, goalType } = useSetupStore()

  const { field } = useController({
    name: "goalType",
    control
  })

  useEffect(() => {
    if (weight !== undefined && height !== undefined) {
      if (goalType === null) {
        const bmi = calculateBMI(weight, height)
        if (bmi < 18.5) {
          field.onChange(GoalTypeEnum.WeightGain)
        } else if (bmi >= 18.5 && bmi <= 24.9) {
          field.onChange(GoalTypeEnum.Maintenance)
        } else {
          field.onChange(GoalTypeEnum.WeightLoss)
        }
      } else {
        setValue("goalType", goalType)
      }
    }
  }, [weight, height])

  const handleSelectGoal = (value: GoalTypeEnum) => {
    field.onChange(value)
  }

  return (
    <VStack gap={12}>
      {DATA.GOALS.map((goal) => (
        <Chip
          key={goal.label}
          size="lg"
          border
          borderWidth={2}
          label={goal.label}
          description={goal.description}
          icon={
            <Feather
              name={goal.icon as keyof typeof Feather.glyphMap}
              size={24}
              color={
                field.value === goal.value ? COLORS.primary : COLORS.accent
              }
            />
          }
          selected={field.value === goal.value}
          onPress={() => handleSelectGoal(goal.value)}
        />
      ))}
    </VStack>
  )
}

export default SetupGoalType
