import React from "react"

import { View } from "react-native"

import { I3Dcube, LoginCurve, Verify } from "iconsax-react-native"

import { COLORS } from "@/constants/appConstants"

import SelectionProfile from "./SelectionProfile"

const IntroProfile = () => {
  return (
    <View>
      <SelectionProfile
        title="Về chúng tôi"
        icon={<I3Dcube variant="Bold" size={24} color={COLORS.primary} />}
        url="/(tabs)/home"
      />
      <SelectionProfile
        title="Đánh giá ứng dụng"
        icon={<Verify variant="Bold" size={24} color={COLORS.primary} />}
        url="/(tabs)/home"
      />
      <SelectionProfile
        title="Đăng xuất"
        icon={<LoginCurve variant="Bold" size={24} color="#FF0000" />}
        url="/(tabs)/home"
        showArrow={false}
        isTitleRed={true}
      />
    </View>
  )
}

export default IntroProfile
