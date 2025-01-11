import React from "react"

import { Text, View } from "react-native"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { sampleAllergiesData } from "@/constants/allergies"

interface SetupAllergiesProps {
  control: Control<FieldValues>
  errors: any
}

function SetupAllergies({ control, errors }: SetupAllergiesProps) {
  const allergiesData = sampleAllergiesData

  const { field } = useController({
    name: "allergies",
    control
  })

  const errorMessage = get(errors, "allergies.message", null)

  return (
    <View>
      <Text>SetupAllergies</Text>
    </View>
  )
}

export default SetupAllergies
