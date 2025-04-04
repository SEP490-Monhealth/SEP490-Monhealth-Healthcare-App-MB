import { Alert, Platform } from "react-native"

import * as Device from "expo-device"
import * as Notifications from "expo-notifications"

export async function registerForPushNotificationsAsync() {
  let token
  try {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()

      let finalStatus = existingStatus

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Thông báo",
          "Không thể nhận thông báo do chưa cấp quyền từ người dùng."
        )
        return null
      }

      token = (await Notifications.getExpoPushTokenAsync()).data
      console.log("Expo Push Token:", token)
    } else {
      Alert.alert("Thông báo", "Phải sử dụng thiết bị thật để nhận thông báo.")
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C"
      })
    }
  } catch (error) {
    console.error("Lỗi khi lấy token:", error)
  }
  return token
}
