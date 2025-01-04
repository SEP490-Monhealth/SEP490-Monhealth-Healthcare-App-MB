import React, { useState } from "react"

import { Text } from "react-native"

import { Container, Content, Toggle, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/profile"

function RemindersScreen() {
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
  }

  return (
    <Container>
      <Header back label="Nhắc nhở" />

      <Content>
        <VStack className="mt-2">
          <ListItem
            label="Bật thông báo"
            endIcon={<Toggle value={isEnabled} onValueChange={toggleSwitch} />}
            more={false}
            onPress={toggleSwitch}
          />

          {isEnabled && (
            <Text className="mt-2 text-base text-accent">
              Thông báo đã được bật, bạn sẽ nhận các nhắc nhở hàng ngày.
            </Text>
          )}
        </VStack>
      </Content>
    </Container>
  )
}

export default RemindersScreen
