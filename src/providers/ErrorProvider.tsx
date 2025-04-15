import React from "react"

import { useRouter } from "expo-router"

import { ErrorContext } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const router = useRouter()
  const { showModal } = useModal()

  const handleError = (error: any) => {
    const statusCode = error.response?.status
    const errorMessage =
      error.response?.data?.message || "Đã xảy ra lỗi không xác định"

    console.log("Trạng thái lỗi:", statusCode)

    // if (
    //   statusCode === 500 &&
    //   (errorMessage === "Bữa ăn không tồn tại" ||
    //     errorMessage ===
    //       "Bữa ăn không tồn tại hoặc không có món ăn nào trong bữa")
    // ) {
    //   router.replace("/(tabs)/user/home")
    //   return
    // }

    switch (statusCode) {
      case 400:
        console.log("[VALIDATION] Lỗi 400: Yêu cầu không hợp lệ")
        showModal(
          errorMessage || "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại dữ liệu",
          "Lỗi xác thực"
        )
        break
      case 401:
        console.log("[AUTH] Lỗi 401: Chưa đăng nhập hoặc phiên đã hết hạn")
        showModal(
          errorMessage || "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại",
          "Lỗi xác thực"
        )
        router.replace("/auth/sign-in")
        break
      case 403:
        console.log("[AUTH] Lỗi 403: Không có quyền truy cập")
        showModal(
          errorMessage || "Bạn không có quyền truy cập vào tài nguyên này",
          "Lỗi quyền truy cập"
        )
        break
      case 404:
        console.log("[RESOURCE] Lỗi 404: Không tìm thấy tài nguyên")
        showModal(errorMessage || "Không tìm thấy tài nguyên", "Lỗi tài nguyên")
        router.replace("/errors/not-found")
        break
      case 500:
        console.log("[SERVER] Lỗi 500: Lỗi máy chủ nội bộ")
        showModal(
          errorMessage || "Lỗi máy chủ nội bộ. Vui lòng thử lại sau",
          "Lỗi máy chủ"
        )
        router.replace("/errors/internal-server-error")
        break
      default:
        console.log(
          "[UNKNOWN] Lỗi không xác định:",
          error.message || "Đã xảy ra lỗi"
        )
        router.replace("/errors/internal-server-error")
    }
  }

  return (
    <ErrorContext.Provider value={handleError}>
      {children}
    </ErrorContext.Provider>
  )
}
