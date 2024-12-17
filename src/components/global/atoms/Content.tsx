import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface ContentProps {
  children: React.ReactNode
  margin?: boolean
  className?: string
}

export const Content: React.FC<ContentProps> = ({
  children,
  margin = true,
  className = ""
}) => {
  return (
    <View
      className={cn("", className)}
      style={{ marginBottom: margin ? 124 : 64 }}
    >
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
