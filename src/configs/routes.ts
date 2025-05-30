import {
  Award,
  Calendar2,
  Car,
  ClipboardTick,
  Command,
  DirectNormal,
  FavoriteChart,
  Home2,
  I3Dcube,
  Lock1,
  Logout,
  Message,
  Profile,
  Ram,
  Setting,
  Stickynote,
  VideoRemove,
  Wallet2
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
    label: "Hồ sơ cá nhân",
    icon: Profile
  },
  {
    route: (userId: string) => `/settings/user/${userId}/metrics`,
    label: "Chỉ số sức khỏe",
    icon: Command
  },
  {
    route: (userId: string) => `/settings/user/${userId}/transactions`,
    label: "Lịch sử thanh toán",
    icon: Wallet2
  },
  {
    route: (userId: string) => `/settings/user/${userId}/bookings`,
    label: "Lịch hẹn của tôi",
    icon: Stickynote
  },
  // {
  //   route: "/settings/reminder",
  //   label: "Nhắc nhở & thông báo",
  //   icon: NotificationStatus
  // },
  {
    route: "/settings/privacy",
    label: "Bảo mật & quyền riêng tư",
    icon: Lock1
  }
]

export const userAboutRoutes: RouteType[] = [
  // {
  //   route: "/settings/freedriver",
  //   label: "FreeDriver",
  //   icon: Car
  // },
  {
    route: "/settings/app",
    label: "Giới thiệu ứng dụng",
    icon: I3Dcube
  },
  {
    route: (userId: string) => `/settings/user/${userId}/subscriptions`,
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
    label: "Hồ sơ cá nhân",
    icon: Profile
  },
  // {
  //   route: (consultantId: string) =>
  //     `/settings/consultant/${consultantId}/about`,
  //   label: "Mô tả bản thân",
  //   icon: Personalcard
  // },
  {
    route: (consultantId: string) =>
      `/settings/consultant/${consultantId}/expertise`,
    label: "Chuyên môn & chứng chỉ",
    icon: ClipboardTick
  },
  {
    route: (consultantId: string) =>
      `/settings/consultant/${consultantId}/exceptions`,
    label: "Lịch nghỉ của tôi",
    icon: VideoRemove
  },
  // {
  //   route: "/settings/reminder",
  //   label: "Nhắc nhở & thông báo",
  //   icon: NotificationStatus
  // },
  {
    route: "/settings/privacy",
    label: "Bảo mật & quyền riêng tư",
    icon: Lock1
  }
]

export const consultantAboutRoutes: RouteType[] = [
  {
    route: "/settings/app",
    label: "Giới thiệu ứng dụng",
    icon: I3Dcube
  },
  {
    route: "/settings/policy",
    label: "Chính sách & điều khoản",
    icon: I3Dcube
  },
  {
    label: "Đăng xuất",
    icon: Logout,
    action: "logout"
  }
]
