import React from "react"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, VStack } from "@/components/global/atoms"

import { COLORS, DATA } from "@/constants/app"
import { Gender } from "@/constants/enums"

interface SetupGenderProps {
  control: Control<FieldValues>
  errors: any
}

function SetupGender({ control, errors }: SetupGenderProps) {
  const { field } = useController({
    name: "gender",
    control
  })

  const handleSelectGender = (value: Gender) => {
    field.onChange(value)
  }

  const errorMessage = get(errors, "gender.message", null)

  return (
    <VStack gap={12}>
      {DATA.GENDERS.map((gender) => {
        const Icon = gender.icon

        return (
          <Chip
            key={gender.label}
            label={gender.label}
            border
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

      {errors.gender && <ErrorText text={errorMessage} />}
    </VStack>
  )
}

export default SetupGender
