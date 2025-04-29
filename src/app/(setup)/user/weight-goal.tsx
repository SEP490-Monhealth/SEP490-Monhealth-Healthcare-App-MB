import React, { useEffect, useState } from "react"

import { Text, TouchableOpacity } from "react-native"

import { get } from "lodash"
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue
} from "react-hook-form"

import { Input, VStack } from "@/components/global/atoms"

import { GenderEnum } from "@/constants/enum/Gender"
import { GoalTypeEnum } from "@/constants/enum/Goal"

import { useSetupStore } from "@/stores/setupStore"

import { calculateIBW } from "@/utils/calculations"
import { toFixed } from "@/utils/formatters"

interface SetupWeightGoalProps {
  control: Control<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  errors: any
}

function SetupWeightGoal({ control, setValue, errors }: SetupWeightGoalProps) {
  const { weight, height, gender, weightGoal, goalType } = useSetupStore() as {
    weight: number
    height: number
    gender: GenderEnum
    weightGoal: number
    goalType: GoalTypeEnum
  }

  const [idealWeight, setIdealWeight] = useState<number | null>(null)

  useEffect(() => {
    if (
      height &&
      (gender === GenderEnum.Male || gender === GenderEnum.Female)
    ) {
      const ibw = calculateIBW(height, gender)
      setIdealWeight(ibw)

      if (weightGoal === 0 || goalType === GoalTypeEnum.Maintenance) {
        if (goalType === GoalTypeEnum.Maintenance) {
          setValue("weightGoal", Number(weight.toFixed(1)))
        } else {
          setValue("weightGoal", Number(ibw.toFixed(1)))
        }
      } else {
        setValue("weightGoal", weightGoal)
      }
    }
  }, [height, gender, setValue, weightGoal, goalType, weight])

  const errorMessage = get(errors, "weightGoal.message", null)

  return (
    <VStack gap={12}>
      <Controller
        name="weightGoal"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value ? value.toString() : ""}
            label="Cân nặng mục tiêu"
            placeholder="VD: 66"
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
            errorMessage={errorMessage}
          />
        )}
      />

      {idealWeight !== null && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setValue("weightGoal", Number(toFixed(idealWeight, 1)))
          }}
        >
          <Text className="ml-1 mt-1 font-tregular text-sm text-accent">
            Gợi ý cân nặng phù hợp:{" "}
            <Text className="font-tregular text-primary">
              {toFixed(idealWeight, 1)} kg
            </Text>
          </Text>
        </TouchableOpacity>
      )}
    </VStack>
  )
}

export default SetupWeightGoal
