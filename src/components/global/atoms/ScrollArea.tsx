import React from "react"

import { ScrollView } from "react-native"

interface ScrollProps {
  children: React.ReactNode
}

export const ScrollArea = ({ children }: ScrollProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  )
}
