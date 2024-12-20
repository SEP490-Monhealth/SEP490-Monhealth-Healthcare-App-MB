import React from "react"

import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { cn } from "@/lib/utils"

interface ContainerProps {
  className?: string
  children: React.ReactNode
  testID?: string
}

export const Container: React.FC<ContainerProps> = ({
  className = "",
  children,
  testID
}) => {
  return (
    <SafeAreaView
      className={cn("flex-1 bg-background", className)}
      testID={testID}
    >
      <View className="px-6">
        <React.Fragment>{children}</React.Fragment>
      </View>
    </SafeAreaView>
  )
}
