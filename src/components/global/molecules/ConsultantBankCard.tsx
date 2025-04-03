import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"
import { SvgUri } from "react-native-svg"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { Badge, Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface ConsultantBankCardProps {
  bank?: {
    shortName: string
    logoUrl: string
  }
  number?: string
  name?: string
  isDefault?: boolean
  onMorePress?: () => void
}

export const ConsultantBankCard = ({
  bank,
  number,
  name,
  isDefault,
  onMorePress
}: ConsultantBankCardProps) => {
  return (
    <Card>
      <VStack gap={12}>
        <HStack center className="justify-between">
          <HStack center gap={16}>
            <TouchableOpacity
              activeOpacity={1}
              className="h-12 w-12 items-center justify-center rounded-full bg-muted"
            >
              {bank ? (
                <SvgUri uri={bank.logoUrl} width={24} height={24} />
              ) : (
                <Text className="font-tmedium text-base text-primary">TK</Text>
              )}
            </TouchableOpacity>

            {bank ? (
              <View>
                <HStack center gap={8}>
                  <Text className="font-tmedium text-base text-primary">
                    {bank.shortName}
                  </Text>

                  {isDefault && <Badge label="Mặc định" />}
                </HStack>

                <Text className="mt-1 font-tmedium text-sm text-accent">
                  {number}
                </Text>
              </View>
            ) : (
              <Text className="font-tmedium text-base text-accent">
                Chưa có tài khoản
              </Text>
            )}
          </HStack>

          <IconButton
            size="sm"
            icon={<MoreHorizontal size={20} color={COLORS.primary} />}
            onPress={onMorePress}
          />
        </HStack>

        <View className="border border-border" />

        <VStack gap={6}>
          <HStack center className="justify-between">
            <Text className="font-tregular text-base text-accent">
              Tên tài khoản
            </Text>
            <Text className="font-tmedium text-base text-primary">
              {name ? name.toUpperCase() : "Chưa thiết lập"}
            </Text>
          </HStack>

          <HStack center className="justify-between">
            <Text className="font-tregular text-base text-accent">
              Số tài khoản
            </Text>
            <Text className="font-tmedium text-base text-primary">
              {number ? number : "Chưa thiết lập"}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Card>
  )
}
