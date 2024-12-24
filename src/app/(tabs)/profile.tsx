import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { aboutItems, generalItems } from "@/config/site"
import { Crown1 } from "iconsax-react-native"

import {
  Avatar,
  Button,
  Container,
  Content,
  HStack,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { About, General, HealthStats } from "@/components/local/tabs/profile"

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
      <Header label="Hồ sơ" />

      <Content margin={false}>
        <ScrollArea>
          <VStack center gap={20} className="mt-2 pb-12">
            <Avatar
              size={160}
              source={defaultAvatar}
              alt="Zotaeus"
              className="items-center"
            />

            <VStack center className="mb-2">
              <Text className="font-tbold text-2xl leading-6 text-primary">
                Van Huu Toan
              </Text>

              <HStack center>
                <Crown1 variant="Bold" size="20" color="#ef4444" />
                <Text className="font-dbold text-lg text-destructive">
                  Vip Member
                </Text>
              </HStack>
            </VStack>

            <HealthStats weight={50} height={170} bmi={17.3} />

            <General generalItems={generalItems} />

            <About aboutItems={aboutItems} />

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
