import React from "react"

import { Text } from "react-native"

import { VStack } from "../atoms"

interface StepHeaderProps {
  title: string
  description: string
}

export const StepHeader = ({ title, description }: StepHeaderProps) => {
  return (
    <VStack>
      <Text className="font-tbold text-2xl text-primary">{title}</Text>
      <Text className="font-tregular text-lg text-accent">{description}</Text>
    </VStack>
  )
}
