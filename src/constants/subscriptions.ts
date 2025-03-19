import { SubscriptionType } from "@/schemas/subscriptionSchema"

export const sampleSubscriptionsData: SubscriptionType[] = [
  {
    subscriptionId: "af7f853b-8c5e-42dc-96e9-be1522ccce82",
    name: "Gói Cơ Bản",
    description:
      "Gói dịch vụ miễn phí với các tính năng cơ bản để theo dõi sức khỏe và dinh dưỡng",
    price: 0,
    durationDays: 0,
    features: [
      "Theo dõi chỉ số sức khỏe cơ bản",
      "Quản lý mục tiêu cá nhân",
      "Theo dõi lượng nước uống hàng ngày",
      "Truy cập danh sách bài tập giới hạn",
      "Báo cáo tiến độ hàng tuần cơ bản"
    ],
    bookingAllowance: 0,
    status: true,
    createdAt: "2025-03-09T00:00:00Z",
    updatedAt: "2025-03-09T00:00:00Z",
    createdBy: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
    updatedBy: "3026595f-1414-4b74-be8f-11b7f6e7f4f6"
  },
  {
    subscriptionId: "bc3f13a3-a31a-4f05-a210-829f513015c9",
    name: "Gói Nâng Cao",
    description:
      "Gói dịch vụ nâng cao với đầy đủ tính năng dinh dưỡng và tập luyện cá nhân hóa",
    price: 249000,
    durationDays: 30,
    features: [
      "Tất cả tính năng của Gói Cơ Bản",
      "Gợi ý bữa ăn hàng ngày theo mục tiêu",
      "Truy cập đầy đủ thư viện bài tập",
      "Nhận thông báo nhắc nhở theo lịch trình",
      "Phân tích chỉ số dinh dưỡng chi tiết"
    ],
    bookingAllowance: 0,
    status: true,
    createdAt: "2025-03-09T00:00:00Z",
    updatedAt: "2025-03-09T00:00:00Z",
    createdBy: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
    updatedBy: "3026595f-1414-4b74-be8f-11b7f6e7f4f6"
  },
  {
    subscriptionId: "c2feaa35-00e8-4fca-9998-bdd2b45dfd5e",
    name: "Gói Cao Cấp",
    description:
      "Gói dịch vụ cao cấp bao gồm tư vấn cá nhân từ chuyên gia dinh dưỡng và thể hình",
    price: 899000,
    durationDays: 30,
    features: [
      "Tất cả tính năng của Gói Nâng Cao",
      "Truy cập danh sách chuyên viên tư vấn chọn lọc",
      "Đặt lịch tư vấn 1-1 với chuyên gia (3 buổi/tháng)",
      "Nhắn tin trực tiếp với chuyên gia",
      "Kế hoạch dinh dưỡng và tập luyện cá nhân hóa",
      "Đánh giá và phản hồi dịch vụ chi tiết"
    ],
    bookingAllowance: 3,
    status: true,
    createdAt: "2025-03-09T00:00:00Z",
    updatedAt: "2025-03-09T00:00:00Z",
    createdBy: "3026595f-1414-4b74-be8f-11b7f6e7f4f6",
    updatedBy: "3026595f-1414-4b74-be8f-11b7f6e7f4f6"
  }
]

export const commissionStructure = {
  premium: {
    appPercentage: 30, // Hệ thống nhận 30%
    consultantPercentage: 70, // Tư vấn viên nhận 70%
    bookingValue: 899000 / 3, // Giá trị mỗi buổi tư vấn: 299,667 VND
    hourlyRate: 299667 // Tương đương khoảng 300,000 VND/buổi
  }
}
