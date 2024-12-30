import React from "react"

import { Man, Woman } from "iconsax-react-native"
import { Control, useController } from "react-hook-form"

import { Chip, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

interface SetupGenderProps {
  control: Control
}

function SetupGender({ control }: SetupGenderProps) {
  const gendersData = [
    {
      label: "Nam",
      value: "Male",
      icon: Man
    },
    {
      label: "Nữ",
      value: "Female",
      icon: Woman
    }
  ]

  const { field } = useController({
    name: "gender",
    control
  })

  const handleSelectGender = (value: string) => {
    field.onChange(value)
  }

  return (
    <VStack gap={12}>
      {gendersData.map((gender) => {
        const Icon = gender.icon

        return (
          <Chip
            key={gender.label}
            label={gender.label}
            border={true}
            borderWidth={2}
            size="lg"
            icon={
              <Icon
                size={28}
                color={
                  field.value === gender.value ? COLORS.primary : COLORS.accent
                }
              />
            }
            selected={field.value === gender.value}
            onPress={() => handleSelectGender(gender.value)}
          />
        )
      })}
    </VStack>
  )
}

export default SetupGender
