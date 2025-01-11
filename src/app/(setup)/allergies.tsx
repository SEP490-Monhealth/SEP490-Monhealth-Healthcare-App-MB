import React from "react"

import { FlatList, View } from "react-native"

import { Control, FieldValues, useController } from "react-hook-form"

import {
  AllergyCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"

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
    const updatedValue = currentValue.includes(allergy)
      ? currentValue.filter((item: string) => item !== allergy)
      : [...currentValue, allergy]

    field.onChange(updatedValue)

    console.log("Selected Allergies:", updatedValue)
  }

  return (
    <View className="flex-1 pb-24">
      <FlatList
        data={allergiesData || []}
        keyExtractor={(item) => item.allergyId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => (
          <AllergyCard
            key={item.allergyId}
            name={item.name}
            isSelected={(field.value || []).includes(item.allergyId)}
            onPress={() => handleSelectAllergies(item.allergyId)}
          />
        )}
        ListFooterComponent={<ListFooter />}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </View>
  )
}

export default SetupAllergies
