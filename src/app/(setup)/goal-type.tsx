import React, { useEffect } from "react"

import { get } from "lodash"
import { Scale, TrendingDown, TrendingUp } from "lucide-react-native"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

import { useSetupStore } from "@/stores/userSetupStore"

import { calculateBMI } from "@/utils/calculations"

const goalsData = [
  {
    label: "Giảm cân",
    value: "WeightLoss",
    description: "Mục tiêu giảm cân và duy trì vóc dáng",
    icon: TrendingDown
  },
  {
    label: "Duy trì cân nặng",
    value: "MaintainWeight",
    description: "Mục tiêu duy trì cân nặng hiện tại",
    icon: Scale
  },
  {
    label: "Tăng cân",
    value: "WeightGain",
    description: "Mục tiêu tăng cân và cải thiện cơ thể",
    icon: TrendingUp
  }
]

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
    const bmi = calculateBMI(weight, height)
    if (bmi && !field.value) {
      if (bmi < 18.5) {
        field.onChange("WeightGain")
      } else if (bmi >= 18.5 && bmi < 24.9) {
        field.onChange("MaintainWeight")
      } else if (bmi >= 25) {
        field.onChange("WeightLoss")
      }
    }
  }, [weight, height, field])

  const handleSelectGoal = (value: string) => {
    field.onChange(value)
  }

  const errorMessage = get(errors, "goalType.message", null)

  return (
    <VStack gap={12}>
      {goalsData.map((goal) => {
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
