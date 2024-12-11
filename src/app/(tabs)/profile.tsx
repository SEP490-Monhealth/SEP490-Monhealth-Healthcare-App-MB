import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { Crown1 } from "iconsax-react-native"

import {
  Button,
  Container,
  Content,
  HStack,
  ScrollArea,
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
  const router = useRouter()

  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Ftests%2Fangrycat.jpg?alt=media&token=542becf5-173f-47c2-951b-b9f79578fa60"

  const handleLogout = () => {
    console.log("Logout")
    router.push("/(auth)/sign-in")
  }

  return (
    <Container>
      <Header title="Hồ sơ" />

      <Content>
        <ScrollArea>
          <VStack center gap={20} className="mt-4 pb-16">
            <UserAvatar avatarUrl={defaultAvatar} />

            <VStack center gap={0} className="mb-2">
              <Text className="font-tbold text-2xl text-typography">
                Van Huu Toan
              </Text>

              <HStack center gap={4}>
                <Crown1 variant="Bold" size="20" color="#ef4444" />
                <Text className="font-dbold text-lg text-destructive">
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
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ProfileScreen
