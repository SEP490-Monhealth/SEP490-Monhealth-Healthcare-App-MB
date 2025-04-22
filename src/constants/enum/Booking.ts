import { EnumMeta } from "@/configs/enum"
import { CalendarAdd, CalendarRemove, CalendarTick } from "iconsax-react-native"
import { z } from "zod"

export enum BookingStatusEnum {
  Pending,
  Completed,
  Cancelled
}

export const BookingStatusSchemaEnum = z.nativeEnum(BookingStatusEnum)

export const bookingStatusMap: Record<BookingStatusEnum, EnumMeta> = {
  [BookingStatusEnum.Pending]: {
    label: "Đã đặt",
    color: "#ca8a04",
    icon: CalendarAdd
  },
  [BookingStatusEnum.Completed]: {
    label: "Đã hoàn thành",
    color: "#3b82f6",
    icon: CalendarTick
  },
  [BookingStatusEnum.Cancelled]: {
    label: "Đã hủy",
    color: "#ef4444",
    icon: CalendarRemove
  }
}

export function getBookingStatusMeta(status: BookingStatusEnum): EnumMeta {
  return bookingStatusMap[status]
}
