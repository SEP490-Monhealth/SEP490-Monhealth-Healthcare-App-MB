import React, { useCallback } from "react"

import { Platform, Text } from "react-native"
import { View } from "react-native"

import { useRouter } from "expo-router"

import { Notification } from "iconsax-react-native"

import { HStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"

import { useGetNotificationsByUserId } from "@/hooks/useNotification"

import { getGreeting } from "@/utils/helpers"

interface HomeHeaderProps {
  userId?: string
  fullName?: string
}

export const HomeHeader = ({ userId, fullName }: HomeHeaderProps) => {
  const router = useRouter()

  const { data: notificationsData } = useGetNotificationsByUserId(
    userId,
    1,
    undefined
  )

  const hasNewNotifications = (notificationsData?.notifications || []).some(
    (notification) => notification.isRead === false
  )

  const paddingClass = Platform.OS === "ios" ? "pb-3 pt-0" : "py-4"

  const handleViewNotifications = useCallback(() => {
    router.push("/notifications")
  }, [router])

  return (
    <HStack
      className={`min-h-14 items-center justify-between bg-background ${paddingClass}`}
    >
      <View>
        <Text className="font-pregular text-lg text-accent">
          {getGreeting()}
        </Text>
        <Text className="font-tbold text-2xl text-primary">{fullName}</Text>
      </View>

      <View>
        <IconButton
          icon={
            <Notification variant="Bold" size={24} color={COLORS.primary} />
          }
          onPress={handleViewNotifications}
        />

        {hasNewNotifications && (
          <View className="absolute right-3 top-2.5 h-3 w-3 rounded-full bg-destructive" />
        )}
      </View>
    </HStack>
  )
}
