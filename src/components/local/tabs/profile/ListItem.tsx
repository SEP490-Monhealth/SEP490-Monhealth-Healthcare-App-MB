import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/app"

interface ListItemProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  label: string
  route?: string
  action?: string
  more?: boolean
  onPress?: () => void
}

export const ListItem = ({
  startIcon,
  endIcon,
  label,
  route,
  action,
  more = true,
  onPress
}: ListItemProps) => {
  const router = useRouter()

  const handlePress = () => {
    onPress?.()

    if (route) {
      router.push(route)
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center justify-between border-b border-border py-4"
      onPress={handlePress}
    >
      <View className="flex-row items-center">
        {startIcon && <View className="mr-4">{startIcon}</View>}
        <Text className="font-tmedium text-base text-primary">{label}</Text>
      </View>

      {endIcon ? (
        <View>{endIcon}</View>
      ) : (
        !action && more && <ChevronRight size={20} color={COLORS.secondary} />
      )}
    </TouchableOpacity>
  )
}
