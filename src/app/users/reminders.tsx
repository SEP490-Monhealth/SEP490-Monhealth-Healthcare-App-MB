import React, { useState } from "react"

import { Switch, Text, View } from "react-native"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/profile"

function RemindersScreen() {
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
  }

  return (
    <Container>
      <Header back title="Nhắc nhở" />

      <Content>
        <VStack className="mt-2">
          <ListItem
            label="Bật thông báo"
            endIcon={<Switch value={isEnabled} onValueChange={toggleSwitch} />}
            more={false}
          />

          {isEnabled && (
            <View className="mt-2">
              <Text className="text-sm text-secondary">
                Thông báo đã được bật, bạn sẽ nhận các nhắc nhở hàng ngày.
              </Text>
            </View>
          )}
        </VStack>
      </Content>
    </Container>
  )
}

export default RemindersScreen
