import React from "react"

import { Text } from "react-native"

import { get } from "lodash"
import { Control, Controller, FieldValues } from "react-hook-form"

import { Input, VStack } from "@/components/global/atoms"

interface SetupHeightWeightProps {
  control: Control<FieldValues>
  errors: any
}

function SetupHeightWeight({ control, errors }: SetupHeightWeightProps) {
  const errorHeightMessage = get(errors, "height.message", null)
  const errorWeightMessage = get(errors, "weight.message", null)

  return (
    <VStack gap={12}>
      <Controller
        name="height"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value ? value.toString() : ""}
            placeholder="Nhập chiều cao"
            onChangeText={(text) => {
              const formattedText = text.replace(",", ".")
              if (/^\d*\.?\d*$/.test(formattedText) || formattedText === "") {
                onChange(formattedText)
              }
            }}
            keyboardType="decimal-pad"
            endIcon={
              <Text className="font-tregular text-sm text-accent">cm</Text>
            }
            canClearText
            alwaysShowEndIcon
            errorMessage={errorHeightMessage}
          />
        )}
      />

      <Controller
        name="weight"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value ? value.toString() : ""}
            placeholder="Nhập cân nặng"
            onChangeText={(text) => {
              const formattedText = text.replace(",", ".")
              if (/^\d*\.?\d*$/.test(formattedText) || formattedText === "") {
                onChange(formattedText)
              }
            }}
            keyboardType="decimal-pad"
            endIcon={
              <Text className="font-tregular text-sm text-accent">kg</Text>
            }
            canClearText
            alwaysShowEndIcon
            errorMessage={errorWeightMessage}
          />
        )}
      />
    </VStack>
  )
}

export default SetupHeightWeight
