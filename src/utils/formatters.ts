import { format, parseISO } from "date-fns"

/**
 * Chuyển đổi số sang định dạng tiền tệ Việt Nam (VND).
 * @param value - Giá trị số cần định dạng.
 * @returns Chuỗi định dạng tiền tệ, ví dụ: "10.000 VND".
 */
export const formatCurrency = (value: number): string => {
  return value
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "VND")
}

/**
 * Chuyển đổi giá trị thành phần trăm.
 * @param value Giá trị cần chuyển đổi.
 * @param total Tổng giá trị (để tính phần trăm).
 * @param decimals Số chữ số thập phân (mặc định: 2).
 * @returns Chuỗi phần trăm.
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
 * Định dạng ngày/thời gian.
 * @param date Ngày (Date hoặc chuỗi).
 * @param formatStr Chuỗi định dạng (mặc định: dd/MM/yyyy).
 * @returns Chuỗi ngày đã định dạng.
 */
export const formatDate = (
  date: Date | string,
  formatStr: string = "dd/MM/yyyy"
): string => {
  return format(new Date(date), formatStr)
}

/**
 * Chuyển đổi ISO Date thành chuỗi định dạng.
 * @param isoDate Chuỗi ISO (VD: 2023-11-18T10:30:00Z).
 * @param formatStr Định dạng cần chuyển đổi (mặc định: dd/MM/yyyy HH:mm).
 * @returns Chuỗi ngày đã định dạng.
 */
export const formatISODate = (
  isoDate: string,
  formatStr: string = "dd/MM/yyyy HH:mm"
) => {
  const date = parseISO(isoDate)
  return format(date, formatStr)
}

/**
 * Chuyển đổi ngày sang UTC (ISO 8601).
 * @param date Ngày (Date).
 * @returns Chuỗi ngày theo định dạng UTC.
 */
export const formatUTCDate = (date: Date) => {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )

  return utcDate.toISOString()
}

/**
 * Chuyển đổi thời gian thành chuỗi biểu diễn thời gian trước đó (1 phút, 2 giờ, 1 ngày,...) dựa trên UTC.
 * @param {string | Date} date - Thời gian cần định dạng (chuỗi hoặc đối tượng Date).
 * @returns {string} - Chuỗi mô tả thời gian trước đó.
 */
export const formatTimeAgo = (date: string | Date): string => {
  const nowUTC = new Date().getTime() + 7 * 60 * 60 * 1000

  const inputDateUTC = new Date(date).getTime()

  const diffInMs = nowUTC - inputDateUTC

  const seconds = Math.floor(diffInMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return `${seconds} giây trước`
  if (minutes < 60) return `${minutes} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 7) return `${days} ngày trước`
  if (weeks < 4) return `${weeks} tuần trước`
  if (months < 12) return `${months} tháng trước`
  return `${years} năm trước`
}

export const formatDateY = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

/**
 * Chuyển đổi chuỗi ngày từ dd/MM/yyyy sang ISO string
 * @param dateString Chuỗi ngày định dạng dd/MM/yyyy
 * @returns Chuỗi ngày định dạng ISO string
 */
export const convertToISOString = (dateString: string): string => {
  return new Date(dateString.split("/").reverse().join("-")).toISOString()
}

/**
 * Chuyển đổi một khoảng thời gian tính bằng giây sang chuỗi định dạng MM:SS.
 * @param {number} seconds - Thời gian tính bằng giây.
 * @returns {string} - Chuỗi thời gian đã được định dạng theo kiểu MM:SS.
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
}
