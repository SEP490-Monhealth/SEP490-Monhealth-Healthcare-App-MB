import { Text } from "react-native"

interface ErrorTextProps {
  text: string
}

export const ErrorText = ({ text }: ErrorTextProps) => {
  return (
    <Text className="ml-1 mt-1 font-tregular text-sm text-destructive">
      {text}
    </Text>
  )
}
