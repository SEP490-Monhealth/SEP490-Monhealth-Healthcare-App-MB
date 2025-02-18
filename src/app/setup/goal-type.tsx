import React, { useEffect } from "react"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, VStack } from "@/components/global/atoms"

import { COLORS, DATA } from "@/constants/app"
import { TypeGoalEnum } from "@/constants/enums"

import { useSetupStore } from "@/stores/setupStore"

import { calculateBMI } from "@/utils/calculations"

interface SetupGoalTypeProps {
  control: Control<FieldValues>
  errors: any
}

function SetupGoalType({ control, errors }: SetupGoalTypeProps) {
  const { weight, height } = useSetupStore()

  const { field } = useController({
    name: "goalType",
    control
  })

  useEffect(() => {
    if (weight !== undefined && height !== undefined) {
      const bmi = calculateBMI(weight, height)

      let suggestedGoal: TypeGoalEnum

      if (bmi < 18.5) {
        suggestedGoal = TypeGoalEnum.WeightGain
      } else if (bmi >= 18.5 && bmi < 24.9) {
        suggestedGoal = TypeGoalEnum.Maintenance
      } else {
        suggestedGoal = TypeGoalEnum.WeightLoss
      }

      if (field.value !== suggestedGoal) {
        field.onChange(suggestedGoal)
      }
    }
  }, [weight, height])

  const handleSelectGoal = (value: TypeGoalEnum) => {
    field.onChange(value)
  }

  const errorMessage = get(errors, "goalType.message", null)

  return (
    <VStack gap={12}>
      {DATA.GOALS.map((goal) => {
        const Icon = goal.icon

        return (
          <Chip
            key={goal.label}
            size="lg"
            border
            borderWidth={2}
            label={goal.label}
            description={goal.description}
            icon={
              <Icon
                size={28}
                color={
                  field.value === goal.value ? COLORS.primary : COLORS.accent
                }
              />
            }
            selected={field.value === goal.value}
            onPress={() => handleSelectGoal(goal.value)}
          />
        )
      })}

      {errors.goalType && <ErrorText text={errorMessage} />}
    </VStack>
  )
}

export default SetupGoalType
