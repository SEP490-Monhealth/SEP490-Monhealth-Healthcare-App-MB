import React from "react"

import { View } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import { Input, VStack } from "@/components/global/atoms"

interface SetupMeetingProps {
  control: Control<FieldValues>
  errors: any
}

function SetupMeeting({ control, errors }: SetupMeetingProps) {
  const errorMessage = errors.meetUrl?.message

  return (
    <VStack gap={12}>
      <Controller
        name="meetUrl"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value ? value.toString() : ""}
            label="Link phòng họp"
            placeholder="VD: https://meet.google.com/abc-defg-hij"
            onChangeText={onChange}
            keyboardType="default"
            canClearText
            errorMessage={errorMessage}
          />
        )}
      />
    </VStack>
  )
}

export default SetupMeeting
