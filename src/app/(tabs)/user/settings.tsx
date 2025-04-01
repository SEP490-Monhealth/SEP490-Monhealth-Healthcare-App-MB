import React, { useState } from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { userAboutRoutes, userProfileRoutes } from "@/configs/routes"

import { Card, Container, Content, Modal } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/settings"

import { APP } from "@/constants/app"
import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

function SettingsScreen() {
  const router = useRouter()

  const { user, logout } = useAuth()
  const userId = user?.userId

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
            {userProfileRoutes.map((item, index) => {
              const route =
                typeof item.route === "function"
                  ? item.route(userId!)
                  : item.route
              const Icon = item.icon

              return (
                <ListItem
                  key={index}
                  route={route}
                  label={item.label}
                  startIcon={
                    <Icon variant="Bold" size={24} color={COLORS.accent} />
                  }
                />
              )
            })}
          </Card>

          <Card activeOpacity={1}>
            {userAboutRoutes.map((item, index) => {
              const route =
                typeof item.route === "function"
                  ? item.route(userId!)
                  : item.route
              const Icon = item.icon

              return (
                <ListItem
                  key={index}
                  route={route}
                  startIcon={
                    <Icon variant="Bold" size={24} color={COLORS.accent} />
                  }
                  label={item.label}
                  action={item.action}
                  onPress={() => handleAction(item.action)}
                />
              )
            })}

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
