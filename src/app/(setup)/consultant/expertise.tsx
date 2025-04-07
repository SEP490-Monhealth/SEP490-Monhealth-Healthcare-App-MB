import React from "react"

import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleExpertiseData } from "@/constants/data/expertise"

interface SetupExpertiseProps {
  control: Control<FieldValues>
}

function SetupExpertise({ control }: SetupExpertiseProps) {
  const expertiseData = sampleExpertiseData

  const { field } = useController({
    name: "expertise",
    control
  })

  const handleSelectExpertise = (value: string) => {
    field.onChange(value)
  }

  return (
    <ScrollArea>
      <VStack gap={12}>
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
