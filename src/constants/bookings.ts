import { BookingType } from "@/schemas/bookingSchema"

import { BookingStatusEnum } from "./enum/Booking"

export const sampleBookingsData: BookingType[] = [
  {
    bookingId: "99b9eae6-f5e8-4b41-9394-6a8f2ca1062b",
    consultantId: "Khải",
    userId: "Toàn",
    scheduleId: "Lịch 1",

    consultant: "Phan Văn Khải",
    consultantAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    customer: "Văn Hữu Toàn",
    customerAvatar:
      "https://i.pinimg.com/236x/6c/6d/7c/6c6d7c477e320b67b9c6a16b2de2c0d5.jpg",

    date: "2025-02-17T00:00:00.000Z",
    time: "09:00",

    notes:
      "Hướng dẫn tôi tập là nhiệt tình và chú trọng đến các kỹ thuật cơ bản, giúp tôi cải thiện thể lực và sức bền một cách đáng kể. Thầy Khải rất kiên nhẫn và luôn đưa ra những lời khuyên bổ ích, tạo động lực cho tôi mỗi lần gặp gỡ",
    cancellationReason: "",

    status: BookingStatusEnum.Pending,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    bookingId: "b",
    consultantId: "Duy",
    userId: "Khanh",
    scheduleId: "Lịch 2",

    consultant: "Phạm Hoài Duy",
    consultantAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    customer: "Nguyễn Phạm Khanh",
    customerAvatar:
      "https://i.pinimg.com/236x/6c/6d/7c/6c6d7c477e320b67b9c6a16b2de2c0d5.jpg",

    date: "2025-02-18T00:00:00.000Z",
    time: "15:00",

    notes:
      "Hướng dẫn tôi tập là nhiệt tình, luôn dành thời gian để phân tích kỹ lưỡng từng động tác và giúp tôi điều chỉnh cơ thể để đạt được hiệu quả tối đa trong mỗi buổi tập. Những buổi tập với thầy Duy luôn đầy hứng khởi và giúp tôi cảm thấy khỏe mạnh hơn mỗi ngày",
    cancellationReason: "",

    status: BookingStatusEnum.Confirmed,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    bookingId: "99b9eae6-f5e8-4b41-9394-6a8f2ca1062b",
    consultantId: "91df2b87-a28d-4e89-a779-d4220d68a0f8",
    userId: "Khải",
    scheduleId: "Lịch 3",

    consultant: "Văn Hữu Toàn",
    consultantAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    customer: "Phan Văn Khải",
    customerAvatar:
      "https://i.pinimg.com/236x/6c/6d/7c/6c6d7c477e320b67b9c6a16b2de2c0d5.jpg",

    date: "2025-02-18T00:00:00.000Z",
    time: "18:30",

    notes:
      "Hướng dẫn tôi tập là nhiệt tình, với những bài tập đa dạng và luôn nhắc nhở tôi chú ý đến tư thế và cách hít thở đúng cách. Sau mỗi buổi tập, tôi cảm thấy cơ thể mình linh hoạt và mạnh mẽ hơn rất nhiều. Thầy Toàn luôn tạo cảm giác thoải mái và khích lệ tôi nỗ lực hơn nữa",
    cancellationReason: "",

    status: BookingStatusEnum.Completed,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    bookingId: "d",
    consultantId: "Đại",
    userId: "Duy",
    scheduleId: "Lịch 4",

    consultant: "Nguyễn Quốc Đại",
    consultantAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg",
    customer: "Phạm Hoài Duy",
    customerAvatar:
      "https://i.pinimg.com/236x/6c/6d/7c/6c6d7c477e320b67b9c6a16b2de2c0d5.jpg",

    date: "2025-02-20T00:00:00.000Z",
    time: "14:30",

    notes:
      "Hướng dẫn tôi tập là nhiệt tình và có phương pháp rõ ràng, luôn giúp tôi hiểu sâu về các động tác và cải thiện thể lực. Tuy nhiên, do một số lý do cá nhân, tôi không thể tham gia buổi tập lần này, nhưng tôi hy vọng sẽ có cơ hội tham gia lại trong tương lai",
    cancellationReason: "",

    status: BookingStatusEnum.Cancelled,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  }
]
