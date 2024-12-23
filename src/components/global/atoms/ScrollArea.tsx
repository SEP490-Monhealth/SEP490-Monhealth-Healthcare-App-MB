import React from "react"

import { ScrollView } from "react-native"

import { cn } from "@/lib/utils"

interface ScrollProps {
  testID?: string
  children: React.ReactNode
  className?: string
}

export const ScrollArea = ({ testID, children, className }: ScrollProps) => {
  return (
    <ScrollView
      testID={testID}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className={cn("", className)}
    >
      {children}
    </ScrollView>
  )
}
