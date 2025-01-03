import { ReminderType } from "@/schemas/reminderSchema"

export const sampleReminderData: ReminderType[] = [
  {
    reminderId: "001",
    userId: "123",

    name: "Nhắc nhở 1",
    time: "08:00",
    volume: 250,
    status: true,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    reminderId: "002",
    userId: "123",

    name: "Nhắc nhở 2",
    time: "09:00",
    volume: 500,
    status: true,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    reminderId: "003",
    userId: "123",

    name: "Nhắc nhở 3",
    time: "10:00",
    volume: 300,
    status: true,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    reminderId: "004",
    userId: "123",

    name: "Nhắc nhở 4",
    time: "15:00",
    volume: 200,
    status: false,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  }
]
