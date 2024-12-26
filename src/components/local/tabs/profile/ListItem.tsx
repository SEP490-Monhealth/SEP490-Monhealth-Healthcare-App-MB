import { Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/app"

interface ListItemProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  label: string
  route?: string
  more?: boolean
  isLastItem?: boolean
  isBorder?: boolean // Thêm biến mới để bật/tắt border
}

export const ListItem = ({
  startIcon,
  endIcon,
  label,
  route,
  more = true,
  isLastItem = false,
  isBorder = true
}: ListItemProps) => {
  const router = useRouter()

  const handlePress = (route: string) => {
    router.push(route)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`flex-row items-center justify-between py-4 ${
        isBorder && !isLastItem ? "border-b border-border" : ""
      }`}
      onPress={() => route && handlePress(route)}
    >
      <View className="flex-row items-center">
        {startIcon && <View className="mr-4">{startIcon}</View>}
        <Text className="font-tmedium text-lg text-secondary">{label}</Text>
      </View>

      {endIcon ? (
        <View>{endIcon}</View>
      ) : (
        more && <ChevronRight size={20} color={COLORS.secondary} />
      )}
    </TouchableOpacity>
  )
}
