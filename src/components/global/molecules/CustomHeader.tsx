import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { HStack } from "../atoms"
import { IconButton } from "./IconButton"

interface CustomHeaderProps {
  back?: boolean
  content: React.ReactNode
  onBackPress?: () => void
}

export const CustomHeader = ({
  back = true,
  content,
  onBackPress
}: CustomHeaderProps) => {
  const router = useRouter()

  const handleBack = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      router.back()
    }
  }

  return (
    <HStack center gap={20} className="min-h-14 justify-between">
      {back && (
        <IconButton
          testID="test-icon-more-button"
          icon={<ArrowLeft size={24} color={COLORS.primary} />}
          onPress={handleBack}
        />
      )}

      <View testID="test-header-custom" className="mt-2 flex-1">
        {typeof content === "string" ? <Text>{content}</Text> : content}
      </View>
    </HStack>
  )
}
