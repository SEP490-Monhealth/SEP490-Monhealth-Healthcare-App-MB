import React from "react"

import { Text } from "react-native"

import { Card } from "@/components/global/atoms"

import { ListItem } from "./ListItem"

interface AccountProps {
  accountItems: {
    icon: React.ReactNode
    label: string
  }[]
}

export const Account = ({ accountItems }: AccountProps) => {
  return (
    <Card activeOpacity={1}>
      <Text className="mb-2 font-tbold text-lg text-typography">
        Thông tin đăng nhập
      </Text>

      {accountItems.map((item, index) => (
        <ListItem
          key={index}
          icon={item.icon}
          label={item.label}
          more={false}
        />
      ))}
    </Card>
  )
}
