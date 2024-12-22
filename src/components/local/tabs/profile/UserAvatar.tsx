import React from "react"

import { View } from "react-native"

import { Edit2 } from "iconsax-react-native"

import { Avatar } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

interface UserAvatarProps {
  size: number
  avatarUrl: string
}

export const UserAvatar = ({ size, avatarUrl }: UserAvatarProps) => {
  return (
    <View>
      <Avatar size={size} source={avatarUrl} alt="Zotaeus" />

      <IconButton
        icon={<Edit2 variant="Bold" size={20} color={COLORS.primary} />}
        className="absolute bottom-0 right-2"
      />
    </View>
  )
}
