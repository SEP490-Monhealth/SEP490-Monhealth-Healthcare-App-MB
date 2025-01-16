import {
  Activity,
  Award,
  Command,
  I3Dcube,
  Lock1,
  Logout,
  NotificationStatus,
  Profile
} from "iconsax-react-native"

import { COLORS } from "@/constants/app"

export const generalItems = [
  {
    icon: <Profile variant="Bold" size={24} color={COLORS.accent} />,
    label: "Thông tin cá nhân",
    route: "/settings/user-information"
  },
  {
    icon: <Command variant="Bold" size={24} color={COLORS.accent} />,
    label: "Theo dõi sức khỏe",
    route: "/settings/health-tracking"
  },
  {
    icon: <Activity variant="Bold" size={24} color={COLORS.accent} />,
    label: "Hoạt động thể chất",
    route: "/settings/activity-tracking"
  },
  {
    icon: <NotificationStatus variant="Bold" size={24} color={COLORS.accent} />,
    label: "Nhắc nhở và thông báo",
    route: "/settings/reminders"
  },
  {
    icon: <Lock1 variant="Bold" size={24} color={COLORS.accent} />,
    label: "Bảo mật và quyền riêng tư",
    route: "/settings/privacy-settings"
  }
]

export const aboutItems = [
  {
    icon: <I3Dcube variant="Bold" size={24} color={COLORS.accent} />,
    label: "Thông tin ứng dụng",
    route: "/settings/app-about"
  },
  {
    icon: <Award variant="Bold" size={24} color={COLORS.accent} />,
    label: "Gói đăng ký",
    route: "/settings/subscriptions"
  },
  {
    icon: <Logout variant="Bold" size={24} color={COLORS.accent} />,
    label: "Đăng xuất",
    action: "logout"
  }
]
