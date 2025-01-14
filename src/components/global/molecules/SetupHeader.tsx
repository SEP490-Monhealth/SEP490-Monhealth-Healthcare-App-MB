import React from "react"

import { Text, View } from "react-native"

import { VStack } from "../atoms"

interface StepHeaderProps {
  title: string
  description: string
}

export const StepHeader = ({ title, description }: StepHeaderProps) => {
  return (
    <VStack className="mb-6">
      <Text className="font-tbold text-2xl text-primary">{title}</Text>
      <Text className="font-tregular text-lg text-accent">{description}</Text>
    </VStack>
  )
}

interface IntroHeaderProps {
  title: string
  description: React.ReactNode
}

export const IntroHeader = ({ title, description }: IntroHeaderProps) => {
  return (
    <VStack className="mb-6">
      <Text className="font-tbold text-2xl text-primary">{title}</Text>
      <View>{description}</View>
    </VStack>
  )
}
