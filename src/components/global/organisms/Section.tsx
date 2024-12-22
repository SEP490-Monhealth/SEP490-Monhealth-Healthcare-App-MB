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
    <View className={cn("mb-2 ml-0.5", marginClass)}>
      <Text className="font-tbold text-xl text-primary">{title}</Text>
    </View>
  )
}
