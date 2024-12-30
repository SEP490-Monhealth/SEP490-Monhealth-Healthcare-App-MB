import React from "react"

import { ScrollView } from "react-native"

import { cn } from "@/lib/utils"

interface ScrollProps {
  testID?: string
  orientation?: "horizontal" | "vertical"
  children: React.ReactNode
  className?: string
}

export const ScrollArea = ({
  testID,
  orientation = "vertical",
  children,
  className
}: ScrollProps) => {
  return (
    <ScrollView
      testID={testID}
      horizontal={orientation === "horizontal"}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className={cn("h-full", className)}
    >
      {children}
    </ScrollView>
  )
}
