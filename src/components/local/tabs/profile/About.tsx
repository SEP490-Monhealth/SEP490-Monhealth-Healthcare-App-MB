import React from "react"

import { Text } from "react-native"

import { Card } from "@/components/global/atoms"

import { ListItem } from "./ListItem"

interface AboutProps {
  aboutItems: {
    icon: React.ReactNode
    label: string
    onPress: () => void
  }[]
}

export const About = ({ aboutItems }: AboutProps) => {
  return (
    <Card activeOpacity={1}>
      <Text className="mb-2 font-tbold text-lg text-primary">
        Giới thiệu
      </Text>

      {aboutItems.map((item, index) => (
        <ListItem
          key={index}
          icon={item.icon}
          label={item.label}
          onPress={item.onPress}
        />
      ))}
    </Card>
  )
}
