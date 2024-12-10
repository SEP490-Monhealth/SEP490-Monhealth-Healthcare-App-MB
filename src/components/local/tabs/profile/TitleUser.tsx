import React from "react"

import { Text, View } from "react-native"

import { HStack } from "@/components/global/atoms"

interface TitleProps {
  icon: React.ReactNode
  title: string | number
}

const TitleUser = ({ icon, title }: TitleProps) => {
  return (
    <HStack className="py-4">
      <View>{icon}</View>
      <Text className="ml-2 text-base font-medium text-primary">{title}</Text>
    </HStack>
  )
}

export default TitleUser
