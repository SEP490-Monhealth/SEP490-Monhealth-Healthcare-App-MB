import { NotificationType } from "@/schemas/notificationSchema"

export const sampleNotificationData: NotificationType[] = [
  {
    notificationId: "001",
    referenceId: "001",
    title: "Tới giờ uống nước",
    content:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn",
    actionUrl: "/water-reminders",
    createdAt: "2025-01-06T19:45:00Z",
    updatedAt: "2025-01-05T00:00:00Z"
  },
  {
    notificationId: "002",
    referenceId: "002",
    title: "Hệ thống thông báo bảo trì",
    content:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn",
    actionUrl: "/water-reminders",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z"
  },
  {
    notificationId: "003",
    referenceId: "003",
    title: "Khải tỏi thích trò chơi",
    content:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn",
    actionUrl: "/water-reminders",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z"
  }
]
