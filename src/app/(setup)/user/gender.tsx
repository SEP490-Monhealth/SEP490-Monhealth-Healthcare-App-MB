import React from "react"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import { GenderEnum } from "@/constants/enum/Gender"

interface SetupGenderProps {
  control: Control<FieldValues>
  errors: any
}

function SetupGender({ control, errors }: SetupGenderProps) {
  const { field } = useController({
    name: "gender",
    control
  })

  const handleSelectGender = (value: GenderEnum) => {
    field.onChange(value)
  }

  const errorMessage = get(errors, "gender.message", null)

  return (
    <VStack gap={12}>
      {errorMessage && <ErrorText error={errorMessage} />}

      {DATA.GENDERS.map((gender) => {
        const Icon = gender.icon

        return (
          <Chip
            key={gender.label}
            size="lg"
            border
            borderWidth={2}
            label={gender.label}
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
