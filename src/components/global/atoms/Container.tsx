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
    <SafeAreaView className="flex-1 bg-background" testID={testID}>
      <View className={cn("px-6", className)}>
        <React.Fragment>{children}</React.Fragment>
      </View>
    </SafeAreaView>
  )
}
