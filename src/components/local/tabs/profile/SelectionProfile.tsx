import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { ArrowRight2 } from "iconsax-react-native"

import { COLORS } from "@/constants/appConstants"

import { HStack } from "../../../global/atoms/Stack"

interface SectionProps {
  title: string
  icon: React.ReactNode
  url: string
  showArrow?: boolean
  isTitleRed?: boolean
}

const SelectionProfile = ({
  title,
  icon,
  url,
  showArrow = true,
  isTitleRed = false
}: SectionProps) => {
  const router = useRouter()

  const handlePress = () => {
    router.push(url)
  }

  return (
    <TouchableOpacity onPress={handlePress} className="py-4">
      <View className="flex-row items-center justify-between">
        <HStack>
          <View>{icon}</View>
          <Text
            className="ml-2 text-base font-medium"
            style={{ color: isTitleRed ? "#FF0000" : COLORS.primary }}
          >
            {title}
          </Text>
        </HStack>

        {showArrow && <ArrowRight2 size={20} color={COLORS.primary} />}
      </View>
    </TouchableOpacity>
  )
}

export default SelectionProfile
