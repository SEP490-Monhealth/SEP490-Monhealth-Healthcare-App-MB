import React from "react"

import { Image, Text, View } from "react-native"

import { DocumentText, Eye } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { formatDate } from "@/utils/formatters"

import { Card, HStack } from "../atoms"
import { IconButton } from "./IconButton"

interface CertificateCardProps {
  number: string
  name: string
  issueDate: string
  expiryDate?: string
  issuedBy: string
  onPress?: () => void
}

export const CertificateCard = ({
  number,
  name,
  issueDate,
  expiryDate,
  issuedBy,
  onPress
}: CertificateCardProps) => {
  return (
    <Card>
      <HStack center gap={12} className="justify-between">
        <View className="flex-1 flex-row items-center gap-4">
          <DocumentText variant="Bold" size="32" color={COLORS.primary} />

          <View className="flex-1">
            <Text
              className="font-tmedium text-base text-primary"
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text className="font-tmedium text-sm text-accent">{number}</Text>
            <Text className="font-tmedium text-sm text-accent">{issuedBy}</Text>
            <Text className="font-tmedium text-sm text-accent">
              {formatDate(issueDate)}
              {expiryDate && ` - ${formatDate(expiryDate)}`}
            </Text>
          </View>
        </View>

        <IconButton
          size="sm"
          icon={<Eye variant="Bold" size={16} color={COLORS.primary} />}
          onPress={onPress}
        />
      </HStack>
    </Card>
  )
}
