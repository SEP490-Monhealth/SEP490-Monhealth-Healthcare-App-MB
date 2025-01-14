import { SubscriptionType } from "@/schemas/subscriptionSchema"

export const sampleSubscriptionData: SubscriptionType[] = [
  {
    subscriptionId: "001",
    userId: "user-1",
    name: "Trial",
    price: 99000,
    discount: 0,
    time: 1,
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    subscriptionId: "002",
    userId: "user-1",
    name: "Basic",
    price: 267000,
    discount: 10,
    time: 3,
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    subscriptionId: "003",
    userId: "user-1",
    name: "Premium",
    price: 475000,
    discount: 20,
    time: 6,
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  }
]
