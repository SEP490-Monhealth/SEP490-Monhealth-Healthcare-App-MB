import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { I3Dcube, Verify } from "iconsax-react-native"

import { Card } from "@/components/global/atoms"

import { COLORS } from "@/constants/appConstants"

import { ListItem } from "./ListItem"

export const AboutInfo = () => {
  const router = useRouter()

  const items = [
    {
      icon: <I3Dcube variant="Bold" size={24} color={COLORS.primary} />,
      label: "Thông tin ứng dụng",
      onPress: () => {
        router.push("/about")
      }
    },
    {
      icon: <Verify variant="Bold" size={24} color={COLORS.primary} />,
      label: "Phản hồi và đánh giá",
      onPress: () => {
        router.push("/feedback")
      }
    }
  ]

  return (
    <Card activeOpacity={1}>
      <Text className="mb-2 font-tmedium text-lg text-typography">
        Giới thiệu
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
