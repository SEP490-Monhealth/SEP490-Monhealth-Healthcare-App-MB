import React, { useState } from "react"

import { FlatList, SafeAreaView, View } from "react-native"

import { Content } from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  NotificationCard
} from "@/components/global/molecules"
import { NotificationType } from "@/components/global/molecules/NotificationCard"
import { Header } from "@/components/global/organisms"

import { sampleNotificationData } from "@/constants/notifications"

function NotificationScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const notificationData = sampleNotificationData

  const onRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleReadNotification = (notificationId: string) => {
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
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ListHeader />}
            renderItem={({ item }) => (
              <NotificationCard
                key={item.notificationId}
                type={item.type.toLowerCase() as NotificationType}
                title={item.title}
                description={item.description}
                time={item.createdAt}
                href={item.href}
                status={item.status}
                onPress={() => handleReadNotification(item.notificationId)}
              />
            )}
            ListEmptyComponent={() => (
              <ErrorDisplay
                imageSource={require("../../../public/images/monhealth-no-data-image.png")}
                title="Bạn chưa có thông báo nào"
                description="Mọi thứ vẫn đang ổn! Hãy tiếp tục duy trì và theo dõi những mục tiêu đã đặt ra"
                marginTop={24}
              />
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
