import React from "react"

import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import {
  Control,
  FieldValues,
  SetValueConfig,
  useController
} from "react-hook-form"

import { VStack } from "@/components/global/atoms"

import { formatUTCDate } from "@/utils/formatters"

interface SetupDateOfBirthProps {
  control: Control<FieldValues>
  setValue: (name: string, value: any, config?: SetValueConfig) => void
}

function SetupDateOfBirth({ control, setValue }: SetupDateOfBirthProps) {
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

  return (
    <VStack gap={12}>
      <DateTimePicker
        value={new Date(field.value || Date.now())}
        mode="date"
        display="spinner"
        onChange={onChange}
        minimumDate={new Date(1904, 0, 1)}
        maximumDate={new Date()}
        locale="vi"
      />
    </VStack>
  )
}

export default SetupDateOfBirth
