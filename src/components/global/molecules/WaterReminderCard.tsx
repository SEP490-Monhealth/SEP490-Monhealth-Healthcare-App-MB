import React from "react"

import { Image, Text, TouchableOpacity } from "react-native"

import { Feather } from "@expo/vector-icons"

import { COLORS } from "@/constants/color"

import { toFixed } from "@/utils/formatters"

import {
  Badge,
  Card,
  CardHeader,
  Checkbox,
  HStack,
  Toggle,
  VStack
} from "../atoms"
import { IconButton } from "./IconButton"

interface WaterReminderCardProps {
  variant?: "checkbox" | "switch" | "more"
  name?: string
  time: string
  volume: number
  status?: boolean
  isDrunk: boolean
  onPress?: () => void
  onCheckboxChange?: (value: boolean) => void
  onSwitchChange?: (value: boolean) => void
  onMorePress?: () => void
}

export const WaterReminderCard = ({
  variant,
  name,
  time,
  volume,
  status,
  isDrunk,
  onPress,
  onCheckboxChange,
  onSwitchChange,
  onMorePress
}: WaterReminderCardProps) => {
  const handlePress = () => {
    if (variant === "switch" && onSwitchChange) {
      onSwitchChange(!isDrunk)
    } else if (variant === "checkbox" && onCheckboxChange) {
      onCheckboxChange(!isDrunk)
    }
  }

  return (
    <Card onPress={handlePress}>
      <HStack className="w-full items-center justify-between">
        <HStack gap={10} center onPress={onPress}>
          <TouchableOpacity
            activeOpacity={1}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
          >
            <Image
              source={require("../../../../public/icons/glass-of-water.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <VStack gap={0} className="ml-1">
            <HStack center gap={8}>
              <CardHeader label={time} />

              {status && <Badge label="Đang bật" />}
            </HStack>

            <Text className="font-tmedium text-sm text-accent">
              {name} • {toFixed(volume, 0)} ml
            </Text>
          </VStack>
        </HStack>

        {variant === "switch" ? (
          <Toggle
            value={isDrunk}
            onValueChange={onSwitchChange ?? (() => {})}
          />
        ) : variant === "checkbox" ? (
          <Checkbox checked={isDrunk} onCheckChange={onCheckboxChange} />
        ) : (
          <IconButton
            size="sm"
            icon={
              <Feather
                name="more-horizontal"
                size={20}
                color={COLORS.primary}
              />
            }
            onPress={onMorePress}
          />
        )}
      </HStack>
    </Card>
  )
}
