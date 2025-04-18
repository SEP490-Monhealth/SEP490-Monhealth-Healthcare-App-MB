import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const osEnum = z.enum(["iOS", "Android", "Windows", "macOS", "Linux"], {
  errorMap: () => ({ message: "Hệ điều hành không hợp lệ" })
})

const versionRegex = /^\d+(\.\d+){0,2}$/

const deviceSchema = z.object({
  deviceId: uuidSchema,
  userId: uuidSchema,

  expoPushToken: z
    .string({
      required_error: "Mã thông báo thiết bị là bắt buộc",
      invalid_type_error: "Mã thông báo thiết bị phải là chuỗi"
    })
    .nonempty({ message: "Mã thông báo thiết bị không được để trống" })
    .min(10, {
      message: "Mã thông báo thiết bị quá ngắn, phải có ít nhất 10 ký tự"
    })
    .max(255, { message: "Mã thông báo thiết bị quá dài, tối đa 255 ký tự" }),
  deviceModel: z
    .string()
    .nonempty({ message: "Tên thiết bị là bắt buộc" })
    .min(2, { message: "Tên thiết bị quá ngắn" })
    .max(100, { message: "Tên thiết bị quá dài" }),
  os: osEnum,
  osVersion: z
    .string()
    .nonempty({ message: "Phiên bản hệ điều hành là bắt buộc" })
    .regex(versionRegex, {
      message: "Phiên bản hệ điều hành phải có định dạng x.y hoặc x.y.z"
    })
    .max(20, { message: "Phiên bản hệ điều hành quá dài" }),
  appVersion: z
    .string()
    .nonempty({ message: "Phiên bản ứng dụng là bắt buộc" })
    .regex(versionRegex, {
      message: "Phiên bản ứng dụng phải có định dạng x.y hoặc x.y.z"
    })
    .max(20, { message: "Phiên bản ứng dụng quá dài" }),

  ...timestampFields
})

export const createDeviceSchema = deviceSchema.pick({
  userId: true,
  expoPushToken: true,
  deviceModel: true,
  os: true,
  osVersion: true,
  appVersion: true
})

export type DeviceType = z.infer<typeof deviceSchema>
export type CreateDeviceType = z.infer<typeof createDeviceSchema>
