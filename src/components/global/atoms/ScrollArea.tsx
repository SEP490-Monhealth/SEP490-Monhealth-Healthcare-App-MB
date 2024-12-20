import React from "react"

import { ScrollView } from "react-native"

import { cn } from "@/lib/utils"

interface ScrollProps {
  children: React.ReactNode
  className?: string
}

export const ScrollArea = ({ children, className }: ScrollProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className={cn("", className)}
    >
      {children}
    </ScrollView>
  )
}
