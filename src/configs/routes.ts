import {
  Activity,
  Award,
  Calendar2,
  Command,
  DirectNormal,
  FavoriteChart,
  Home2,
  I3Dcube,
  Lock1,
  Logout,
  Message,
  NotificationStatus,
  Profile,
  Ram,
  Setting
} from "iconsax-react-native"
import { IconProps } from "iconsax-react-native"

interface RouteType {
  route?: string | ((id: string) => string)
  name?: string
  label: string
  icon: React.ComponentType<IconProps>
  main?: boolean
  action?: string
}

export const userRoutes: RouteType[] = [
  { name: "home", label: "Trang chủ", icon: Home2 },
  { name: "report", label: "Báo cáo", icon: FavoriteChart },
  { name: "chat", label: "", icon: Message, main: true },
  { name: "consultant", label: "Chuyên viên", icon: DirectNormal },
  { name: "settings", label: "Cài đặt", icon: Setting }
]

export const consultantRoutes: RouteType[] = [
  { name: "dashboard", label: "Trang chủ", icon: Home2 },
  { name: "schedule", label: "Lịch trình", icon: Calendar2 },
  { name: "chat", label: "", icon: Message, main: true },
  { name: "booking", label: "Lịch hẹn", icon: Ram },
  { name: "settings", label: "Cài đặt", icon: Setting }
]

export const userProfileRoutes: RouteType[] = [
  {
    route: (userId: string) => `/settings/user/${userId}/information`,
    label: "Thông tin cá nhân",
    icon: Profile
  },
  {
    route: (userId: string) => `/settings/user/${userId}/health`,
    label: "Chỉ số sức khỏe",
    icon: Command
  },
  {
    route: (userId: string) => `/settings/user/${userId}/activity`,
    label: "Hoạt động thể chất",
    icon: Activity
  },
  {
    route: "/settings/reminder",
    label: "Nhắc nhở và thông báo",
    icon: NotificationStatus
  },
  {
    route: (userId: string) => `/settings/user/${userId}/privacy`,
    label: "Bảo mật và quyền riêng tư",
    icon: Lock1
  }
]

export const userAboutRoutes: RouteType[] = [
  {
    route: "/settings/app-about",
    label: "Thông tin ứng dụng",
    icon: I3Dcube
  },
  {
    route: "/settings/user/subscriptions",
    label: "Gói đăng ký",
    icon: Award
  },
  {
    label: "Đăng xuất",
    icon: Logout,
    action: "logout"
  }
]

export const consultantProfileRoutes: RouteType[] = [
  {
    route: (consultantId: string) =>
      `/settings/consultant/${consultantId}/information`,
    label: "Thông tin cá nhân",
    icon: Profile
  },
  {
    route: "/settings/reminder",
    label: "Nhắc nhở và thông báo",
    icon: NotificationStatus
  },
  {
    route: (consultantId: string) =>
      `/settings/consultant/${consultantId}/privacy`,
    label: "Bảo mật và quyền riêng tư",
    icon: Lock1
  }
]

export const consultantAboutRoutes: RouteType[] = [
  {
    route: "/settings/app-about",
    label: "Thông tin ứng dụng",
    icon: I3Dcube
  },
  {
    label: "Đăng xuất",
    icon: Logout,
    action: "logout"
  }
]
