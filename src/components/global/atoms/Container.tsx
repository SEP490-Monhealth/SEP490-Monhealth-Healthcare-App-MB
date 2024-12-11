import React from "react"

import { View } from "react-native"

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
    <View
      className={cn(
        "mb-16 h-full min-h-screen bg-background px-6 pt-16",
        className
      )}
    >
      <React.Fragment>{children}</React.Fragment>
    </View>
  )
}
