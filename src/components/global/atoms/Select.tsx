import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { ArrowDown2 } from "iconsax-react-native"

import { cn } from "@/lib/utils"

interface SelectProps {
  label?: string
  defaultValue?: string
  value?: string
  onPress: () => void
  errorMessage?: string
  className?: string
}

export const Select = ({
  label,
  defaultValue,
  value,
  onPress,
  errorMessage,
  className = ""
}: SelectProps) => {
  const hasError = !!errorMessage

  return (
    <View>
      {label && (
        <Text
          className={`mb-1 ml-1 font-tregular text-base ${hasError ? "text-destructive" : "text-primary"}`}
        >
          {label}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        className={cn(
          `flex flex-row items-center rounded-2xl border border-border bg-white px-4 ${
            hasError ? "border-destructive bg-red-50" : "border-border bg-white"
          }`,
          className
        )}
        style={{ height: 52 }}
      >
        <Text
          className={cn("flex-1 font-tregular", value && "text-primary")}
          style={value ? {} : { color: "#a9a9a9" }}
        >
          {value || defaultValue}
        </Text>

        <ArrowDown2 size={20} color="#cbd5e1" />
      </TouchableOpacity>

      {hasError && errorMessage && (
        <Text className="ml-1 mt-1 font-tregular text-sm text-destructive">
          {errorMessage}
        </Text>
      )}
    </View>
  )
}
