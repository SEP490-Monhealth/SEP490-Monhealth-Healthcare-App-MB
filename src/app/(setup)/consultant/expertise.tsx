import React from "react"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleExpertiseData } from "@/constants/data/expertise"

interface SetupExpertiseProps {
  control: Control<FieldValues>
  errors: any
}

function SetupExpertise({ control, errors }: SetupExpertiseProps) {
  const expertiseData = sampleExpertiseData

  const { field } = useController({
    name: "expertise",
    control
  })

  const handleSelectExpertise = (value: string) => {
    field.onChange(value)
  }

  const errorMessage = get(errors, "expertise.message", null)

  return (
    <ScrollArea>
      <VStack gap={12}>
        {errorMessage && <ErrorText text={errorMessage} />}

        {expertiseData.map((expertise) => (
          <Chip
            key={expertise.expertiseId}
            size="lg"
            border
            borderWidth={2}
            label={expertise.name}
            selected={field.value?.includes(expertise.name)}
            onPress={() => handleSelectExpertise(expertise.name)}
          />
        ))}
      </VStack>
    </ScrollArea>
  )
}

export default SetupExpertise
