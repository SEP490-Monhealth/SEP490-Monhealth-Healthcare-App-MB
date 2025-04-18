import React, { useCallback } from "react"

import { Platform, Text } from "react-native"
import { View } from "react-native"
import { TouchableOpacity } from "react-native"

import { useRouter } from "expo-router"

import { Notification } from "iconsax-react-native"

import { HStack } from "@/components/global/atoms"
import { IconButton } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import {
  useGetNotificationsByConsultantId,
  useGetNotificationsByUserId
} from "@/hooks/useNotification"

import { formatCurrency } from "@/utils/formatters"
import { getGreeting } from "@/utils/helpers"

interface DashboardHeaderProps {
  userId?: string
  consultantId?: string
  fullName?: string
  balance: number
}

export const DashboardHeader = ({
  userId,
  consultantId,
  fullName,
  balance
}: DashboardHeaderProps) => {
  const router = useRouter()

  const { data: notificationsData } = useGetNotificationsByUserId(
    userId,
    1,
    undefined
  )

  const hasNotifications = notificationsData?.notifications || []

  const paddingClass = Platform.OS === "ios" ? "pb-3 pt-0" : "py-4"

  const handleViewNotifications = useCallback(() => {
    router.push("/notifications")
  }, [router])

  const handleViewWithdrawalRequests = useCallback(() => {
    router.push(`/banks/consultant/${consultantId}`)
  }, [router, consultantId])

  return (
    <HStack
      className={`min-h-14 items-center justify-between bg-background ${paddingClass}`}
    >
      <View>
        <Text className="font-pregular text-lg text-accent">
          {getGreeting()}
        </Text>
        <Text className="font-tbold text-2xl text-primary">{fullName}</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleViewWithdrawalRequests}
        >
          <Text className="font-tmedium text-lg text-secondary">
            Số dư: <Text className="font-tbold">{formatCurrency(balance)}</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <IconButton
          icon={
            <Notification variant="Bold" size={24} color={COLORS.primary} />
          }
          onPress={handleViewNotifications}
        />

        {hasNotifications.length > 0 && (
          <View className="absolute right-3 top-2.5 h-3 w-3 rounded-full bg-destructive" />
        )}
      </View>
    </HStack>
  )
}
