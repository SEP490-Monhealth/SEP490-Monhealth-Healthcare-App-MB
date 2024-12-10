import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import {
  Chart2,
  Command,
  Lock1,
  NotificationStatus,
  Profile
} from "iconsax-react-native"

import { Card } from "@/components/global/atoms"

import { COLORS } from "@/constants/appConstants"

import { ListItem } from "./ListItem"

export const GeneralInfo = () => {
  const router = useRouter()

  const items = [
    {
      icon: <Profile variant="Bold" size={24} color="#475569" />,
      label: "Hồ sơ cá nhân",
      onPress: () => {
        router.push("/users/user-information")
      }
    },
    {
      icon: <Command variant="Bold" size={24} color="#475569" />,
      label: "Theo dõi sức khỏe",
      onPress: () => {
        router.push("/users/health-tracking")
      }
    },
    {
      icon: <Chart2 variant="Bold" size={24} color="#475569" />,
      label: "Thống kê sức khỏe",
      onPress: () => {
        router.push("/users/health-stats")
      }
    },
    {
      icon: <NotificationStatus variant="Bold" size={24} color="#475569" />,
      label: "Nhắc nhở",
      onPress: () => {
        router.push("/users/reminders")
      }
    },
    {
      icon: <Lock1 variant="Bold" size={24} color="#475569" />,
      label: "Cài đặt bảo mật",
      onPress: () => {
        router.push("/users/security-settings")
      }
    }
  ]

  return (
    <Card activeOpacity={1}>
      <Text className="mb-2 font-tbold text-lg text-typography">
        Thông tin chung
      </Text>

      {items.map((item, index) => (
        <ListItem
          key={index}
          icon={item.icon}
          label={item.label}
          onPress={item.onPress}
        />
      ))}
    </Card>
  )
}
