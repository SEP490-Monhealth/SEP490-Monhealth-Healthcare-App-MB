import React from "react"

import { Call, Sms, Unlock } from "iconsax-react-native"

import { Card } from "@/components/global/atoms"

import { COLORS } from "@/constants/appConstants"

import TitleUser from "./TitleUser"

interface TitleProps {
  email: string
  phoneNumber: string
  password: string
}

const CardAccountUser = ({ email, phoneNumber, password }: TitleProps) => {
  const hidePassword = (password: string) => {
    const maxLength = 10
    return "*".repeat(Math.min(password.length, maxLength))
  }

  return (
    <Card className="mt-2">
      <TitleUser
        title={email}
        icon={<Sms variant="Bold" size={24} color={COLORS.primary} />}
      />
      <TitleUser
        title={phoneNumber}
        icon={<Call variant="Bold" size={24} color={COLORS.primary} />}
      />
      <TitleUser
        title={hidePassword(password)}
        icon={<Unlock variant="Bold" size={24} color={COLORS.primary} />}
      />
    </Card>
  )
}

export default CardAccountUser
