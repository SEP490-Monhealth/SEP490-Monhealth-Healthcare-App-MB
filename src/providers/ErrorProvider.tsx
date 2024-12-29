import React from "react"

import { useRouter } from "expo-router"

import { ErrorContext } from "@/contexts/ErrorContext"

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const router = useRouter()

  const handleError = (error: any) => {
    const statusCode = error.response?.status
    console.log("Trạng thái lỗi:", statusCode)

    switch (statusCode) {
      case 400:
        console.log("Lỗi 400: Yêu cầu không hợp lệ.")
        alert("Yêu cầu không hợp lệ. Vui lòng kiểm tra lại dữ liệu.")
        break
      case 401:
        console.log("Lỗi 401: Chưa đăng nhập hoặc phiên đã hết hạn.")
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.")
        router.replace("/(auth)/sign-in")
        break
      case 403:
        console.log("Lỗi 403: Không có quyền truy cập.")
        alert("Bạn không có quyền truy cập vào tài nguyên này.")
        break
      case 404:
        console.log("Lỗi 404: Không tìm thấy tài nguyên.")
        router.replace("/(errors)/not-found")
        break
      case 500:
        console.log("Lỗi 500: Lỗi máy chủ nội bộ.")
        router.replace("/(errors)/internal-server-error")
        break
      case 502:
        console.log("Lỗi 502: Máy chủ gặp lỗi.")
        alert("Máy chủ gặp sự cố. Vui lòng thử lại sau.")
        break
      case 503:
        console.log("Lỗi 503: Máy chủ không sẵn sàng.")
        alert("Dịch vụ hiện không khả dụng. Vui lòng thử lại sau.")
        break
      default:
        console.log("Lỗi không xác định:", error.message || "Đã xảy ra lỗi.")
        alert("Đã xảy ra lỗi không xác định. Vui lòng thử lại.")
    }
  }

  return (
    <ErrorContext.Provider value={handleError}>
      {children}
    </ErrorContext.Provider>
  )
}
