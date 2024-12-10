import React from "react"

import { Image, Text, View } from "react-native"

import { Setting2 } from "iconsax-react-native"

import {
  Avatar,
  Card,
  Container,
  HStack,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import BmiProfile from "@/components/local/tabs/profile/BmiProfile"
import InfoProfile from "@/components/local/tabs/profile/InfoProfile"
import IntroProfile from "@/components/local/tabs/profile/IntroProfile"

import { COLORS } from "@/constants/appConstants"

function ProfileScreen() {
  const defaultAvatar = ""

  return (
    <Container scrollable>
      <Header
        title="Hồ sơ"
        action={{
          icon: <Setting2 variant="Bold" size={24} color={COLORS.primary} />,
          url: "/users/settings"
        }}
      />

      <Avatar
        size={120}
        source={defaultAvatar}
        alt="Zotaeus"
        className="items-center"
      />

      <VStack center className="mt-6">
        <Text className="font-tbold text-3xl text-primary">Van Huu Toan</Text>
        <HStack className="items-center">
          <Image
            source={require("../../../public/images/fire-icon.png")}
            resizeMode="cover"
            style={{ width: 27, height: 27 }}
          />
          <Text className="font-tmedium text-lg text-secondary-foreground">
            Giữ lửa
          </Text>
          <Text className="font-tmedium text-lg text-secondary-foreground">
            270
          </Text>
        </HStack>
      </VStack>

      <View className="mt-6 px-4">
        <BmiProfile weight={60} bmi={17.3} height={165} />
      </View>

      <Text className="mt-6 font-tmedium text-lg text-secondary-foreground">
        Thông tin chung
      </Text>
      <Card className="mt-2">
        <InfoProfile />
      </Card>

      <Text className="mt-6 font-tmedium text-lg text-secondary-foreground">
        Giới thiệu
      </Text>
      <Card className="mb-20 mt-2">
        <IntroProfile />
      </Card>
    </Container>
  )
}

export default ProfileScreen
