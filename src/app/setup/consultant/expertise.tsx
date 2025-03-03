import React from "react"

import { Text, View } from "react-native"

import {
  Control,
  Controller,
  FieldValues,
  useController
} from "react-hook-form"

import { Chip, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleExpertiseGroupData } from "@/constants/expertise"

interface SetupExpertiseProps {
  control: Control<FieldValues>
  errors: any
}

function SetupExpertise({ control, errors }: SetupExpertiseProps) {
  const expertiseData = sampleExpertiseGroupData

  const { field } = useController({
    name: "expertise",
    control
  })

  const handleSelectGender = (value: string) => {
    field.onChange(value)
  }

  return (
    <>
      <ScrollArea>
        <VStack gap={12} className="pb-24">
          {expertiseData.map((expertise) => {
            return (
              <Chip
                key={expertise.groupId}
                label={expertise.name}
                border
                borderWidth={2}
                size="lg"
                selected={field.value === expertise.name}
                onPress={() => handleSelectGender(expertise.name)}
              />
            )
          })}
        </VStack>
      </ScrollArea>
    </>
  )
}

export default SetupExpertise
