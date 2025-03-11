import React from "react"

import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleExpertiseGroupData } from "@/constants/expertise"

interface SetupExpertiseProps {
  control: Control<FieldValues>
  errors: any
  openExpertiseSheet(group: string): void
}

function SetupExpertise({
  control,
  errors,
  openExpertiseSheet
}: SetupExpertiseProps) {
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
              size="lg"
              border
              borderWidth={2}
              label={group.name}
              description={group.description}
              selected={isSelected}
              onPress={() => openExpertiseSheet(group.groupId)}
            />
          )
        })}

        {errors.expertise && <ErrorText text={errors.expertise?.message} />}
      </VStack>
    </ScrollArea>
  )
}

export default SetupExpertise
