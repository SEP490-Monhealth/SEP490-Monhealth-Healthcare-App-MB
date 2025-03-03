import React from "react"

import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleExpertiseGroupData } from "@/constants/expertise"

interface SetupExpertiseProps {
  control: Control<FieldValues>
  errors: any
  onOpenSheet: (
    sheetName: "expertise" | "certificate",
    group?: {
      groupId: string
      name: string
      expertise: { expertiseId: string; name: string }[]
    }
  ) => void
}

function SetupExpertise({ control, errors, onOpenSheet }: SetupExpertiseProps) {
  const expertiseData = sampleExpertiseGroupData

  const { field } = useController({
    name: "expertise",
    control
  })

  return (
    <ScrollArea>
      <VStack gap={12} className="pb-24">
        {expertiseData.map((group) => {
          const isSelected = group.expertise.some(
            (exp) => exp.name === field.value
          )

          return (
            <Chip
              key={group.groupId}
              label={group.name}
              border
              borderWidth={2}
              size="lg"
              selected={isSelected}
              onPress={() => onOpenSheet("expertise", group)}
            />
          )
        })}
      </VStack>
    </ScrollArea>
  )
}

export default SetupExpertise
