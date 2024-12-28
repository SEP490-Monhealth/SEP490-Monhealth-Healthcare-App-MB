import React from "react"

import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { cn } from "@/lib/utils"

interface ContentProps {
  testID?: string
  marginBottom?: boolean
  className?: string
  children: React.ReactNode
}

const TAB_BAR_HEIGHT = 80

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
      style={{ paddingBottom: marginBottom ? TAB_BAR_HEIGHT : 0 }}
    >
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
