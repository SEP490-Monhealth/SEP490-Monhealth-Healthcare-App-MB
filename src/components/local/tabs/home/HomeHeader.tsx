import React from "react"

import { Text } from "react-native"

import { Notification } from "iconsax-react-native"

import { HStack, VStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/appConstants"

import { getGreeting } from "@/utils/helpers"

interface HomeHeaderProps {
  fullName: string
}

export const HomeHeader = ({ fullName }: HomeHeaderProps) => {
  return (
    <HStack className="min-h-14 items-center justify-between bg-background pb-4">
      <VStack>
        <Text className="font-pregular text-lg text-accent">
          {getGreeting()}
        </Text>
        <Text className="font-tbold text-2xl leading-6 text-primary">
          {fullName}
        </Text>
      </VStack>

      <IconButton
        icon={<Notification variant="Bold" size={24} color={COLORS.primary} />}
      />
    </HStack>
  )
}
