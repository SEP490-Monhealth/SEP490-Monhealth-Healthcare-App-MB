import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { useRouter } from "expo-router"

import { ChevronRight } from "lucide-react-native"

import { Dialog } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

interface ListItemProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  label: string
  route?: string
  action?: string
  more?: boolean
  onPress?: () => void
}

export const ListItem = ({
  startIcon,
  endIcon,
  label,
  route,
  action,
  more = true,
  onPress
}: ListItemProps) => {
  const router = useRouter()
  const { logout } = useAuth()

  const [isDialogVisible, setDialogVisible] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.replace("/(auth)/sign-in")
    setDialogVisible(false)
  }

  const handlePress = () => {
    onPress?.()

    if (action) {
      switch (action) {
        case "logout":
          setDialogVisible(true)
          break
        default:
          console.log(`Unhandled action: ${action}`)
          break
      }
    } else if (route) {
      router.push(route)
    }
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center justify-between border-b border-border py-4"
        onPress={handlePress}
      >
        <View className="flex-row items-center">
          {startIcon && <View className="mr-4">{startIcon}</View>}
          <Text className="font-tmedium text-base text-primary">{label}</Text>
        </View>

        {endIcon ? (
          <View>{endIcon}</View>
        ) : (
          !action && more && <ChevronRight size={20} color={COLORS.secondary} />
        )}
      </TouchableOpacity>

      {action === "logout" && (
        <Dialog
          isVisible={isDialogVisible}
          title="Đăng xuất"
          description="Bạn có chắc chắn muốn đăng xuất không?"
          confirmText="Đồng ý"
          cancelText="Hủy"
          onConfirm={handleLogout}
          onClose={() => setDialogVisible(false)}
        />
      )}
    </>
  )
}
