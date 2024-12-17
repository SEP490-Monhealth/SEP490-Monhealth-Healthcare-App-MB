import React from "react"

import { SafeAreaView, View } from "react-native"

import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = ""
}) => {
  return (
    <SafeAreaView className={cn("flex-1 bg-background", className)}>
      <View className="px-6">
        <React.Fragment>{children}</React.Fragment>
      </View>
    </SafeAreaView>
  )
}
