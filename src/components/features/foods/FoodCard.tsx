import { Text, TouchableOpacity } from "react-native"

interface FoodCardProps {
  variant?: "default"
  onPress?: () => void
}

export function FoodCard({ variant, onPress }: FoodCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>FoodCard</Text>
    </TouchableOpacity>
  )
}
