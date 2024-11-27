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
  className = ""
}) => {
  const variants = {
    primary: {
      container: disabled ? "bg-gray-400" : "bg-primary",
      text: "text-white"
    },
    secondary: {
      container: disabled ? "bg-gray-300" : "bg-gray-700",
      text: "text-white"
    },
    ghost: {
      container: disabled ? "bg-gray-300" : "bg-[#eaeaea]",
      text: "text-typography"
    },
    danger: {
      container: disabled ? "bg-gray-300" : "bg-red-600",
      text: "text-white"
    }
  }

  const sizes = {
    sm: { container: "h-10 px-4", text: "text-sm" },
    md: { container: "h-14 px-5", text: "text-base" },
    lg: { container: "h-16 px-6", text: "text-lg" }
  }

  const variantClass = variants[variant]
  const sizeClass = sizes[size]

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.8}
      className={cn(
        "flex flex-row items-center justify-center rounded-2xl",
        variantClass.container,
        sizeClass.container,
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : icon ? (
        <View className="flex items-center justify-center">{children}</View>
      ) : (
        <View className="flex flex-row items-center">
          {iconStart && <View className="mr-2">{iconStart}</View>}
          {children && (
            <Text
              className={cn(
                "font-nsemibold",
                variantClass.text,
                sizeClass.text
              )}
            >
              {children}
            </Text>
          )}
          {iconEnd && <View className="ml-2">{iconEnd}</View>}
        </View>
      )}
    </TouchableOpacity>
  )
}
