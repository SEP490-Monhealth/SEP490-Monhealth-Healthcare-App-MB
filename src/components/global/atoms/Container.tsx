import React from "react"

import { SafeAreaView, View } from "react-native"

import { cn } from "@/lib/utils"

interface ContainerProps {
  className?: string
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({
  className = "",
  children
}) => {
  return (
    <SafeAreaView className={cn("flex-1 bg-background", className)}>
      <View className="px-6">
        <React.Fragment>{children}</React.Fragment>
      </View>
    </SafeAreaView>
  )
}
