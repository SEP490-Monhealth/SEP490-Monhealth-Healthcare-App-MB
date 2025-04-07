import { Alert, Platform } from "react-native"

import Constants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"

/**
 * Thiết lập xử lý thông báo cho các trạng thái khác nhau của ứng dụng
 * @param {React.Dispatch<React.SetStateAction<string>>} setExpoPushToken - Hàm để lưu token vào state
 * @returns {Function} Hàm giải phóng để xóa các trình lắng nghe thông báo
 */
export function setupNotifications(
  setExpoPushToken: React.Dispatch<React.SetStateAction<string>>
): () => void {
  // Đăng ký nhận thông báo đẩy và lấy token
  registerForPushNotificationsAsync().then((token) => {
    if (token) {
      setExpoPushToken(token)
      // Thông thường bạn sẽ gửi token này đến backend của bạn
      // await sendPushTokenToBackend(token);
    }
  })

  // Xử lý thông báo nhận được khi ứng dụng đang ở foreground
  const foregroundSubscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Thông báo nhận được khi ứng dụng đang mở:", notification)
      // Tại đây bạn có thể xử lý thông báo, ví dụ: hiển thị một cảnh báo trong ứng dụng
    }
  )

  // Xử lý thông báo nhận được khi ứng dụng đang ở background
  const backgroundSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      const { notification } = response
      const data = notification.request.content.data
      console.log("Thông báo được nhấp vào:", data)

      // Tại đây bạn có thể điều hướng đến một màn hình cụ thể dựa trên thông báo
      // Ví dụ: if (data.type === 'message') navigation.navigate('Messages', { id: data.id });
    })

  // Trả về hàm giải phóng để xóa các trình lắng nghe
  return () => {
    foregroundSubscription.remove()
    backgroundSubscription.remove()
  }
}

/**
 * Đăng ký nhận thông báo đẩy và trả về token
 * @returns {Promise<string|null>} Token thông báo đẩy Expo hoặc null nếu đăng ký thất bại
 */
export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  let token: string | null = null

  try {
    // Kiểm tra xem đây có phải là thiết bị thật (không phải simulator/emulator)
    if (!Device.isDevice) {
      Alert.alert("Thông báo", "Phải sử dụng thiết bị thật để nhận thông báo.")
      return null
    }

    // Kiểm tra và yêu cầu quyền
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
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

    // Lấy token thông báo đẩy
    const projectId = Constants.expoConfig?.extra?.eas?.projectId
    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId // Bao gồm ID dự án của bạn cho các bản build EAS
    })
    token = pushTokenData.data

    console.log("Token thông báo đẩy Expo:", token)

    // Thiết lập kênh thông báo Android
    if (Platform.OS === "android") {
      await setupAndroidNotificationChannel()
    }
  } catch (error) {
    console.error("Lỗi khi lấy token thông báo đẩy:", error)
  }

  return token
}

/**
 * Thiết lập kênh thông báo Android (bắt buộc cho Android 8.0+)
 */
async function setupAndroidNotificationChannel(): Promise<void> {
  await Notifications.setNotificationChannelAsync("default", {
    name: "Mặc định",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
    sound: "default",
    enableVibrate: true,
    showBadge: true
  })

  // Bạn có thể thêm nhiều kênh khác nhau cho các loại thông báo khác nhau nếu cần
  await Notifications.setNotificationChannelAsync("updates", {
    name: "Cập nhật ứng dụng",
    description: "Nhận thông báo về cập nhật ứng dụng và tính năng mới",
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#1F7CFF",
    sound: "default"
  })
}

/**
 * Hàm hỗ trợ để gửi token thông báo đẩy đến backend của bạn
 * @param {string} token - Token thông báo đẩy Expo
 */
/* 
export async function sendPushTokenToBackend(token: string): Promise<void> {
  try {
    // Thay thế bằng endpoint API của bạn
    const response = await fetch('https://api-cua-ban.com/dang-ky-token-thong-bao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        userId: 'lay-user-id-tu-auth-context', // Lấy từ ngữ cảnh xác thực của bạn
        deviceInfo: {
          os: Platform.OS,
          osVersion: Platform.Version,
        },
      }),
    });
    
    const data = await response.json();
    console.log('Token đã được đăng ký với backend:', data);
  } catch (error) {
    console.error('Không thể đăng ký token với backend:', error);
  }
}
*/
