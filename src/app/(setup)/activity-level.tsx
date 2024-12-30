import React from "react"

import {
  Calendar,
  Calendar2,
  CalendarCircle,
  CalendarRemove
} from "iconsax-react-native"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

const activityLevelsData = [
  {
    label: "0 buổi / tuần",
    value: 1.2,
    icon: CalendarRemove
  },
  {
    label: "1 - 3 buổi / tuần",
    value: 1.375,
    icon: Calendar2
  },
  {
    label: "3 - 5 buổi / tuần",
    value: 1.55,
    icon: Calendar
  },
  {
    label: "6 - 7 buổi / tuần",
    value: 1.725,
    icon: CalendarCircle
  }
]

interface SetupActivityLevelProps {
  control: Control<FieldValues>
  errors: any
}

function SetupActivityLevel({ control, errors }: SetupActivityLevelProps) {
  const { field } = useController({
    name: "activityLevel",
    control
  })

  const handleSelectActivity = (value: number) => {
    field.onChange(value)
  }

  return (
    <VStack gap={12}>
      {activityLevelsData.map((activity) => {
        const Icon = activity.icon

        return (
          <Chip
            key={activity.label}
            size="lg"
            label={activity.label}
            border={true}
            borderWidth={2}
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
