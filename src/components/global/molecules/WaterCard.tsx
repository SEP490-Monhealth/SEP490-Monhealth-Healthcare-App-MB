import React, { useEffect, useState } from "react"

import { Image, Switch, Text } from "react-native"

import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/app"

import { WaterUpdateType, waterUpdateSchema } from "@/schemas/waterSchema"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface WaterCardProps {
  waterIntakeId: string
  variant?: "switch" | "more"
  intakeTime: string
  volume: number
  status: boolean
  onMorePress?: () => void
  onToggleChange?: (data: WaterUpdateType) => void
}

export const WaterCard = ({
  waterIntakeId,
  intakeTime,
  volume,
  status,
  variant,
  onMorePress,
  onToggleChange
}: WaterCardProps) => {
  const [isChangeStatus, setIsChangeStatus] = useState(status)
  useEffect(() => {
    setIsChangeStatus(status)
  }, [status])

  const handleToggle = (value: boolean) => {
    const updatedData = { waterIntakeId, status: value }
    const validation = waterUpdateSchema.safeParse(updatedData)
    if (validation.success && onToggleChange) {
      onToggleChange(updatedData)
    } else {
      console.error(validation.error)
    }
  }

  const toggleSwitch = (value: boolean) => {
    setIsChangeStatus(value)
    handleToggle(value)
  }

  return (
    <Card>
      <HStack className="items-center justify-between">
        <HStack gap={10} center>
          <Image
            source={require("../../../../public/icons/water-intake.png")}
            className="object-cover"
            style={{ width: 30, height: 30 }}
          />
          <VStack gap={0} className="ml-1">
            <Text className="font-tmedium text-lg text-primary">
              {intakeTime}
            </Text>
            <Text className="font-tmedium text-sm text-accent">
              {volume ?? 0} ml
            </Text>
          </VStack>
        </HStack>

        {variant === "switch" && (
          <Switch
            value={isChangeStatus}
            onValueChange={(value) => toggleSwitch(value)}
            // trackColor={{ false: COLORS.secondary, true: COLORS.accent }}
            // thumbColor={isChangeStatus ? COLORS.primary : COLORS.primary}
            // style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        )}

        {variant === "more" && (
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
