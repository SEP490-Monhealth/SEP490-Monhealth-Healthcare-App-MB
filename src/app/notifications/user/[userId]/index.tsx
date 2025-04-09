// import React, { useEffect, useMemo, useState } from "react"
// import { ActivityIndicator, Keyboard, View } from "react-native"
// import { FlatList } from "react-native"
// import { LoadingScreen } from "@/app/loading"
// import { Container, Content } from "@/components/global/atoms"
// import {
//   ErrorDisplay,
//   ListFooter,
//   ListHeader,
//   NotificationCard
// } from "@/components/global/molecules"
// import { Header, Section } from "@/components/global/organisms"
// import { COLORS } from "@/constants/color"
// import { NotificationType } from "@/schemas/notificationSchema"
// function NotificationsScreen() {
//   const [notificationsData, setNotificationsData] = useState<
//     NotificationType[]
//   >([])
//   const [page, setPage] = useState<number>(1)
//   const [hasMore, setHasMore] = useState<boolean>(true)
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
//   const limit = 10
//   const { data, isLoading } = useGetNotificationsByUserId(userId, page, limit)
//   useEffect(() => {
//     if (data?.notifications) {
//       setNotificationsData((prev) =>
//         page === 1 ? data.notifications : [...prev, ...data.notifications]
//       )
//       setHasMore(page * limit < data.totalItems)
//     }
//   }, [data, page])
//   useEffect(() => {
//     if (!isLoading && isRefreshing) {
//       setIsRefreshing(false)
//     }
//   }, [isLoading, isRefreshing])
//   const loadMoreData = () => {
//     if (!hasMore || isLoading) return
//     setPage((prev) => prev + 1)
//   }
//   const onEndReached = () => {
//     if (isLoading || !hasMore) return
//     Keyboard.dismiss()
//     loadMoreData()
//   }
//   const onRefresh = () => {
//     setIsRefreshing(true)
//     Keyboard.dismiss()
//     setPage(1)
//   }
//   const handleMarkAllAsRead = () => {
//     console.log("Mark all as read")
//   }
//   const FlatListHeader = useMemo(() => {
//     return (
//       <ListHeader className="pt-4">
//         {notificationsData.length > 0 && (
//           <Section
//             label="Tất cả thông báo"
//             actionText="Đánh dấu đã đọc"
//             onPress={handleMarkAllAsRead}
//           />
//         )}
//       </ListHeader>
//     )
//   }, [notificationsData.length])
//   if (notificationsData.length === 0 && isLoading) {
//     return <LoadingScreen />
//   }
//   return (
//     <Container>
//       <Header back label="Thông báo" />
//       <Content>
//         <FlatList
//           data={notificationsData || []}
//           keyExtractor={(item, index) => `${item.notificationId}-${index}`}
//           onRefresh={onRefresh}
//           refreshing={isRefreshing}
//           showsVerticalScrollIndicator={false}
//           stickyHeaderIndices={[0]}
//           initialNumToRender={10}
//           maxToRenderPerBatch={5}
//           windowSize={5}
//           onEndReached={onEndReached}
//           onEndReachedThreshold={0.5}
//           ListHeaderComponent={FlatListHeader}
//           renderItem={({ item }) => (
//             <NotificationCard
//               title="Thông báo mới"
//               content="Nội dung thông báo"
//               timestamp="2023-10-01T12:00:00Z"
//               actionUrl="/foods/A41A3BC6-0F34-409F-9045-0807FBB4469B"
//               isRead={false}
//             />
//           )}
//           ListFooterComponent={
//             hasMore ? (
//               <ListFooter>
//                 <ActivityIndicator color={COLORS.primary} />
//               </ListFooter>
//             ) : (
//               <ListFooter />
//             )
//           }
//           ListEmptyComponent={
//             <ErrorDisplay
//               imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
//               title="Không có dữ liệu"
//               description="Không tìm thấy có thông báo nào ở đây!"
//               marginTop={24}
//             />
//           }
//           ItemSeparatorComponent={() => <View className="h-3" />}
//         />
//       </Content>
//     </Container>
//   )
// }
// export default NotificationsScreen
import React from "react"

import { Text, View } from "react-native"

import { Container, Content } from "@/components/global/atoms"

const NotificationsScreen = () => {
  return (
    <Container>
      <Content>
        <Text>NotificationsScreen</Text>
      </Content>
    </Container>
  )
}

export default NotificationsScreen
