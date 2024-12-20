import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface ContentProps {
  margin?: boolean
  className?: string
  children: React.ReactNode
  testID?: string
}

export const Content: React.FC<ContentProps> = ({
  margin = true,
  className = "",
  children,
  testID
}) => {
  return (
    <View
      className={cn("", className)}
      style={{ marginBottom: margin ? 124 : 64 }}
      testID={testID}
    >
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
