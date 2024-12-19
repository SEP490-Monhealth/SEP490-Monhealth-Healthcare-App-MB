import React from "react"

import { Text, View } from "react-native"

import { cn } from "@/lib/utils"

interface SectionProps {
  title: string
  margin?: boolean
}

export const Section = ({ title, margin = true }: SectionProps) => {
  const marginClass = margin ? "mt-6" : ""

  return (
    <View className={cn("ml-1", marginClass)}>
      <Text className="font-tbold text-xl text-primary">{title}</Text>
    </View>
  )
}
