import React, { useEffect, useRef, useState } from "react"

import { TextInput } from "react-native"

import { COLORS } from "@/constants/app"

import { HStack } from "./Stack"

interface OTPInputProps {
  length?: number
  onOTPChange?: (OTP: string) => void
}

export const OtpInput = ({ length = 4, onOTPChange }: OTPInputProps) => {
  const [Otp, setOtp] = useState<string[]>(Array(length).fill(""))
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
    const newOTP = [...Otp]
    newOTP[index] = text
    setOtp(newOTP)

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }

    if (onOTPChange) {
      onOTPChange(newOTP.join(""))
    }
  }

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOTP = [...Otp]
      if (index > 0 && !newOTP[index]) {
        newOTP[index - 1] = ""
        setOtp(newOTP)
        inputs.current[index - 1]?.focus()
      } else {
        newOTP[index] = ""
        setOtp(newOTP)
      }

      if (onOTPChange) {
        onOTPChange(newOTP.join(""))
      }
    }
  }

  return (
    <HStack className="justify-between">
      {Otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectionColor={COLORS.primary}
          className="h-14 w-14 rounded-2xl border border-border bg-white pl-5 font-tbold text-xl text-primary"
          style={{ lineHeight: 20 }}
        />
      ))}
    </HStack>
  )
}
