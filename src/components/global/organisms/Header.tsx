import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import { COLORS } from "@/constants/appConstants"

import { IconButton } from "../molecules"

interface ActionProps {
  icon: React.ReactNode
  url: string
}

interface HeaderProps {
  title: string
  showBackButton?: boolean
  action?: ActionProps
}

export const Header = ({
  title,
  showBackButton = false,
  action
}: HeaderProps) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleAction = () => {
    if (action?.url) {
      router.push(action.url)
    }
  }

  return (
    <View className="relative mb-4 flex min-h-12 flex-row justify-between">
      {showBackButton && (
        <IconButton
          icon={<ArrowLeft size={24} color={COLORS.primary} />}
          onPress={handleBack}
        />
      )}

      <Text
        className={`mt-2 text-left font-dbold text-xl text-typography ${
          showBackButton && "absolute left-1/2 -translate-x-1/2"
        }`}
      >
        {title}
      </Text>

      {action && <IconButton icon={action.icon} onPress={handleAction} />}
    </View>
  )
}
