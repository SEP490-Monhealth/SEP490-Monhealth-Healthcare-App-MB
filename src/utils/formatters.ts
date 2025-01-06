import { format, formatDistanceToNow, parseISO } from "date-fns"

/**
 * Định dạng ngày/thời gian
 * @param date Ngày (Date hoặc chuỗi)
 * @param formatStr Chuỗi định dạng (mặc định: dd/MM/yyyy)
 * @returns Chuỗi ngày đã định dạng
 */
export const formatDate = (
  date: Date | string,
  formatStr: string = "dd/MM/yyyy"
) => {
  return format(new Date(date), formatStr)
}

export const formatDateYYYYMMDD = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

/**
 * Hiển thị thời gian tương đối (VD: 2 phút trước)
 * @param date Ngày (Date hoặc chuỗi)
 * @returns Chuỗi thời gian tương đối
 */
export const timeAgo = (date: Date | string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

/**
 * Rút ngắn chuỗi
 * @param text Chuỗi cần rút ngắn
 * @param limit Độ dài tối đa
 * @returns Chuỗi đã rút ngắn
 */
export const truncate = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text
}

/**
 * Chuyển chuỗi thành slug
 * @param text Chuỗi đầu vào
 * @returns Chuỗi slug
 */
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/[^\w-]+/g, "")
}

/**
 * Chuyển đổi giá trị thành phần trăm
 * @param value Giá trị cần chuyển đổi
 * @param total Tổng giá trị (để tính phần trăm)
 * @param decimals Số chữ số thập phân (mặc định: 2)
 * @returns Chuỗi phần trăm
 */
export const formatPercentage = (
  value: number,
  total: number,
  decimals: number = 2
) => {
  if (total === 0) return "0%"
  const percentage = ((value / total) * 100).toFixed(decimals)
  return `${percentage}%`
}

/**
 * Chuyển đổi ISO Date thành chuỗi định dạng
 * @param isoDate Chuỗi ISO (VD: 2023-11-18T10:30:00Z)
 * @param formatStr Định dạng cần chuyển đổi (mặc định: dd/MM/yyyy HH:mm)
 * @returns Chuỗi ngày đã định dạng
 */
export const formatISODate = (
  isoDate: string,
  formatStr: string = "dd/MM/yyyy HH:mm"
) => {
  const date = parseISO(isoDate)
  return format(date, formatStr)
}

/**
 * Làm tròn một số đến số chữ số thập phân tùy ý.
 * @param num - Số cần làm tròn.
 * @param decimals - Số chữ số thập phân cần làm tròn (mặc định là 1).
 * @returns Số đã được làm tròn đến số chữ số thập phân được chỉ định.
 */
export const toFixed = (num: number, decimals: number = 1): number => {
  const factor = Math.pow(10, decimals)
  return Math.round((num + Number.EPSILON) * factor) / factor
}

/**
 * Chuyển đổi ngày sang UTC (ISO 8601)
 * @param date Ngày (Date)
 * @returns Chuỗi ngày theo định dạng UTC
 */
export const formatUTCDate = (date: Date) => {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )

  return utcDate.toISOString()
}

/**
 * Định dạng thời gian thành chuỗi thể hiện khoảng cách thời gian từ thời điểm hiện tại đến thời điểm được cung cấp.
 * @param {string} createdAt - Thời điểm tạo (dạng chuỗi ISO hoặc tương thích Date).
 * @returns {string} - Chuỗi thời gian định dạng như "5 phút", "2 giờ", hoặc ngày giờ chi tiết.
 */
export const formatTimeAgo = (createdAt: string): string => {
  const now = new Date()
  const createdDate = new Date(createdAt)

  const nowUTC7 =
    now.getTime() + (14 - now.getTimezoneOffset() / 60) * 60 * 60 * 1000
  const createdDateUTC7 =
    createdDate.getTime() +
    (7 - createdDate.getTimezoneOffset() / 60) * 60 * 60 * 1000

  const diffInMs = nowUTC7 - createdDateUTC7

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút`
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ`
  } else {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh"
    }
    return createdDate.toLocaleString("vi-VN", options)
  }
}
