import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import { COLORS } from "@/constants/app"

import { HStack } from "../atoms"
import { IconButton } from "../molecules"

interface ActionProps {
  icon: React.ReactNode
  url?: string
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
    if (action?.url) {
      router.push(action.url)
    } else if (onActionPress) {
      onActionPress()
    }
  }

  return (
    <HStack className="relative min-h-14 justify-between pt-0">
      {back && (
        <IconButton
          icon={<ArrowLeft size={24} color={COLORS.primary} />}
          onPress={handleBack}
        />
      )}

      <Text
        key={`header-label-${label}`}
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
