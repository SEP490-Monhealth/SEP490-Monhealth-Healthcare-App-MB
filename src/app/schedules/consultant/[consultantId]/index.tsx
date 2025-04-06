import React, { useRef } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams } from "expo-router"

import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"

import {
  Button,
  Container,
  Content,
  Input,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"

const SchedulesScreen = () => {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  console.log(consultantId)

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 640

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Content className="mt-2">
            <Text>SchedulesScreen</Text>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          <VStack center>
            <View className="w-full">
              <Input
                value={""}
                label="Thời lượng"
                placeholder="VD: 45"
                onChangeText={() => {}}
                keyboardType="numeric"
                canClearText
              />
            </View>

            {/* <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
              minuteInterval={15}
              minimumDate={setHoursAndMinutes(new Date(), 8, 0)}
              maximumDate={setHoursAndMinutes(new Date(), 18, 0)}
            /> */}

            {/* <Button size="lg" onPress={handleConfirmTime} className="w-full"> */}
            <Button size="lg" className="w-full">
              Xác nhận
            </Button>
          </VStack>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SchedulesScreen
