import { NotificationType } from "@/schemas/notificationSchema"

export const sampleNotificationData: NotificationType[] = [
  {
    notificationId: "001",
    userId: "123",

    title: "Tới giờ uống nước",
    description:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn.",
    type: "Reminder",
    href: "/reminders",
    status: true,

    createdAt: "2025-01-06T19:45:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    notificationId: "002",
    userId: "123",

    title: "Hệ thống thông báo bảo trì",
    description:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn.",
    type: "System",
    href: "/reminders",
    status: false,

    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    notificationId: "003",
    userId: "123",

    title: "Khải tỏi thích trò chơi",
    description:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn.",
    type: "Activity",
    href: "/reminders",
    status: false,

    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  }
]
