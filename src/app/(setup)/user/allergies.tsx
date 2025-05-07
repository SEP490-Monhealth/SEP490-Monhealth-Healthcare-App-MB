import React from "react"

import { Linking, Text, TouchableOpacity } from "react-native"

import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleAllergiesData } from "@/constants/data/allergies"

interface SetupAllergiesProps {
  control: Control<FieldValues>
}

function SetupAllergies({ control }: SetupAllergiesProps) {
  const allergiesData = sampleAllergiesData

  const { field } = useController({
    name: "allergies",
    control
  })

  const referenceUrl =
    "https://www.vinmec.com/vie/bai-viet/8-loai-di-ung-thuc-pham-pho-bien-nhat-vi"

  const handleSelectAllergies = (allergy: string) => {
    const currentValue = field.value || []

    if (currentValue.includes(allergy)) {
      field.onChange(currentValue.filter((item: string) => item !== allergy))
    } else {
      field.onChange([...currentValue, allergy])
    }
  }

  const handleLinkPress = () => {
    Linking.openURL(referenceUrl)
  }

  return (
    <ScrollArea>
      <VStack gap={20} className="pb-28">
        <VStack gap={12}>
          {allergiesData.map((allergy) => (
            <Chip
              key={allergy.allergyId}
              size="lg"
              border
              borderWidth={2}
              label={allergy.name}
              description={allergy.description}
              selected={field.value?.includes(allergy.name)}
              onPress={() => handleSelectAllergies(allergy.name)}
            />
          ))}
        </VStack>

        <TouchableOpacity activeOpacity={1} onPress={handleLinkPress}>
          <Text className="text-center font-tmedium text-secondary underline">
            {referenceUrl}
          </Text>
        </TouchableOpacity>
      </VStack>
    </ScrollArea>
  )
}

export default SetupAllergies
