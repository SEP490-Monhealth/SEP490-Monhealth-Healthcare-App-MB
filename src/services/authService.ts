import monAPI from "@/lib/monAPI"

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiredAt: string
}

export const login = async (
  phoneNumber: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await monAPI.post(`/auth/login`, { phoneNumber, password })

    if (!response || !response.data) {
      throw new Error("No response from the server")
    }

    const { success, message, data } = response.data

    if (success) {
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiredAt: data.expiredAt
      }
    } else {
      throw new Error(message || "Failed to login")
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred"
    console.error("Error logging in:", errorMessage)
    throw new Error(errorMessage)
  }
}

export const register = async (
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string
): Promise<void> => {
  try {
    const response = await monAPI.post(`/auth/register`, {
      fullName,
      email,
      phoneNumber,
      password
    })

    if (!response || !response.data.success) {
      throw new Error(response.data.message || "Registration failed")
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred"
    console.error("Error registering user:", errorMessage)
    throw new Error(errorMessage)
  }
}
