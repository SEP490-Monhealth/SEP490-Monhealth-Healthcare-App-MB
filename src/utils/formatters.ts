import { format, parseISO } from "date-fns"

/**
 * Chuyển đổi số sang định dạng tiền tệ Việt Nam (VND).
 * @param value - Giá trị số cần định dạng.
 * @returns Chuỗi định dạng tiền tệ, ví dụ: "10.000 ₫".
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND"
  })
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
): string => {
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
 *
 * Ví dụ: formatDate("2023-11-18T10:30:00Z") => "18/11/2023"
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
 *
 * Ví dụ: formatISODate("2023-11-18T10:30:00Z") => "18/11/2023 10:30"
 */
export const formatISODate = (
  isoDate: string,
  formatStr: string = "dd/MM/yyyy HH:mm"
): string => {
  const date = parseISO(isoDate)
  return format(date, formatStr)
}

/**
 * Chuyển đổi ngày sang UTC (ISO 8601).
 * @param date Ngày (Date).
 * @returns Chuỗi ngày theo định dạng UTC.
 *
 * Ví dụ: formatUTCDate(new Date(2023, 10, 18)) => "2023-11-18T00:00:00.000Z"
 */
export const formatUTCDate = (date: Date): string => {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  return utcDate.toISOString()
}

/**
 * Chuyển đổi thời gian thành chuỗi biểu diễn thời gian trước đó (1 phút, 2 giờ, 1 ngày, ...)
 * dựa trên UTC.
 * @param date Thời gian cần định dạng (chuỗi hoặc đối tượng Date).
 * @returns Chuỗi mô tả thời gian đã trôi qua, ví dụ: "2 giờ trước".
 */
export const formatTimeAgo = (date: string | Date): string => {
  // Lấy thời gian hiện tại theo múi giờ UTC+7
  const nowUTC = new Date().getTime() + 7 * 60 * 60 * 1000
  // Lấy thời gian của đối tượng ngày theo UTC
  const inputDateUTC = new Date(date).getTime()
  // Tính hiệu số thời gian (ms)
  const diffInMs = nowUTC - inputDateUTC

  // Chuyển đổi hiệu số ms thành các đơn vị thời gian
  const seconds = Math.floor(diffInMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  // Trả về chuỗi mô tả thời gian đã trôi qua
  if (seconds < 60) return `${seconds} giây trước`
  if (minutes < 60) return `${minutes} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 7) return `${days} ngày trước`
  if (weeks < 4) return `${weeks} tuần trước`
  if (months < 12) return `${months} tháng trước`
  return `${years} năm trước`
}

/**
 * Định dạng ngày theo định dạng 'YYYY-MM-DD'.
 * @param date Ngày (Date).
 * @returns Chuỗi ngày đã định dạng, ví dụ: "2023-11-18".
 */
export const formatDateY = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * Chuyển đổi một khoảng thời gian tính bằng giây sang chuỗi định dạng MM:SS.
 * @param seconds Thời gian tính bằng giây.
 * @returns Chuỗi thời gian đã được định dạng theo kiểu MM:SS, ví dụ: "05:30".
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`
}

/**
 * Định dạng ngày giờ theo định dạng "dd/mm/yyyy HH:mm:ss".
 * @param dateTime Ngày giờ cần định dạng (có thể là đối tượng Date hoặc chuỗi ngày).
 * @returns Chuỗi ngày giờ đã được định dạng.
 *
 * Ví dụ:
 * formatDateTime("2024-03-15T14:30:00") => "14:30:00, 15/03/2024"
 * formatDateTime(new Date(2024, 2, 15, 14, 30, 0)) => "14:30:00, 15/03/2024"
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString) // Create a Date object from the string

  // Extract UTC values
  const hours = date.getUTCHours().toString().padStart(2, "0")
  const minutes = date.getUTCMinutes().toString().padStart(2, "0")
  const day = date.getUTCDate().toString().padStart(2, "0")
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0") // Months are zero-based
  const year = date.getUTCFullYear()

  // Format the date and time in UTC
  return `${hours}:${minutes}, ${day}/${month}/${year}`
}

/**
 * Chuyển đổi chuỗi ISO thành chuỗi thời gian định dạng HH:mm.
 * @param isoString Chuỗi ISO, ví dụ: "2023-11-18T10:30:00Z".
 * @returns Chuỗi thời gian đã định dạng theo kiểu HH:mm, ví dụ: "17h30" (tùy vào múi giờ).
 */
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString)
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}h${minutes}`
}
