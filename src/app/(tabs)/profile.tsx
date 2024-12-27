import React from "react"

import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { aboutItems, generalItems } from "@/config/site"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/profile"

function ProfileScreen() {
  const router = useRouter()

  const handleLogout = () => {
    console.log("Logout")
    router.push("/(auth)/sign-in")
  }

  return (
    <Container>
      <Header label="Hồ sơ" />

      <Content>
        <VStack center gap={20} className="h-full justify-between">
          <View className="w-full">
            {generalItems.map((item, index) => (
              <ListItem
                key={index}
                startIcon={item.icon}
                label={item.label}
                route={item.route}
              />
            ))}
          </View>

          <View className="w-full">
            {aboutItems.map((item, index) => (
              <ListItem
                key={index}
                startIcon={item.icon}
                label={item.label}
                route={item.route}
                action={item.action}
              />
            ))}

            <Text className="mt-4 text-center font-dmedium text-base text-accent">
              Version 1.1.1
            </Text>
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default ProfileScreen
