import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface ListHeaderProps {
  children?: React.ReactNode
  className?: string
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  children,
  className = ""
}) => {
  return (
    <View className={cn("bg-background pb-4", className)}>
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
