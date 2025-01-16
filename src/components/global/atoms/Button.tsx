import React from "react"

import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  children: React.ReactNode
  icon?: boolean
  onPress?: () => void
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  iconStart,
  iconEnd,
  children,
  icon = false,
  onPress,
  className = ""
}) => {
  const variants = {
    primary: {
      container: disabled ? "bg-secondary" : "bg-primary",
      text: "text-primary-foreground"
    },
    secondary: {
      container: disabled ? "bg-gray-300" : "bg-border",
      text: "text-primary"
    },
    danger: {
      container: disabled ? "bg-gray-300" : "bg-destructive",
      text: "text-destructive-foreground"
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
      activeOpacity={0.9}
      disabled={disabled || loading}
      onPress={onPress}
      className={cn(
        "flex flex-row items-center justify-center rounded-2xl",
        variantClass.container,
        sizeClass.container,
        className
      )}
    >
      {loading ? (
        <View className="flex flex-row items-center justify-center gap-2">
          <ActivityIndicator color="#fff" />
          {children && (
            <Text
              className={cn("font-tmedium", variantClass.text, sizeClass.text)}
            >
              {children}
            </Text>
          )}
        </View>
      ) : icon ? (
        <View className="flex items-center justify-center">{children}</View>
      ) : (
        <View className="flex flex-row items-center justify-center">
          {iconStart && <View className="mr-2">{iconStart}</View>}
          {children && (
            <Text
              className={cn("font-tmedium", variantClass.text, sizeClass.text)}
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
