import React, { useEffect, useMemo, useState } from "react"

import { ActivityIndicator, FlatList, Keyboard, View } from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content } from "@/components/global/atoms"
import {
  ErrorDisplay,
  ListFooter,
  ListHeader,
  NotificationCard
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import {
  useGetNotificationsByUserId,
  useUpdateNotificationStatus
} from "@/hooks/useNotification"

import { NotificationType } from "@/schemas/notificationSchema"

function NotificationsScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const [notificationsData, setNotificationsData] = useState<
    NotificationType[]
  >([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10

  const { mutate: markAsRead } = useUpdateNotificationStatus()

  const { data, isLoading, refetch } = useGetNotificationsByUserId(
    userId,
    page,
    limit
  )

  useEffect(() => {
    if (data?.notifications) {
      setNotificationsData((prev) =>
        page === 1 ? data.notifications : [...prev, ...data.notifications]
      )
      setHasMore(page * limit < data.totalItems)
    }
  }, [data, page])

  useEffect(() => {
    if (!isLoading && isRefreshing) {
      setIsRefreshing(false)
    }
  }, [isLoading, isRefreshing])

  const loadMoreData = () => {
    if (!hasMore || isLoading) return
    setPage((prev) => prev + 1)
  }

  const onEndReached = () => {
    if (isLoading || !hasMore) return
    Keyboard.dismiss()
    loadMoreData()
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setPage(1)
    refetch()
    setIsRefreshing(false)
  }

  const handleMarkAsRead = (notificationId: string, actionUrl?: string) => {
    // console.log(notificationId)
    markAsRead({ notificationId })

    if (actionUrl) {
      router.push(actionUrl)
    }
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        {notificationsData.length > 0 && (
          <Section label="Tất cả thông báo" margin={false} />
        )}
      </ListHeader>
    )
  }, [notificationsData.length])

  if (notificationsData.length === 0 && isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back label="Thông báo" />

      <Content className="mt-2">
        <FlatList
          data={notificationsData || []}
          keyExtractor={(item, index) => `${item.notificationId}-${index}`}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={FlatListHeader}
          renderItem={({ item }) => (
            <NotificationCard
              title={item.title}
              content={item.content}
              timestamp={item.createdAt}
              isRead={item.isRead}
              onPress={() =>
                handleMarkAsRead(item.notificationId, item.actionUrl)
              }
            />
          )}
          ListFooterComponent={
            hasMore ? (
              <ListFooter>
                <ActivityIndicator color={COLORS.primary} />
              </ListFooter>
            ) : (
              <ListFooter />
            )
          }
          ListEmptyComponent={
            <ErrorDisplay
              imageSource={require("../../../public/images/monhealth-no-data-image.png")}
              title="Không có dữ liệu"
              description="Không tìm thấy có thông báo nào ở đây!"
              marginTop={24}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default NotificationsScreen
