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