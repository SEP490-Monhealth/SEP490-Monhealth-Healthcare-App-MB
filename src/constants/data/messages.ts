import { MessageType } from "@/schemas/messageSchema"

import { MessageTypeEnum } from "../enum/Chat"

export const sampleMessagesData: MessageType[] = [
  {
    messageId: "1",
    chatId: "chat1",
    senderId: "9D7E87A9-B070-4607-A0B0-2D2322AECE9B",
    receiveId: "122DC7DF-16DE-49A3-AB83-5299686F6203",
    type: MessageTypeEnum.Sent,
    content: "Mấy giờ bắt đầu bạng",
    createdAt: "2025-03-30T19:06:00Z",
    updatedAt: "2025-03-30T19:06:00Z"
  },
  {
    messageId: "2",
    chatId: "chat1",
    senderId: "9D7E87A9-B070-4607-A0B0-2D2322AECE9B",
    receiveId: "122DC7DF-16DE-49A3-AB83-5299686F6203",
    type: MessageTypeEnum.Sent,
    content: "Làm sớm sủi sớm",
    createdAt: "2025-03-30T19:07:00Z",
    updatedAt: "2025-03-30T19:07:00Z"
  },
  {
    messageId: "3",
    chatId: "chat1",
    senderId: "122DC7DF-16DE-49A3-AB83-5299686F6203",
    receiveId: "9D7E87A9-B070-4607-A0B0-2D2322AECE9B",
    type: MessageTypeEnum.Received,
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Fusers%2Fef00731b-724a-4e80-8930-36b2abffbec6.jpg?alt=media&token=408e26ce-b249-4139-a919-5cac9082c35c",
    content: "Chắc 8h di bạng tui đang làm",
    createdAt: "2025-03-30T19:19:00Z",
    updatedAt: "2025-03-30T19:19:00Z"
  },
  {
    messageId: "4",
    chatId: "chat1",
    senderId: "9D7E87A9-B070-4607-A0B0-2D2322AECE9B",
    receiveId: "122DC7DF-16DE-49A3-AB83-5299686F6203",
    type: MessageTypeEnum.Sent,
    content: "Ghê vậy",
    createdAt: "2025-03-30T19:23:00Z",
    updatedAt: "2025-03-30T19:23:00Z"
  },
  {
    messageId: "5",
    chatId: "chat1",
    senderId: "9D7E87A9-B070-4607-A0B0-2D2322AECE9B",
    receiveId: "122DC7DF-16DE-49A3-AB83-5299686F6203",
    type: MessageTypeEnum.Sent,
    content: "Phi vụ hả", // Changed 'message' to 'content'
    createdAt: "2025-03-30T19:23:00Z",
    updatedAt: "2025-03-30T19:23:00Z"
  }
  // Additional messages would follow the same pattern
]
