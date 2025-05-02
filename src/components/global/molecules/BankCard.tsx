import React from "react"

import { Text, TouchableOpacity, View } from "react-native"
import { SvgUri } from "react-native-svg"

import { Feather } from "@expo/vector-icons"
import { Add } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { Card, HStack } from "../atoms"
import { IconButton } from "./IconButton"

interface BankCardProps {
  name: string
  shortName: string
  logoUrl: string
  isSelected?: boolean
  addNewButton?: boolean
  onPress?: () => void
}

export const BankCard = ({
  name,
  shortName,
  logoUrl,
  isSelected,
  addNewButton = false,
  onPress
}: BankCardProps) => {
  return (
    <Card onPress={onPress} className={` ${isSelected && "border-primary"}`}>
      <HStack center gap={8}>
        <View className="flex-1 flex-row">
          <TouchableOpacity
            activeOpacity={1}
            className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
          >
            <SvgUri uri={logoUrl} width={24} height={24} />
          </TouchableOpacity>

          <View className="flex-1">
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

        {addNewButton && (
          <IconButton
            size="sm"
            icon={
              isSelected ? (
                <Feather
                  name="check"
                  size={16}
                  strokeWidth={2.5}
                  color={COLORS.primary}
                />
              ) : (
                <Add size={24} color={COLORS.primary} />
              )
            }
            onPress={onPress}
          />
        )}
      </HStack>
    </Card>
  )
}
