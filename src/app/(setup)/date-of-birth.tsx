import React, { useState } from "react"

import { Platform } from "react-native"

import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

const SetupDateOfBirthScreen = () => {
  const [date, setDate] = useState(new Date())

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
  }

  return (
    <Container>
      <Header back label="Ngày sinh" />

      <Content>
        <VStack gap={12} className="mt-2">
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            minimumDate={new Date(1904, 0, 1)}
            maximumDate={new Date()}
            locale="vi"
          />
        </VStack>
      </Content>
    </Container>
  )
}

export default SetupDateOfBirthScreen
