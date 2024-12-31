import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface ContentProps {
  testID?: string
  className?: string
  children: React.ReactNode
}

export const Content: React.FC<ContentProps> = ({
  testID,
  className = "",
  children
}) => {
  return (
    <View testID={testID} className={cn("flex-1", className)}>
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
