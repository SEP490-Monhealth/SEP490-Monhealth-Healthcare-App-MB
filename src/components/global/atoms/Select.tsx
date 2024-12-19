import React from "react"

import { Text, TouchableOpacity } from "react-native"

import clsx from "clsx"
import { ArrowDown2 } from "iconsax-react-native"

import { cn } from "@/lib/utils"

interface SelectProps {
  defaultValue: string
  value?: string
  onPress: () => void
  className?: string
}

export const Select = ({
  defaultValue,
  value,
  onPress,
  className = ""
}: SelectProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={cn(
        "flex h-14 flex-row items-center rounded-2xl border border-border bg-white px-4 py-3",
        className
      )}
    >
      <Text
        className={clsx(
          "flex-1 text-base",
          value ? "font-tmedium text-primary" : "font-tmedium text-accent"
        )}
      >
        {value || defaultValue}
      </Text>

      <ArrowDown2 size={20} color="#cbd5e1" />
    </TouchableOpacity>
  )
}
