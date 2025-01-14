import { Text } from "react-native"

import { LampOn } from "iconsax-react-native"

import { COLORS } from "@/constants/app"

import { HStack, VStack } from "./Stack"

interface TextProps {
  text: string
}

export const ErrorText = ({ text }: TextProps) => {
  return (
    <Text className="ml-1 mt-1 font-tregular text-sm text-destructive">
      {text}
    </Text>
  )
}

export const TipText = ({ text }: TextProps) => {
  return (
    <VStack center>
      <HStack center gap={6}>
        <LampOn variant="Bold" size={20} color={COLORS.lemon} />
        <Text className="font-tmedium text-lg text-primary">Bạn có biết?</Text>
      </HStack>

      <Text className="text-center font-tregular text-sm text-secondary">
        "{text}"
      </Text>
    </VStack>
  )
}
