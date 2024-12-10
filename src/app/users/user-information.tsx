import React from "react"

import { Text, View } from "react-native"

import { Setting2 } from "iconsax-react-native"

import { Avatar, Container, HStack, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import CardAccountUser from "@/components/local/tabs/profile/CardAccountUser"
import CardInformationUser from "@/components/local/tabs/profile/CardInformationUser"

import { COLORS } from "@/constants/appConstants"

import { formatDate } from "@/utils/formatters"

const UserInformation = () => {
  const defaultAvatar = ""

  return (
    <Container scroll>
      <Header
        title="Thông tin cá nhân"
        back
        action={{
          icon: <Setting2 variant="Bold" size={24} color={COLORS.primary} />,
          url: "/users/settings"
        }}
      />

      <View className="mt-4">
        <Avatar
          size={120}
          source={defaultAvatar}
          alt="Zotaeus"
          className="items-center"
        />

        <VStack center className="mt-6">
          <Text className="font-tbold text-3xl text-primary">Van Huu Toan</Text>
          <HStack className="items-center">
            <Text className="font-tmedium text-lg text-card">
              Tham gia từ
              <Text className="text-primary">
                {formatDate("2024-08-27T00:00:00.000Z")}
              </Text>
            </Text>
          </HStack>
        </VStack>

        <View className="mt-6">
          <Text className="font-tmedium text-lg text-card">
            Thông tin cá nhân
          </Text>
          <CardInformationUser
            fullName="Van Huu Toan"
            dateOfBirth="2003-08-27T00:00:00.000Z"
            gender="Male"
            weight={60}
            height={173}
          />
        </View>

        <View className="mt-6">
          <Text className="font-tmedium text-lg text-card">
            Thông tin đăng nhập
          </Text>
          <CardAccountUser
            email="VanHuuToan@gmai.com"
            phoneNumber="0963122758"
            password="123123123"
          />
        </View>
      </View>
    </Container>
  )
}

export default UserInformation
