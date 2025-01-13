import {
  Activity,
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
    route: "/users/user-information"
  },
  {
    icon: <Command variant="Bold" size={24} color={COLORS.accent} />,
    label: "Theo dõi sức khỏe",
    route: "/users/health-tracking"
  },
  {
    icon: <Activity variant="Bold" size={24} color={COLORS.accent} />,
    label: "Hoạt động thể chất",
    route: "/users/activity-tracking"
  },
  {
    icon: <NotificationStatus variant="Bold" size={24} color={COLORS.accent} />,
    label: "Nhắc nhở và thông báo",
    route: "/users/reminders"
  },
  {
    icon: <Lock1 variant="Bold" size={24} color={COLORS.accent} />,
    label: "Bảo mật và quyền riêng tư",
    route: "/users/privacy-settings"
  }
]

export const aboutItems = [
  {
    icon: <I3Dcube variant="Bold" size={24} color={COLORS.accent} />,
    label: "Thông tin ứng dụng",
    route: "/app-about"
  },
  {
    icon: <Logout variant="Bold" size={24} color={COLORS.accent} />,
    label: "Đăng xuất",
    action: "logout"
  }
]
