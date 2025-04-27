import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum ReportStatusEnum {
  Pending,
  Approved,
  Rejected
}

export const ReportStatusSchemaEnum = z.nativeEnum(ReportStatusEnum)

const reportStatusMap: Record<ReportStatusEnum, EnumMeta> = {
  [ReportStatusEnum.Pending]: {
    label: "Chờ duyệt",
    color: "#ca8a04" // yellow 600
  },
  [ReportStatusEnum.Approved]: {
    label: "Đã duyệt",
    color: "#3b82f6" // blue 500
  },
  [ReportStatusEnum.Rejected]: {
    label: "Đã từ chối",
    color: "#ef4444" // red 500
  }
}

export function getReportStatusMeta(status: ReportStatusEnum): EnumMeta {
  return reportStatusMap[status]
}
