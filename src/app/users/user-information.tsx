import React from "react"

import { Text, View } from "react-native"

import { Edit, Edit2, Scroll, Setting2 } from "iconsax-react-native"

import {
  Avatar,
  Container,
  Content,
  HStack,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import CardAccountUser from "@/components/local/tabs/profile/CardAccountUser"
import CardInformationUser from "@/components/local/tabs/profile/CardInformationUser"

import { COLORS } from "@/constants/appConstants"

import { formatDate } from "@/utils/formatters"

const UserInformation = () => {
  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Ftests%2Fangrycat.jpg?alt=media&token=542becf5-173f-47c2-951b-b9f79578fa60"

  return (
    <Container>
      <Header
        title="Thông tin cá nhân"
        back
        action={{
          icon: <Edit2 variant="Bold" size={20} color={COLORS.primary} />,
          url: "/users/settings"
        }}
      />

      <Content margin={false}>
        <ScrollArea>
          <View className="mt-4">
            <Avatar
              size={200}
              source={defaultAvatar}
              alt="Zotaeus"
              className="items-center"
            />

            <VStack center className="mt-6">
              <Text className="font-tbold text-3xl text-primary">
                Van Huu Toan
              </Text>
              <HStack className="items-center">
                <Text className="font-tmedium text-lg text-secondary">
                  Tham gia từ
                  <Text className="text-primary">
                    {formatDate("2024-08-27T00:00:00.000Z")}
                  </Text>
                </Text>
              </HStack>
            </VStack>

            <View className="mt-6">
              <Text className="font-tmedium text-lg text-secondary">
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
              <Text className="font-tmedium text-lg text-secondary">
                Thông tin đăng nhập
              </Text>
              <CardAccountUser
                email="VanHuuToan@gmai.com"
                phoneNumber="0963122758"
                password="123123123"
              />
            </View>
          </View>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default UserInformation
