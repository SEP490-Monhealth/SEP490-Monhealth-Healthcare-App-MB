import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"

import { Card, VStack } from "../atoms"

interface BankCardProps {
  onPress?: () => void
}

export const BankCard = ({ onPress }: BankCardProps) => {
  return (
    <Card onPress={onPress}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          source={{
            uri: "https://cdn.banklookup.net/assets/images/bank-icons/BIDV.svg"
          }}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <VStack>
        <Text className="font-tmedium text-base text-primary">BIDV</Text>

        <Text className="font-tmedium text-sm text-accent">
          Ngân hàng TMCP Đầu tư và Phát triển Việt Nam
        </Text>
      </VStack>
    </Card>
  )
}
