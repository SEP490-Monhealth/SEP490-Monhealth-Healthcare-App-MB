import React from "react"

import { get } from "lodash"
import { Scale, TrendingDown, TrendingUp } from "lucide-react-native"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

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
  const { field } = useController({
    name: "goal",
    control
  })

  const handleSelectGoal = (value: string) => {
    field.onChange(value)
  }

  const errorMessage = get(errors, "goal.message", null)

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

      {errors.gender && <ErrorText text={errorMessage} />}
    </VStack>
  )
}

export default SetupGoalType
