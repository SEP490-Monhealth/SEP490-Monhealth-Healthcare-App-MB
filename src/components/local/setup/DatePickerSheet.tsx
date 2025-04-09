import React, { useEffect, useState } from "react"

import DateTimePicker from "@react-native-community/datetimepicker"

import { VStack } from "@/components/global/atoms"

import { formatUTCDate } from "@/utils/formatters"

interface DatePickerSheetProps {
  selectedDate: Date | undefined
  dateType: "issueDate" | "expiryDate"
  minDate?: Date
  maxDate?: Date
  onDateChange: (dateType: "issueDate" | "expiryDate", date: string) => void
}

export const DatePickerSheet: React.FC<DatePickerSheetProps> = ({
  selectedDate,
  dateType,
  minDate,
  maxDate,
  onDateChange
}) => {
  const [validDate, setValidDate] = useState<Date>(
    selectedDate && !isNaN(selectedDate.getTime()) ? selectedDate : new Date()
  )

  useEffect(() => {
    if (selectedDate && !isNaN(selectedDate.getTime())) {
      setValidDate(selectedDate)
    }
  }, [selectedDate])

  const handleDateSelect = (_event: any, date?: Date) => {
    if (date && !isNaN(date.getTime())) {
      try {
        const isoDate = formatUTCDate(date)
        onDateChange(dateType, isoDate)
        setValidDate(date)
      } catch (error) {
        console.error("Error formatting date:", error)
      }
    }
  }

  return (
    <VStack center>
      <DateTimePicker
        value={validDate}
        mode="date"
        display="spinner"
        minimumDate={minDate}
        maximumDate={maxDate}
        onChange={handleDateSelect}
        locale="vi"
      />
    </VStack>
  )
}
