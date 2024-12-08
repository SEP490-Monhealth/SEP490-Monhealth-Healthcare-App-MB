import React from "react"

import { Setting2 } from "iconsax-react-native"

import { Avatar, Container } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"

function ProfileScreen() {
  const defaultAvatar = ""

  return (
    <Container>
      <Header
        title="Hồ sơ"
        action={{
          icon: <Setting2 variant="Bold" size={24} color={COLORS.primary} />,
          url: "/users/settings"
        }}
      />

      <Avatar
        size={120}
        source={defaultAvatar}
        alt="Zotaeus"
        className="items-center"
      />
    </Container>
  )
}

export default ProfileScreen
