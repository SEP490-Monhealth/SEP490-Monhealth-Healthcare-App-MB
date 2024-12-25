import React from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import { COLORS } from "@/constants/app"

import { HStack } from "../atoms"
import { IconButton } from "./IconButton"

interface CustomHeaderProps {
  content: React.ReactNode
}

export const CustomHeader = ({ content }: CustomHeaderProps) => {
  const router = useRouter()

  const handleBack = (): void => router.back()

  return (
    <HStack center gap={20} className="min-h-14 justify-between">
      <IconButton
        icon={<ArrowLeft size={24} color={COLORS.primary} />}
        onPress={handleBack}
      />
      <View className="flex-1">{content}</View>
    </HStack>
  )
}
