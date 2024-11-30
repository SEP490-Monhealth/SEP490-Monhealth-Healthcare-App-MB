import React from "react"

import { TouchableOpacity, View } from "react-native"

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
}

export const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.8}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-typography"
    >
      <View>{icon}</View>
    </TouchableOpacity>
  )
}
