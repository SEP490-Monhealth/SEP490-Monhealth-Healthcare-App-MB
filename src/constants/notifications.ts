import { NotificationType } from "@/schemas/notificationSchema"

export const sampleNotificationData: NotificationType[] = [
  {
    notificationId: "001",
    userId: "123",

    icon: "https://play-lh.googleusercontent.com/o1EimUcLmc9bfIHMZSifKrzorD24t6zfRHoqRijZRX3tyQdFiktMKN2qSqGUl9U3usE",
    title: "Tới giờ uống nước",
    message:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn.",
    type: "Reminder",
    action_url: "/reminders",
    status: true,

    createdAt: "2025-01-06T19:45:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    notificationId: "002",
    userId: "123",

    icon: "https://play-lh.googleusercontent.com/o1EimUcLmc9bfIHMZSifKrzorD24t6zfRHoqRijZRX3tyQdFiktMKN2qSqGUl9U3usE",
    title: "Tới giờ uống nước",
    message:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn.",
    type: "System",
    action_url: "/reminders",
    status: false,

    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    notificationId: "003",
    userId: "123",

    icon: "https://play-lh.googleusercontent.com/o1EimUcLmc9bfIHMZSifKrzorD24t6zfRHoqRijZRX3tyQdFiktMKN2qSqGUl9U3usE",
    title: "Tới giờ uống nước",
    message:
      "Hãy nhớ uống một ly nước để duy trì sức khỏe! Nước không chỉ giúp cơ thể bạn hoạt động tốt hơn mà còn giúp làn da của bạn luôn tươi tắn.",
    type: "Activity",
    action_url: "/reminders",
    status: false,

    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  }
]
