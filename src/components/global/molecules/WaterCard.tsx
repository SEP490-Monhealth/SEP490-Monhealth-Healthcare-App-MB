import React from "react"

import { Image, Switch, Text, TouchableOpacity } from "react-native"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { WaterUpdateType, waterUpdateSchema } from "@/schemas/waterSchema"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface WaterCardProps {
  waterIntakeId: string
  variant?: "switch" | "more"
  time: string
  amount: number
  status: boolean
  onMorePress?: () => void
  onToggleChange?: (data: WaterUpdateType) => void
}

export const WaterCard = ({
  waterIntakeId,
  variant = "more",
  time,
  amount,
  status,
  onMorePress,
  onToggleChange
}: WaterCardProps) => {
  const handleToggle = (value: boolean) => {
    const updatedData = { waterIntakeId, status: value }

    const validation = waterUpdateSchema.safeParse(updatedData)

    console.log(validation.data)
  }

  return (
    <Card>
      <HStack className="items-center justify-between">
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
              {amount ?? 0} ml
            </Text>
          </VStack>
        </HStack>

        {variant === "switch" ? (
          <Switch
            value={status}
            onValueChange={handleToggle}
            trackColor={{ false: COLORS.secondary, true: COLORS.accent }}
            thumbColor={status ? COLORS.primary : COLORS.primary}
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
