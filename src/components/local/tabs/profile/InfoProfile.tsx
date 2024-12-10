import React from "react"

import { View } from "react-native"

import {
  Chart2,
  Command,
  Lock1,
  NotificationStatus,
  Profile
} from "iconsax-react-native"

import { COLORS } from "@/constants/appConstants"

import SelectionProfile from "./SelectionProfile"

const InfoProfile = () => {
  return (
    <View>
      <SelectionProfile
        title="Thông tin cá nhân"
        icon={<Profile variant="Bold" size={24} color={COLORS.primary} />}
        url="/users/userInformation"
      />
      <SelectionProfile
        title="Chỉ số sức khỏe"
        icon={<Command variant="Bold" size={24} color={COLORS.primary} />}
        url="/(tabs)/home"
      />
      <SelectionProfile
        title="Thống kê chỉ số sức khỏe"
        icon={<Chart2 variant="Bold" size={24} color={COLORS.primary} />}
        url="/(tabs)/home"
      />
      <SelectionProfile
        title="Lịch nhắc nhở"
        icon={
          <NotificationStatus variant="Bold" size={24} color={COLORS.primary} />
        }
        url="/(tabs)/home"
      />
      <SelectionProfile
        title="Bảo mật"
        icon={<Lock1 variant="Bold" size={24} color={COLORS.primary} />}
        url="/(tabs)/home"
      />
    </View>
  )
}

export default InfoProfile
