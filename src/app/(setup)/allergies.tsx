import React from "react"

import { FlatList, View } from "react-native"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { ErrorText } from "@/components/global/atoms"
import {
  AllergyCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"

import { sampleAllergiesData } from "@/constants/allergies"

import { AllergyBasicType } from "@/schemas/allergySchema"

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

  const handleSelectAllergy = (allergy: string) => {
    const currentValue = field.value || []
    const updatedValue = currentValue.includes(allergy)
      ? currentValue.filter((item: string) => item !== allergy)
      : [...currentValue, allergy]

    field.onChange(updatedValue)

    console.log("Selected Allergies:", updatedValue)
  }

  const errorMessage = get(errors, "allergies.message", null)

  return (
    <View className="flex-1 flex-col gap-10">
      <FlatList<AllergyBasicType>
        data={allergiesData || []}
        keyExtractor={(item) => item.allergyId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }: { item: AllergyBasicType }) => (
          <AllergyCard
            key={item.allergyId}
            name={item.name}
            isSelected={(field.value || []).includes(item.allergyId)}
            onPress={() => handleSelectAllergy(item.allergyId)}
          />
        )}
        ListFooterComponent={<ListFooter className="pb-28" />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
      {errorMessage && <ErrorText text={errorMessage} />}
    </View>
  )
}

export default SetupAllergies
