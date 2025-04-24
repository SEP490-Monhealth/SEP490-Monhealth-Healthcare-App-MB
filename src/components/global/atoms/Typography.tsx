import { Text } from "react-native"

import { LampOn } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { CardHeader } from "./Card"
import { HStack, VStack } from "./Stack"

interface ErrorTextProps {
  error: string
}

export const ErrorText = ({ error }: ErrorTextProps) => {
  return (
    <Text className="ml-1 mt-1 font-tregular text-sm text-destructive">
      {error}
    </Text>
  )
}

interface TipTextProps {
  tip: string
}

export const TipText = ({ tip }: TipTextProps) => {
  return (
    <VStack center>
      <HStack center gap={6}>
        <LampOn variant="Bold" size={20} color={COLORS.PRIMARY.lemon} />
        <CardHeader label="Bạn có biết?" />
      </HStack>

      <Text className="text-center font-tregular text-sm text-secondary">
        "{tip}"
      </Text>
    </VStack>
  )
}
