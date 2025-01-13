import React from "react"

import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native"

import { Control, FieldValues, useController } from "react-hook-form"

import { ScrollArea } from "@/components/global/atoms"

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
      <View
        className="flex-row flex-wrap"
        style={{ rowGap: 16, columnGap: 12 }}
      >
        {allergiesData.map((allergy) => (
          <TouchableOpacity
            key={allergy.allergyId}
            activeOpacity={0.7}
            onPress={() => handleSelectAllergies(allergy.allergyId)}
            className={`flex-row items-center rounded-2xl border-2 bg-muted px-4 py-2.5 ${
              (field.value || []).includes(allergy.allergyId)
                ? "border-primary"
                : "border-border"
            }`}
          >
            <Text
              className={`font-tmedium text-base ${
                (field.value || []).includes(allergy.name)
                  ? "text-primary"
                  : "text-black"
              }`}
            >
              {allergy.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollArea>
  )
}

export default SetupAllergies
