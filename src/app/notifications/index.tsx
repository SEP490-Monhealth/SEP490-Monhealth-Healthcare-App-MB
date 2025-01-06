import React, { useState } from "react"

import { Animated, FlatList, SafeAreaView, Text, View } from "react-native"

import { Container, Content, VStack } from "@/components/global/atoms"
import {
  ListFooter,
  ListHeader,
  NotificationCard
} from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { sampleNotificationData } from "@/constants/notifications"

import { useAnimation } from "@/hooks/useAnimation"

function NotificationScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const notificationData = sampleNotificationData

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const handleViewNotification = (notificationId: string) => {
    console.log("Notification ID:", notificationId)
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6">
        <Header back label="Thông báo" />

        <Content className="mt-2">
          <FlatList
            data={notificationData || []}
            keyExtractor={(item) => item.notificationId}
            //   onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ListHeader />}
            renderItem={({ item }) => (
              <NotificationCard
                key={item.notificationId}
                title={item.title}
                description={item.description}
                type={item.type}
                href={item.href}
                status={item.status}
                createdAt={item.createdAt} 
                onPress={() => handleViewNotification(item.notificationId)}
              />
            )}
            ListEmptyComponent={() => (
              <VStack center gap={20} className="mt-24">
                <View className="w-full items-center">
                  <Animated.Image
                    source={require("../../../public/images/monhealth-no-data-image.png")}
                    style={{
                      width: 320,
                      height: 320,
                      opacity: fadeAnim,
                      transform: [{ scale: scaleAnim }]
                    }}
                  />
                </View>

                <VStack>
                  <Animated.Text
                    style={{
                      opacity: textFadeAnim,
                      transform: [{ translateY: textTranslateAnim }]
                    }}
                    className="text-center font-tbold text-3xl text-primary"
                  >
                    Không có thông báo mới
                  </Animated.Text>

                  <Animated.Text
                    style={{
                      opacity: textFadeAnim,
                      transform: [{ translateY: textTranslateAnim }]
                    }}
                    className="text-center font-tmedium text-lg text-accent"
                  >
                    Mọi thứ đang diễn ra theo đúng kế hoạch! Nếu cần theo dõi,
                    hãy thêm nhắc nhở hoặc mục tiêu để giữ vững phong độ.
                  </Animated.Text>
                </VStack>
              </VStack>
            )}
            ListFooterComponent={<ListFooter />}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </Content>
      </View>
    </SafeAreaView>
  )
}

export default NotificationScreen
