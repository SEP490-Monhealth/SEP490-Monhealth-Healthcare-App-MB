import axios from "axios"

export const validateResponse = (
  response: any,
  message: string = "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
): void => {
  if (!response || !response.data) {
    throw {
      isCustomError: true,
      message: message
    }
  }
}

export const validateSuccess = (
  success: boolean,
  message: string = "Đã xảy ra lỗi không xác định"
): void => {
  if (!success) {
    throw {
      isCustomError: true,
      message: message
    }
  }
}

export const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.log("Lỗi từ server:", error.response?.data || error.message)
    // throw error
  } else {
    console.log("Lỗi không phải Axios:", error)
    // throw {
    //   isCustomError: true,
    //   message: "Đã xảy ra lỗi không mong muốn"
    // }
  }
}

export const handleAxiosErrorWithModal = (
  error: any,
  onError?: (message: string) => void,
  message: string = "Đã xảy ra lỗi không mong muốn"
) => {
  if (axios.isAxiosError(error)) {
    console.log("Lỗi từ server:", error.response?.data || error.message)
    onError?.(message)
    // throw error
  } else {
    console.log("Lỗi không phải Axios:", error)
    onError?.(message)
    throw {
      isCustomError: true,
      message: message
    }
  }
}
