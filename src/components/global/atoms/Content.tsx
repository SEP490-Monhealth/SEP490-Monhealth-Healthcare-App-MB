import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface ContentProps {
  testID?: string
  marginBottom?: boolean
  className?: string
  children: React.ReactNode
}

export const Content: React.FC<ContentProps> = ({
  testID,
  marginBottom = true,
  className = "",
  children
}) => {
  return (
    <View
      testID={testID}
      className={cn("", className)}
      style={{ marginBottom: marginBottom ? 92 : 64 }}
    >
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
