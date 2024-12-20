import React from "react"

import { Text } from "react-native"

import { Card } from "@/components/global/atoms"

import { ListItem } from "./ListItem"

interface InformationProps {
  informationItems: {
    icon: React.ReactNode
    label: string
  }[]
}

export const Information = ({ informationItems }: InformationProps) => {
  return (
    <Card activeOpacity={1}>
      <Text className="mb-2 font-tbold text-lg text-primary">
        Thông tin cá nhân
      </Text>

      {informationItems.map((item, index) => (
        <ListItem
          key={index}
          startIcon={item.icon}
          label={item.label}
          more={false}
        />
      ))}
    </Card>
  )
}
