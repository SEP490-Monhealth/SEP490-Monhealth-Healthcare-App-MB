import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import { COLORS } from "@/constants/app"

import { HStack } from "../atoms"
import { IconButton } from "../molecules"

interface ActionProps {
  icon: React.ReactNode
  href?: string
}

interface HeaderProps {
  label: string
  back?: boolean
  action?: ActionProps
  onBackPress?: () => void
  onActionPress?: () => void
}

export const Header = ({
  label,
  back = false,
  action,
  onBackPress,
  onActionPress
}: HeaderProps) => {
  const router = useRouter()

  const handleBack = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      router.back()
    }
  }

  const handleAction = () => {
    if (action?.href) {
      router.push(action.href)
    } else if (onActionPress) {
      onActionPress()
    }
  }

  return (
    <HStack className="relative min-h-14 items-center justify-between">
      {back && (
        <IconButton
          icon={<ArrowLeft size={24} color={COLORS.primary} />}
          onPress={handleBack}
        />
      )}

      <Text
        className={`mt-1 flex-1 font-tbold text-xl text-primary ${back ? "ml-0 text-center" : "ml-1 text-left"}`}
      >
        {label}
      </Text>

      {action ? (
        <IconButton icon={action.icon} onPress={handleAction} />
      ) : (
        <View className="h-12 w-12" />
      )}
    </HStack>
  )
}
