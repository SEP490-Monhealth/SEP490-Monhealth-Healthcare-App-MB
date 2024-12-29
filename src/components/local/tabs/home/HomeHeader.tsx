import React from "react"

import { Platform, Text } from "react-native"
import { View } from "react-native"

import { Notification } from "iconsax-react-native"

import { HStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

import { getGreeting } from "@/utils/helpers"

interface HomeHeaderProps {
  fullName?: string
}

export const HomeHeader = ({ fullName }: HomeHeaderProps) => {
  const paddingClass = Platform.OS === "ios" ? "pb-3 pt-0" : "py-4"

  return (
    <HStack
      className={`min-h-14 items-center justify-between bg-background ${paddingClass}`}
    >
      <View>
        <Text className="font-pregular text-lg text-accent">
          {getGreeting()}
        </Text>
        <Text className="font-tbold text-2xl text-primary">{fullName}</Text>
      </View>

      <IconButton
        icon={<Notification variant="Bold" size={24} color={COLORS.primary} />}
      />
    </HStack>
  )
}
