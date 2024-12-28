import React from "react"

import { Platform, Text } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import { COLORS } from "@/constants/app"

import { HStack } from "../atoms"
import { IconButton } from "../molecules"

interface ActionProps {
  icon: React.ReactNode
  url?: string
  onPress?: () => void
}

interface HeaderProps {
  label: string
  back?: boolean
  action?: ActionProps
}

export const Header = ({ label, back = false, action }: HeaderProps) => {
  const router = useRouter()

  const paddingClass = Platform.OS === "ios" ? "pt-0" : "pt-4"

  const handleBack = () => router.back()

  const handleAction = () => {
    if (action?.onPress) {
      action.onPress()
    } else if (action?.url) {
      router.push(action.url)
    }
  }

  return (
    <HStack className={`relative min-h-14 justify-between ${paddingClass}`}>
      {back && (
        <IconButton
          icon={<ArrowLeft size={24} color={COLORS.primary} />}
          onPress={handleBack}
        />
      )}

      <Text
        className={`mt-2 text-left font-tbold text-xl text-primary ${
          back && "absolute left-1/2 -translate-x-1/2"
        }`}
      >
        {label}
      </Text>

      {action && <IconButton icon={action.icon} onPress={handleAction} />}
    </HStack>
  )
}
