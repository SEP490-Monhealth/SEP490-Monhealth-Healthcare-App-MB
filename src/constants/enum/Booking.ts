import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum BookingStatusEnum {
  Booked,
  Completed,
  Reported,
  Cancelled
}

export const BookingStatusSchemaEnum = z.nativeEnum(BookingStatusEnum)

export const bookingStatusMap: Record<BookingStatusEnum, EnumMeta> = {
  [BookingStatusEnum.Booked]: {
    label: "Đã đặt",
    color: "#ca8a04"
  },
  [BookingStatusEnum.Completed]: {
    label: "Đã hoàn thành",
    color: "#3b82f6"
  },
  [BookingStatusEnum.Reported]: {
    label: "Đã báo cáo",
    color: "#ef4444"
  },
  [BookingStatusEnum.Cancelled]: {
    label: "Đã hủy",
    color: "#ef4444"
  }
}

export function getBookingStatusMeta(status: BookingStatusEnum): EnumMeta {
  return bookingStatusMap[status]
}
