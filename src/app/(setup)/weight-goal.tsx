import React, { useEffect, useState } from "react"

import { Text } from "react-native"

import { get } from "lodash"
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue
} from "react-hook-form"

import { Input, VStack } from "@/components/global/atoms"

import { useSetupStore } from "@/stores/setupStore"

import { calculateIBW } from "@/utils/calculations"
import { toFixed } from "@/utils/formatters"

interface SetupWeightGoalProps {
  control: Control<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  errors: any
}

function SetupWeightGoal({ control, setValue, errors }: SetupWeightGoalProps) {
  const { height, gender } = useSetupStore() as {
    height: number
    gender: "Male" | "Female"
    weight: number
  }
  const [idealWeight, setIdealWeight] = useState<number | null>(null)

  useEffect(() => {
    if (height && (gender === "Male" || gender === "Female")) {
      const ibw = calculateIBW(height, gender)
      setIdealWeight(ibw)
      setValue("weightGoal", ibw)
    }
  }, [height, gender, setValue])

  const errorMessage = get(errors, "weightGoal.message", null)

  return (
    <VStack gap={12}>
      <Controller
        name="weightGoal"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={
              value
                ? value.toString()
                : idealWeight !== null
                  ? toFixed(idealWeight, 1)
                  : ""
            }
            placeholder={`Nhập cân nặng mục tiêu (Gợi ý: ${idealWeight !== null ? toFixed(idealWeight, 1) : "--"} kg)`}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            keyboardType="numeric"
            endIcon={
              <Text className="font-tmedium text-base text-primary">kg</Text>
            }
            canClearText
            errorMessage={errorMessage}
          />
        )}
      />

      {idealWeight !== null && (
        <Text className="ml-1 mt-1 font-tregular text-sm text-accent">
          Gợi ý cân nặng phù hợp: {toFixed(idealWeight, 1)} kg
        </Text>
      )}
    </VStack>
  )
}

export default SetupWeightGoal
