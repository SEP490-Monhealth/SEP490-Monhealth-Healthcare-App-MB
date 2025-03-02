import React from "react"

import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleAllergiesData } from "@/constants/allergies"

interface SetupAllergiesProps {
  control: Control<FieldValues>
}

function SetupAllergies({ control }: SetupAllergiesProps) {
  const allergiesData = sampleAllergiesData

  const { field } = useController({
    name: "allergies",
    control
  })

  const handleSelectAllergies = (allergy: string) => {
    const currentValue = field.value || []

    if (currentValue.includes(allergy)) {
      field.onChange(currentValue.filter((item: string) => item !== allergy))
    } else {
      field.onChange([...currentValue, allergy])
    }
  }

  return (
    <ScrollArea>
      <VStack gap={12} className="pb-24">
        {allergiesData.map((allergy) => {
          return (
            <Chip
              key={allergy.allergyId}
              size="lg"
              border
              borderWidth={2}
              label={allergy.name}
              selected={field.value?.includes(allergy.name)}
              onPress={() => handleSelectAllergies(allergy.name)}
            />
          )
        })}
      </VStack>
    </ScrollArea>
  )
}

export default SetupAllergies
