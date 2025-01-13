import React from "react"

import { useRouter } from "expo-router"

import { ErrorContext } from "@/contexts/ErrorContext"

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const router = useRouter()

  const handleError = (error: any) => {
    const statusCode = error.response?.status
    const errorMessage = error.response?.data?.message

    console.log("Trạng thái lỗi:", statusCode)

    if (
      statusCode === 500 &&
      (errorMessage === "Bữa ăn không tồn tại" ||
        errorMessage ===
          "Bữa ăn không tồn tại hoặc không có món ăn nào trong bữa")
    ) {
      router.replace("/home")
      return
    }

    switch (statusCode) {
      case 400:
        console.log("[VALIDATION] Lỗi 400: Yêu cầu không hợp lệ")
        alert(
          "[VALIDATION] Yêu cầu không hợp lệ. Vui lòng kiểm tra lại dữ liệu"
        )
        break
      case 401:
        console.log("[AUTH] Lỗi 401: Chưa đăng nhập hoặc phiên đã hết hạn")
        alert("[AUTH] Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại")
        router.replace("/(auth)/sign-in")
        break
      case 403:
        console.log("[AUTH] Lỗi 403: Không có quyền truy cập")
        alert("[AUTH] Bạn không có quyền truy cập vào tài nguyên này")
        break
      case 404:
        console.log("[RESOURCE] Lỗi 404: Không tìm thấy tài nguyên")
        router.replace("/(errors)/not-found")
        break
      case 500:
        console.log("[SERVER] Lỗi 500: Lỗi máy chủ nội bộ")
        router.replace("/(errors)/internal-server-error")
        break
      case 502:
        console.log("[SERVER] Lỗi 502: Máy chủ gặp lỗi")
        alert("[SERVER] Máy chủ gặp sự cố. Vui lòng thử lại sau")
        break
      case 503:
        console.log("[SERVER] Lỗi 503: Máy chủ không sẵn sàng")
        alert("[SERVER] Dịch vụ hiện không khả dụng. Vui lòng thử lại sau")
        break
      default:
        console.log(
          "[UNKNOWN] Lỗi không xác định:",
          error.message || "Đã xảy ra lỗi"
        )
        alert("[UNKNOWN] Đã xảy ra lỗi không xác định. Vui lòng thử lại")
    }
  }

  return (
    <ErrorContext.Provider value={handleError}>
      {children}
    </ErrorContext.Provider>
  )
}
