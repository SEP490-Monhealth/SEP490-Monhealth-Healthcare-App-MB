import React from "react"

import { Text } from "react-native"

import { aboutItems, generalItems } from "@/config/site"

import { Card, Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/profile"

import { APP } from "@/constants/app"

function ProfileScreen() {
  return (
    <Container>
      <Header label="Hồ sơ" />

      <Content className="mt-2 justify-between pb-12">
        {/* <ScrollArea> */}
        <Card activeOpacity={1}>
          {generalItems.map((item, index) => (
            <ListItem
              key={index}
              startIcon={item.icon}
              label={item.label}
              route={item.route}
            />
          ))}
        </Card>

        <Card activeOpacity={1}>
          {aboutItems.map((item, index) => (
            <ListItem
              key={index}
              startIcon={item.icon}
              label={item.label}
              route={item.route}
              action={item.action}
            />
          ))}

          <Text className="mt-4 text-center font-dregular text-base text-accent">
            Monhealth - Version {APP.version}
          </Text>
        </Card>
        {/* </ScrollArea> */}
      </Content>
    </Container>
  )
}

export default ProfileScreen
