import monAPI from "@/lib/monAPI"

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiredAt: string
}

export const login = async (
  phoneNumber: string,
  password: string,
  showModal: (message: string) => void
): Promise<LoginResponse> => {
  try {
    const response = await monAPI.post(`/auth/login`, { phoneNumber, password })

    const { success, message, data } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiredAt: data.expiredAt
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}

export const register = async (
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  showModal: (message: string) => void
): Promise<void> => {
  try {
    const response = await monAPI.post(`/auth/register`, {
      fullName,
      email,
      phoneNumber,
      password
    })

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}

export const logout = async (
  showModal: (message: string) => void
): Promise<void> => {
  try {
    const response = await monAPI.post(`/auth/logout`)

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}

export const whoIAm = async (showModal?: (message: string) => void) => {
  try {
    const response = await monAPI.get(`/auth/me`)

    const { success, message, data } = response.data

    if (!success) {
      if (showModal) showModal(message)
      throw { isCustomError: true, message: message }
    }

    return data
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    if (showModal) showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
