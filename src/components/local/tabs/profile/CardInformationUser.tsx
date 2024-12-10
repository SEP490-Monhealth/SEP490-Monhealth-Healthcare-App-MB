import React from "react"

import { Text, View } from "react-native"

import {
  AlignVertically,
  Calendar,
  Lovely,
  Profile,
  ProfileCircle,
  Weight
} from "iconsax-react-native"

import { Card } from "@/components/global/atoms"

import { COLORS } from "@/constants/appConstants"

import { formatDate } from "@/utils/formatters"

import TitleUser from "./TitleUser"

interface TitleProps {
  fullName: string
  dateOfBirth: string
  gender: string
  weight: number
  height: number
}

const CardInformationUser = ({
  fullName,
  dateOfBirth,
  gender,
  weight,
  height
}: TitleProps) => {
  const genderDisplay =
    gender === "Male" ? "Nam" : gender === "Female" ? "Nữ" : "Chưa cung cấp"
  return (
    <Card className="mt-2">
      <TitleUser
        title={fullName}
        icon={<ProfileCircle variant="Bold" size={24} color={COLORS.primary} />}
      />
      <TitleUser
        title={formatDate(dateOfBirth)}
        icon={<Calendar variant="Bold" size={24} color={COLORS.primary} />}
      />
      <TitleUser
        title={genderDisplay}
        icon={<Lovely variant="Bold" size={24} color={COLORS.primary} />}
      />
      <TitleUser
        title={weight}
        icon={<Weight variant="Bold" size={24} color={COLORS.primary} />}
      />
      <TitleUser
        title={height}
        icon={
          <AlignVertically variant="Bold" size={24} color={COLORS.primary} />
        }
      />
    </Card>
  )
}

export default CardInformationUser
