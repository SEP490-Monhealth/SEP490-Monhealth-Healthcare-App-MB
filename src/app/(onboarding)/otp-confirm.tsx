import React, { useState } from "react"

import { Button, Container } from "@/components/global/atoms"
import { OtpInput } from "@/components/global/atoms"

function OtpScreen() {
  const [otpValue, setOtpValue] = useState("")

  const handleOtpChange = (otp: string) => {
    setOtpValue(otp)
  }

  const handleSubmit = () => {
    console.log(otpValue)
  }

  return (
    <Container className="flex-1 justify-center">
      <OtpInput length={6} onOtpChange={handleOtpChange} />

      <Button
        size="lg"
        onPress={handleSubmit}
        className="absolute bottom-4 left-6 right-6 w-full"
      >
        Xác nhận
      </Button>
    </Container>
  )
}

export default OtpScreen
