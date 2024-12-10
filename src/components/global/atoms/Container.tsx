import React from "react"

import { ScrollView, View } from "react-native"

import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  scroll?: boolean
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  scroll = false,
  className = ""
}) => {
  return (
    <View
      className={cn("h-full min-h-screen bg-background px-6 py-16", className)}
    >
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </View>
  )
}
