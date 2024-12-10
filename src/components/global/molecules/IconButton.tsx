import React from "react"

import { TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface IconButtonProps {
  icon: React.ReactNode
  onPress?: () => void
  className?: string
}

export const IconButton = ({
  icon,
  onPress,
  className = ""
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-typography",
        className
      )}
    >
      <View>{icon}</View>
    </TouchableOpacity>
  )
}
