import React from "react"

import { View } from "react-native"

import { router } from "expo-router"

import { aboutItems, generalItems } from "@/config/site"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { SettingItem } from "@/components/local/tabs/profile"

const Setting = () => {
  const handleLogout = () => {
    console.log("Logout")
    router.push("/(auth)/sign-in")
  }
  return (
    <Container className="flex-1 flex-col justify-between">
      <View>
        <Header label="Hồ sơ" />
        <SettingItem generalItems={generalItems} />
      </View>

      <VStack gap={30}>
        <SettingItem generalItems={aboutItems} />
        <Button variant="danger" onPress={handleLogout} className="w-full">
          Đăng xuất
        </Button>
      </VStack>
    </Container>
  )
}

export default Setting
