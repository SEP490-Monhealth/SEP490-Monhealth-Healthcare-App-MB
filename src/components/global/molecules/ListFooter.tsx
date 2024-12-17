import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface ListFooterProps {
  children?: React.ReactNode
  className?: string
}

export const ListFooter: React.FC<ListFooterProps> = ({
  children,
  className = ""
}) => {
  return (
    <View className={cn("mt-8 pb-12", className)}>
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
