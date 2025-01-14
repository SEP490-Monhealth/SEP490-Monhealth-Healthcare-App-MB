import { Text } from "react-native"

import { LampOn } from "iconsax-react-native"

import { COLORS } from "@/constants/app"

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
    <Text className="mt-1 text-center font-tregular text-sm text-secondary">
      <LampOn variant="Bold" size="24" color={COLORS.lemon} /> {text}
    </Text>
  )
}
