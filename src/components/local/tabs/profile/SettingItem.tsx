import React from "react"

import { Text, View } from "react-native"

import { Card } from "@/components/global/atoms"

import { ListItem } from "./ListItem"

interface GeneralProps {
  generalItems: {
    icon: React.ReactNode
    label: string
    route: string
  }[]
}

export const SettingItem = ({ generalItems }: GeneralProps) => {
  return (
    <Card activeOpacity={1}>
      {generalItems.map((item, index) => (
        <ListItem
          key={index}
          startIcon={item.icon}
          label={item.label}
          route={item.route}
          isLastItem={index === generalItems.length - 1}
        />
      ))}
    </Card>
  )
}
