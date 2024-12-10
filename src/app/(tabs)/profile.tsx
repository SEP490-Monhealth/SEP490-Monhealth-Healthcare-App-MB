import React from "react"

import { Text, View } from "react-native"

import { Crown1 } from "iconsax-react-native"

import {
  Button,
  Card,
  Container,
  HStack,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import {
  AboutInfo,
  GeneralInfo,
  HealthStats,
  UserAvatar
} from "@/components/local/tabs/profile"

function ProfileScreen() {
  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Ftests%2Fangrycat.jpg?alt=media&token=542becf5-173f-47c2-951b-b9f79578fa60"

  const handleLogout = () => {
    console.log("Logout")
  }

  return (
    <Container scroll>
      <Header title="Hồ sơ" />

      <VStack center gap={20} className="mt-4 pb-16">
        <UserAvatar avatarUrl={defaultAvatar} />

        <VStack center gap={0} className="mb-2">
          <Text className="font-tbold text-2xl text-primary">Van Huu Toan</Text>

          <HStack center gap={4}>
            <Crown1 variant="Bold" size="20" color="#dc2626" />
            <Text className="font-tmedium text-lg text-destructive">
              Vip Member
            </Text>
          </HStack>
        </VStack>

        <HealthStats weight={50} height={170} bmi={17.3} />

        <GeneralInfo />

        <AboutInfo />

        <Button variant="danger" onPress={handleLogout} className="w-full">
          Đăng xuất
        </Button>
      </VStack>
    </Container>
  )
}

export default ProfileScreen
