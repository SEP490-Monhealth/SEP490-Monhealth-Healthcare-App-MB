import React from "react"

import { Image, Switch, Text, TouchableOpacity } from "react-native"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface WaterCardProps {
  variant?: "switch" | "more"
  name?: string
  time: string
  volume: number
  status: boolean
  onSwitchChange?: () => void
  onMorePress?: () => void
}

export const WaterCard = ({
  variant,
  name,
  time,
  volume,
  status,
  onSwitchChange,
  onMorePress
}: WaterCardProps) => {
  const handlePress = () => {
    if (variant === "switch" && onSwitchChange) {
      onSwitchChange()
    }
  }

  return (
    <Card onPress={handlePress}>
      <HStack className="w-full items-center justify-between">
        <HStack gap={10} center>
          <TouchableOpacity
            activeOpacity={1}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
          >
            <Image
              source={require("../../../../public/icons/glass-of-water.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "cover"
              }}
            />
          </TouchableOpacity>

          <VStack gap={0} className="ml-1">
            <Text className="font-tmedium text-lg text-primary">{time}</Text>
            <Text className="font-tmedium text-sm text-accent">
              {name}, {volume ?? 0} ml
            </Text>
          </VStack>
        </HStack>

        {variant === "switch" ? (
          <Switch
            value={status}
            onValueChange={onSwitchChange}
            trackColor={{
              false: "#F5F5F5",
              true: "#E0F7FA"
            }}
            thumbColor={status ? "#B2EBF2" : "#E3F2FD"}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        ) : (
          <IconButton
            size="sm"
            icon={<MoreHorizontal size={20} color={COLORS.primary} />}
            onPress={onMorePress}
          />
        )}
      </HStack>
    </Card>
  )
}
