import React from "react"

import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface ButtonProps {
  onPress?: () => void
  children: React.ReactNode
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  icon?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  iconStart,
  iconEnd,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon = false,
  className
}) => {
  const variants = {
    primary: disabled ? "bg-gray-400" : "bg-primary",
    secondary: disabled ? "bg-gray-300" : "bg-gray-700",
    ghost: disabled ? "bg-gray-300" : "bg-[#eaeaea]",
    danger: disabled ? "bg-gray-300" : "bg-red-600"
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  }

  const variantClass = variants[variant]
  const sizeClass = sizes[size]

  return (
    <TouchableOpacity
      className={cn(
        "flex flex-row items-center justify-center rounded-[10px]",
        variantClass,
        sizeClass,
        className,
        icon ? "p-3" : ""
      )}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : icon ? (
        <View className="flex items-center justify-center">{children}</View>
      ) : (
        <View className="flex flex-row items-center">
          {iconStart && <View className="mr-2">{iconStart}</View>}
          {children && (
            <Text className={cn("font-semibold text-white")}>{children}</Text>
          )}
          {iconEnd && <View className="ml-2">{iconEnd}</View>}
        </View>
      )}
    </TouchableOpacity>
  )
}
