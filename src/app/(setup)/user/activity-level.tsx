import React from "react"

import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"

interface SetupActivityLevelProps {
  control: Control<FieldValues>
}

function SetupActivityLevel({ control }: SetupActivityLevelProps) {
  const { field } = useController({
    name: "activityLevel",
    control
  })

  const handleSelectActivity = (value: number) => {
    field.onChange(value)
  }

  return (
    <VStack gap={12}>
      {DATA.ACTIVITY_LEVELS.map((activity) => {
        const Icon = activity.icon

        return (
          <Chip
            key={activity.label}
            size="lg"
            border
            borderWidth={2}
            label={activity.label}
            icon={
              <Icon
                size={28}
                color={
                  field.value === activity.value
                    ? COLORS.primary
                    : COLORS.accent
                }
              />
            }
            selected={field.value === activity.value}
            onPress={() => handleSelectActivity(activity.value)}
          />
        )
      })}
    </VStack>
  )
}

export default SetupActivityLevel
