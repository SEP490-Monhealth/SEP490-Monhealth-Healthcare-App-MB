import React from "react"

import { TouchableOpacity, View } from "react-native"

interface IconButtonProps {
  icon: React.ReactNode
  onPress?: () => void
}

export const IconButton = ({ icon, onPress }: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-typography"
    >
      <View>{icon}</View>
    </TouchableOpacity>
  )
}
