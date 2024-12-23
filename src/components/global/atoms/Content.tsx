import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface ContentProps {
  testID?: string
  margin?: boolean
  className?: string
  children: React.ReactNode
}

export const Content: React.FC<ContentProps> = ({
  testID,
  margin = true,
  className = "",
  children
}) => {
  return (
    <View
      testID={testID}
      className={cn("", className)}
      style={{ marginBottom: margin ? 100 : 64 }}
    >
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
