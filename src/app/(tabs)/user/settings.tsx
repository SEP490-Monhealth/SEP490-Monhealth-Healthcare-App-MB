import React, { useState } from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { aboutItems, generalItems } from "@/configs/site"

import { Card, Container, Content, Modal } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/settings"

import { APP } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

function SettingsScreen() {
  const router = useRouter()
  const { logout } = useAuth()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleLogout = async () => {
    await logout()
    setIsModalVisible(false)
    router.replace("/onboarding/welcome")
  }

  const handleAction = (action: string | undefined) => {
    if (action === "logout") {
      setIsModalVisible(true)
    }
  }

  return (
    <>
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
                onPress={() => handleAction(item.action)}
              />
            ))}

            <Text className="mt-4 text-center font-dregular text-base text-accent">
              Monhealth - Version {APP.version}
            </Text>
          </Card>
          {/* </ScrollArea> */}
        </Content>
      </Container>

      <Modal
        isVisible={isModalVisible}
        title="Đăng xuất"
        description="Bạn có chắc chắn muốn đăng xuất không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleLogout}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default SettingsScreen
