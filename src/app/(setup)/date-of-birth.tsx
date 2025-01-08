import React from "react"

import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { get } from "lodash"
import {
  Control,
  FieldValues,
  SetValueConfig,
  useController
} from "react-hook-form"

import { ErrorText, VStack } from "@/components/global/atoms"

import { formatUTCDate } from "@/utils/formatters"

interface SetupDateOfBirthProps {
  control: Control<FieldValues>
  setValue: (name: string, value: any, config?: SetValueConfig) => void
  errors: any
}

function SetupDateOfBirth({
  control,
  setValue,
  errors
}: SetupDateOfBirthProps) {
  const { field } = useController({
    name: "dateOfBirth",
    control
  })

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = formatUTCDate(selectedDate)
      setValue("dateOfBirth", formattedDate)
    }
  }

  const errorMessage = get(errors, "dateOfBirth.message", null)

  return (
    <VStack gap={12} center>
      <DateTimePicker
        value={new Date(field.value || Date.now())}
        mode="date"
        display="spinner"
        onChange={onChange}
        minimumDate={new Date(1904, 0, 1)}
        maximumDate={new Date()}
        locale="vi"
      />

      {errors.dateOfBirth && <ErrorText text={errorMessage} />}
    </VStack>
  )
}

export default SetupDateOfBirth
