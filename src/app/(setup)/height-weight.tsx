import React from "react"

import { Text } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import { Input, VStack } from "@/components/global/atoms"

interface SetupHeightWeightProps {
  control: Control<FieldValues>
  errors: any
}

function SetupHeightWeight({ control, errors }: SetupHeightWeightProps) {
  return (
    <VStack gap={12}>
      <Controller
        name="height"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value ? value.toString() : ""}
            placeholder="Nhập chiều cao"
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            keyboardType="numeric"
            endIcon={
              <Text className="font-tmedium text-base text-primary">cm</Text>
            }
            canClearText
            errorMessage={errors.height?.message}
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
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            keyboardType="numeric"
            endIcon={
              <Text className="font-tmedium text-base text-primary">kg</Text>
            }
            canClearText
            errorMessage={errors.weight?.message}
          />
        )}
      />
    </VStack>
  )
}

export default SetupHeightWeight
