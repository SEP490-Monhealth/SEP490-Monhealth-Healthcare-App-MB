import { Router } from "expo-router"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { whoIAm } from "@/services/authService"
import { getConsultantByUserId } from "@/services/consultantService"
import { getMetricsByUserId } from "@/services/metricService"

import { delay } from "@/utils/helpers"

interface UserPayload {
  userId: string
  consultantId?: string
  fullName: string
  phoneNumber: string
  email: string
  role: string
  subscription: string
}

interface ModalContent {
  title: string
  description: string
  confirmText: string
}

interface RoutingDependencies {
  router: Router
  setIsModalVisible: (isVisible: boolean) => void
  setModalContent: (content: ModalContent) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: UserPayload | null) => void
  setRole: (role: string | null) => void
  showModal: any
}

export const handleAdminRejection = async ({
  router,
  setIsModalVisible,
  setModalContent,
  setIsAuthenticated,
  setUser,
  setRole
}: RoutingDependencies) => {
  setModalContent({
    title: "Thông báo",
    description: "Tài khoản Admin không thể đăng nhập qua ứng dụng di động.",
    confirmText: "Đồng ý"
  })
  setIsModalVisible(true)

  await AsyncStorage.removeItem("accessToken")
  await AsyncStorage.removeItem("refreshToken")
  setIsAuthenticated(false)
  setUser(null)
  setRole("Member")
  router.replace("/auth/sign-in")
}

export const handleConsultantRouting = async (
  userInfo: UserPayload,
  { router }: RoutingDependencies
) => {
  if (userInfo.role === "Consultant") {
    const consultantData = await getConsultantByUserId(userInfo.userId)

    if (consultantData) {
      router.replace("/(tabs)/consultant/dashboard")
    } else {
      router.replace({
        pathname: "/onboarding",
        params: { role: "Consultant" }
      })
    }
    return
  }

  const consultantData = await getConsultantByUserId(userInfo.userId)

  if (consultantData) {
    router.replace("/(tabs)/consultant/dashboard")
  } else {
    router.replace({
      pathname: "/onboarding",
      params: { role: "Consultant" }
    })
  }
}

export const handleMemberRouting = async (
  userInfo: UserPayload,
  dependencies: RoutingDependencies
) => {
  const {
    router,
    setIsModalVisible,
    setModalContent,
    setIsAuthenticated,
    setUser,
    setRole
  } = dependencies

  if (userInfo.role === "Consultant") {
    setModalContent({
      title: "Thông báo",
      description:
        "Tài khoản này là chuyên viên tư vấn. Vui lòng đăng nhập với tư cách chuyên viên.",
      confirmText: "Đồng ý"
    })
    setIsModalVisible(true)

    await AsyncStorage.removeItem("accessToken")
    await AsyncStorage.removeItem("refreshToken")
    setIsAuthenticated(false)
    setUser(null)
    setRole("Consultant")
    router.replace("/auth/sign-in")
    return
  }

  const metricData = await getMetricsByUserId(userInfo.userId)
  if (metricData && metricData.length > 0) {
    router.replace("/(tabs)/user/home")
  } else {
    router.replace("/onboarding/welcome")
  }
}

export const routeUserByRole = async (
  userInfo: UserPayload,
  selectedRole: string | null,
  dependencies: RoutingDependencies
) => {
  const actualRole = userInfo.role
  const roleToUse = selectedRole || "Member"

  if (actualRole === "Admin") {
    await handleAdminRejection(dependencies)
    return
  }

  if (roleToUse === "Consultant") {
    await handleConsultantRouting(userInfo, dependencies)
    return
  }

  await handleMemberRouting(userInfo, dependencies)
}

export const checkAuthentication = async (
  dependencies: RoutingDependencies,
  handleError: (error: any) => void
) => {
  const { router, setIsAuthenticated, setUser, setRole } = dependencies

  try {
    const token = await AsyncStorage.getItem("accessToken")
    setIsAuthenticated(!!token)

    if (!token) {
      await delay(2000)
      router.replace("/onboarding/welcome")
      return
    }

    const userInfo = await whoIAm()

    if (!userInfo) {
      setIsAuthenticated(false)
      setUser(null)
      router.replace("/onboarding/welcome")
      return
    }

    setUser(userInfo)
    setRole(userInfo.role)

    await delay(2000)
    await routeUserByRole(userInfo, userInfo.role, dependencies)
  } catch (error: any) {
    handleError(error)
    setIsAuthenticated(false)
    setUser(null)
    router.replace("/onboarding/welcome")
  }
}
