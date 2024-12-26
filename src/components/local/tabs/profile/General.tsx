import React from "react"

import { Text } from "react-native"

import { Card } from "@/components/global/atoms"

import { ListItem } from "./ListItem"

interface GeneralProps {
  generalItems: {
    icon: React.ReactNode
    label: string
    route: string
  }[]
}

export const General = ({ generalItems }: GeneralProps) => {
  return (
    <Card activeOpacity={1}>
      <Text className="mb-2 font-tbold text-lg text-primary">
        Thông tin chung
      </Text>

      {generalItems.map((item, index) => (
        <ListItem
          key={index}
          startIcon={item.icon}
          label={item.label}
          route={item.route}
          isBorder={false}
        />
      ))}
    </Card>
  )
}
