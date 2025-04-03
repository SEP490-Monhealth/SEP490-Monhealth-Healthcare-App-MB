import React from "react"

import { Text, TouchableOpacity, View } from "react-native"
import { SvgUri } from "react-native-svg"

import {
  ArchiveAdd,
  ArchiveMinus,
  ArchiveTick,
  FilterAdd,
  FilterTick
} from "iconsax-react-native"
import { Bold } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { useSelectBankStore } from "@/stores/bankStore"

import { Card, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface BankCardProps {
  code: string
  name: string
  shortName: string
  logoUrl: string
  onPress?: () => void
}

export const BankCard = ({
  code,
  name,
  shortName,
  logoUrl,
  onPress
}: BankCardProps) => {
  const selectedCode = useSelectBankStore((state) => state.code)

  const isSelected = selectedCode === code
  return (
    <Card className={`${isSelected && "border border-primary"}`}>
      <VStack gap={12}>
        <View className="flex-1 flex-row items-center justify-between gap-2">
          <View className="flex-1 flex-row gap-2">
            <TouchableOpacity
              activeOpacity={1}
              className="h-12 w-12 items-center justify-center rounded-full bg-muted"
            >
              <SvgUri uri={logoUrl} width={24} height={24} />
            </TouchableOpacity>

            <View className="flex-1 flex-col">
              <Text className="font-tmedium text-base text-primary">
                {shortName}
              </Text>

              <Text
                className="mt-1 font-tmedium text-sm text-accent"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
            </View>
          </View>

          <IconButton
            size="sm"
            icon={
              isSelected ? (
                <ArchiveTick variant="Bold" size={20} color={COLORS.primary} />
              ) : (
                <ArchiveAdd variant="Linear" size={20} color={COLORS.primary} />
              )
            }
            onPress={onPress}
          />
        </View>
      </VStack>
    </Card>
  )
}
