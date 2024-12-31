import React, { useEffect, useRef, useState } from "react"

import { Text, TextInput, View } from "react-native"

import { HStack, VStack } from "./Stack"

type OtpInputProps = {
  length?: number
  onOtpChange?: (otp: string) => void
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  onOtpChange
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const [timer, setTimer] = useState(60)
  const inputs = useRef<Array<TextInput | null>>([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }

    if (onOtpChange) {
      onOtpChange(newOtp.join(""))
    }
  }

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  return (
    <VStack center gap={30}>
      <View className="flex flex-row items-center justify-center">
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={{ fontSize: 19 }}
            className="m-1 h-14 w-14 rounded-xl border border-border bg-card text-center font-tbold"
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(ref) => (inputs.current[index] = ref)}
          />
        ))}
      </View>

      <HStack>
        <Text className="font-tmedium text-secondary">Mã sẽ hết hạn trong</Text>
        <Text className="font-tbold text-primary">{timer} giây</Text>
      </HStack>
    </VStack>
  )
}
