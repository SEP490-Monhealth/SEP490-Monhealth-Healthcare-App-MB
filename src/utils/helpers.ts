/**
 * Capitalize: Chuyển ký tự đầu tiên thành in hoa
 * @param str Chuỗi cần chuyển đổi
 * @returns Chuỗi đã capitalize
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Kiểm tra giá trị có phải null hoặc undefined
 * @param value Giá trị cần kiểm tra
 * @returns true nếu là null hoặc undefined
 */
export const isNil = (value: any) => value === null || value === undefined
