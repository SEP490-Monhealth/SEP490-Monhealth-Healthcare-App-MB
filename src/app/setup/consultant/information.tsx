import React from "react"

import { Text } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import { Input, VStack } from "@/components/global/atoms"

interface SetupInformationProps {
  control: Control<FieldValues>
  errors: any
}

function SetupInformation({ control, errors }: SetupInformationProps) {
  return (
    <VStack gap={12}>
      <Controller
        name="bio"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value ? value.toString() : ""}
            label="Mô tả ngắn"
            placeholder="VD: Tôi là chuyên gia dinh dưỡng với hơn 5 năm kinh nghiệm."
            onChangeText={(text) => onChange(text)}
            keyboardType="default"
            isMultiline
            numberOfLines={4}
            canClearText
          />
        )}
      />

      <Controller
        name="experience"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value ? value.toString() : ""}
            label="Kinh nghiệm"
            placeholder="VD: 5"
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            keyboardType="numeric"
            endIcon={
              <Text className="font-tregular text-sm text-accent">năm</Text>
            }
            alwaysShowEndIcon
            canClearText
          />
        )}
      />
    </VStack>
  )
}

export default SetupInformation
