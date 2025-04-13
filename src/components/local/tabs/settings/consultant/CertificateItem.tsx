import React from "react"

import { Text, View } from "react-native"

import { HStack } from "@/components/global/atoms"

interface CertificateItemProps {
  icon: React.ReactNode
  label: string
  value: string | number
}

export const CertificateItem = ({
  icon,
  label,
  value
}: CertificateItemProps) => (
  <HStack gap={16} className="items-center border-b border-border py-3">
    <View>{icon}</View>

    <View className="flex-1 gap-1">
      <Text className="font-tregular text-sm text-accent">{label}</Text>
      <Text className="font-tmedium text-base text-primary">{value}</Text>
    </View>
  </HStack>
)
