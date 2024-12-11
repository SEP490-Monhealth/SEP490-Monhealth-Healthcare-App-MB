import React from "react"

import { Text } from "react-native"

import { Card } from "@/components/global/atoms"

import { ListItem } from "./ListItem"

interface GeneralProps {
  generalItems: {
    icon: React.ReactNode
    label: string
    onPress: () => void
  }[]
}

export const General = ({ generalItems }: GeneralProps) => {
  return (
    <Card activeOpacity={1}>
      <Text className="mb-2 font-tbold text-lg text-typography">
        Thông tin chung
      </Text>

      {generalItems.map((item, index) => (
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
