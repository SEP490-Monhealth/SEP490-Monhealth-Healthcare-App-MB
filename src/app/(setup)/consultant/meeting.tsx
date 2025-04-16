import React from "react"

import { Linking, Text } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import { Input, VStack } from "@/components/global/atoms"
import { FileCard } from "@/components/global/molecules"

interface SetupMeetingProps {
  control: Control<FieldValues>
  errors: any
}

function SetupMeeting({ control, errors }: SetupMeetingProps) {
  const fileUrl =
    "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2FH%C6%AF%E1%BB%9ANG%20D%E1%BA%AAN%20T%E1%BA%A0O%20LINK%20GOOGLE%20MEET.pdf?alt=media&token=2ed7d5d3-0773-4249-a13f-602fa1774596"

  const handleViewFile = () => {
    Linking.openURL(fileUrl)
  }

  const errorMessage = errors.meetUrl?.message

  return (
    <VStack gap={32}>
      <VStack gap={12}>
        <Controller
          name="meetUrl"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              label="Link phòng họp"
              placeholder="VD: https://meet.google.com/abc-defg-hij"
              onChangeText={onChange}
              keyboardType="default"
              canClearText
              errorMessage={errorMessage}
            />
          )}
        />

        <Text className="ml-1 font-tregular text-sm text-accent">
          Vui lòng cung cấp một đường dẫn Google Meet để tổ chức cuộc họp với
          khách hàng khi được đặt lịch. Đảm bảo rằng bạn tạo một link Google
          Meet lâu dài và sử dụng cho nhiều cuộc họp.
        </Text>
      </VStack>

      <FileCard fileUrl={fileUrl} onPress={handleViewFile} />
    </VStack>
  )
}

export default SetupMeeting
