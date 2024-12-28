import React from "react"

import { Text, View } from "react-native"

import { aboutItems, generalItems } from "@/config/site"

import {
  Card,
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/profile"

function ProfileScreen() {
  return (
    <Container>
      <Header label="Hồ sơ" />

      <Content marginBottom={false}>
        {/* <ScrollArea> */}
        <VStack className="mt-2 h-full justify-between pb-12">
          <Card>
            {generalItems.map((item, index) => (
              <ListItem
                key={index}
                startIcon={item.icon}
                label={item.label}
                route={item.route}
              />
            ))}
          </Card>

          <Card>
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
          </Card>
        </VStack>
        {/* </ScrollArea> */}
      </Content>
    </Container>
  )
}

export default ProfileScreen
