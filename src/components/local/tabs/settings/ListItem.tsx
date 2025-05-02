import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { Feather } from "@expo/vector-icons"

import { COLORS } from "@/constants/color"

interface ListItemProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  label?: string | number
  route?: string
  action?: string
  more?: boolean
  isBorder?: boolean
  onPress?: () => void
}

export const ListItem = ({
  startIcon,
  endIcon,
  label,
  route,
  action,
  more = true,
  isBorder = true,
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
      activeOpacity={0.8}
      className={`flex-row items-center justify-between py-4 ${isBorder ? "border-b border-border" : ""}`}
      onPress={handlePress}
    >
      <View className="flex-1">
        <View className="flex-row items-center">
          {startIcon && <View className="mr-4">{startIcon}</View>}

          <View className="flex-1">
            <Text className="font-tmedium text-base text-primary">{label}</Text>
          </View>
        </View>
      </View>

      {endIcon ? (
        <View>{endIcon}</View>
      ) : (
        !action &&
        more && (
          <Feather name="chevron-right" size={20} color={COLORS.secondary} />
        )
      )}
    </TouchableOpacity>
  )
}
