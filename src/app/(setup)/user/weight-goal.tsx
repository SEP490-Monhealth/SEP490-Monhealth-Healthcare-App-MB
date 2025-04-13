import React, { useEffect, useState } from "react"

import { Text } from "react-native"

import { VStack } from "@/components/global/atoms"

import { GenderEnum } from "@/constants/enum/Gender"

import { useSetupStore } from "@/stores/setupStore"

import { calculateIBW } from "@/utils/calculations"
import { toFixed } from "@/utils/formatters"

function SetupWeightGoal() {
  const { height, gender } = useSetupStore() as {
    height: number
    gender: GenderEnum
  }

  const [idealWeight, setIdealWeight] = useState<number | null>(null)

  useEffect(() => {
    if (height && (GenderEnum.Male || GenderEnum.Female)) {
      const ibw = calculateIBW(height, gender)
      setIdealWeight(ibw)
    }
  }, [height, gender])

  return (
    <VStack gap={12}>
      {/* <Controller
        name="weightGoal"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            disabled
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
      /> */}

      {idealWeight !== null && (
        <Text className="text-center font-tbold text-5xl text-primary">
          {toFixed(idealWeight, 1)} kg
        </Text>
      )}

      {idealWeight !== null && (
        <Text className="ml-1 mt-1 font-tregular text-sm text-accent">
          Gợi ý cân nặng phù hợp dựa trên chiều cao và giới tính của bạn:{" "}
          <Text className="font-tregular text-primary">
            {toFixed(idealWeight, 1)} kg
          </Text>
        </Text>
      )}
    </VStack>
  )
}

export default SetupWeightGoal
