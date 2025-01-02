import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface ContentProps {
  testID?: string
  children: React.ReactNode
  className?: string
}

export const Content: React.FC<ContentProps> = ({
  testID,
  children,
  className = ""
}) => {
  return (
    <View testID={testID} className={cn("flex-1", className)}>
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
