import { BookingType } from "@/schemas/bookingSchema"

import { StatusBookingEnum } from "./enums"

export const sampleBookingsData: BookingType[] = [
  {
    bookingId: "a",
    consultantId: "Khải",
    userId: "Toàn",
    scheduleId: "Lịch 1",

    consultant: "Phan Văn Khải",
    customer: "Văn Hữu Toàn",

    date: "2025-02-17T00:00:00.000Z",
    time: "09:00",

    notes:
      "Hướng dẫn tôi tập là nhiệt tình và chú trọng đến các kỹ thuật cơ bản, giúp tôi cải thiện thể lực và sức bền một cách đáng kể. Thầy Khải rất kiên nhẫn và luôn đưa ra những lời khuyên bổ ích, tạo động lực cho tôi mỗi lần gặp gỡ.",

    status: StatusBookingEnum.Pending,

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
    customer: "Nguyễn Phạm Khanh",

    date: "2025-02-18T00:00:00.000Z",
    time: "15:00",

    notes:
      "Hướng dẫn tôi tập là nhiệt tình, luôn dành thời gian để phân tích kỹ lưỡng từng động tác và giúp tôi điều chỉnh cơ thể để đạt được hiệu quả tối đa trong mỗi buổi tập. Những buổi tập với thầy Duy luôn đầy hứng khởi và giúp tôi cảm thấy khỏe mạnh hơn mỗi ngày.",

    status: StatusBookingEnum.Confirmed,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  },
  {
    bookingId: "c",
    consultantId: "Toàn",
    userId: "Khải",
    scheduleId: "Lịch 3",

    consultant: "Văn Hữu Toàn",
    customer: "Phan Văn Khải",

    date: "2025-02-18T00:00:00.000Z",
    time: "18:30",

    notes:
      "Hướng dẫn tôi tập là nhiệt tình, với những bài tập đa dạng và luôn nhắc nhở tôi chú ý đến tư thế và cách hít thở đúng cách. Sau mỗi buổi tập, tôi cảm thấy cơ thể mình linh hoạt và mạnh mẽ hơn rất nhiều. Thầy Toàn luôn tạo cảm giác thoải mái và khích lệ tôi nỗ lực hơn nữa.",

    status: StatusBookingEnum.Completed,

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
    customer: "Phạm Hoài Duy",

    date: "2025-02-20T00:00:00.000Z",
    time: "14:30",

    notes:
      "Hướng dẫn tôi tập là nhiệt tình và có phương pháp rõ ràng, luôn giúp tôi hiểu sâu về các động tác và cải thiện thể lực. Tuy nhiên, do một số lý do cá nhân, tôi không thể tham gia buổi tập lần này, nhưng tôi hy vọng sẽ có cơ hội tham gia lại trong tương lai.",

    status: StatusBookingEnum.Cancelled,

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  }
]
