import React from "react"

import { ScrollView, View } from "react-native"

import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  scrollable?: boolean
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  scrollable = false,
  className = ""
}) => {
  return (
    <View
      className={cn("h-full min-h-screen bg-background px-6 py-16", className)}
    >
      {scrollable ? (
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
