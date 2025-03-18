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
  NotificationStatus,
  Profile,
  Ram,
  Setting,
  Sound
} from "iconsax-react-native"
import { IconProps } from "iconsax-react-native"

interface RouteType {
  route?: string
  name?: string
  label: string
  icon: React.ComponentType<IconProps>
  main?: boolean
  action?: string
}

export const userRoutes: RouteType[] = [
  { name: "home", label: "Trang chủ", icon: Home2 },
  { name: "report", label: "Báo cáo", icon: FavoriteChart },
  { name: "voice", label: "", icon: Sound, main: true },
  { name: "consultant", label: "Chuyên viên", icon: DirectNormal },
  { name: "settings", label: "Cài đặt", icon: Setting }
]

export const consultantRoutes: RouteType[] = [
  { name: "dashboard", label: "Trang chủ", icon: Home2 },
  { name: "booking", label: "Lịch hẹn", icon: Ram },
  { name: "voice", label: "", icon: Sound, main: true },
  { name: "schedule", label: "Lịch trình", icon: Calendar2 },
  { name: "settings", label: "Cài đặt", icon: Setting }
]

export const userProfileRoutes: RouteType[] = [
  {
    route: "/settings/user-information",
    label: "Thông tin cá nhân",
    icon: Profile
  },
  {
    route: "/settings/health-tracking",
    label: "Chỉ số sức khỏe",
    icon: Command
  },
  {
    route: "/settings/activity-tracking",
    label: "Hoạt động thể chất",
    icon: Activity
  },
  {
    route: "/settings/reminder",
    label: "Nhắc nhở và thông báo",
    icon: NotificationStatus
  },
  {
    route: "/settings/privacy",
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
    route: "/settings/subscriptions",
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
    route: "/settings/user-information",
    label: "Thông tin cá nhân",
    icon: Profile
  },
  {
    route: "/settings/reminder",
    label: "Nhắc nhở và thông báo",
    icon: NotificationStatus
  },
  {
    route: "/settings/privacy",
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
