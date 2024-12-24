import React from "react"

import { Text } from "react-native"

import { accountItems, informationItems } from "@/config/site"
import { Edit2 } from "iconsax-react-native"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import {
  Account,
  Information,
  UserAvatar
} from "@/components/local/tabs/profile"

import { COLORS } from "@/constants/app"

function UserInformationScreen() {
  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Ftests%2Fangrycat.jpg?alt=media&token=542becf5-173f-47c2-951b-b9f79578fa60"

  return (
    <Container>
      <Header
        back
        label="Thông tin cá nhân"
        action={{
          icon: <Edit2 variant="Bold" size={20} color={COLORS.primary} />,
          url: "/users/settings"
        }}
      />

      <Content>
        <ScrollArea>
          <VStack center gap={20} className="mt-2">
            <UserAvatar size={200} avatarUrl={defaultAvatar} />

            <VStack center className="mb-2">
              <Text className="font-tbold text-3xl text-primary">
                Van Huu Toan
              </Text>

              <Text className="font-tmedium text-lg text-accent">
                Tham gia từ{" "}
                <Text className="tbold text-primary">27/08/2003</Text>
              </Text>
            </VStack>

            <Information informationItems={informationItems} />

            <Account accountItems={accountItems} />
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default UserInformationScreen
