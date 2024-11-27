import React from "react"

import { TouchableOpacity, View } from "react-native"

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.8}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-typography"
    >
      <View className="ml-2">{icon}</View>
    </TouchableOpacity>
  )
}

export default IconButton
