import {
  Chart2,
  Command,
  I3Dcube,
  Lock1,
  Logout,
  NotificationStatus,
  Profile,
  Verify
} from "iconsax-react-native"

import { COLORS } from "@/constants/app"

export const generalItems = [
  {
    icon: <Profile variant="Bold" size={24} color={COLORS.accent} />,
    label: "Hồ sơ cá nhân",
    route: "/users/user-information"
  },
  {
    icon: <Command variant="Bold" size={24} color={COLORS.accent} />,
    label: "Theo dõi sức khỏe",
    route: "/users/health-tracking"
  },
  {
    icon: <Chart2 variant="Bold" size={24} color={COLORS.accent} />,
    label: "Thống kê sức khỏe",
    route: "/users/health-stats"
  },
  {
    icon: <NotificationStatus variant="Bold" size={24} color={COLORS.accent} />,
    label: "Nhắc nhở",
    route: "/users/reminders"
  },
  {
    icon: <Lock1 variant="Bold" size={24} color={COLORS.accent} />,
    label: "Cài đặt bảo mật",
    route: "/users/security-settings"
  }
]

export const aboutItems = [
  {
    icon: <I3Dcube variant="Bold" size={24} color={COLORS.accent} />,
    label: "Thông tin ứng dụng",
    route: "/about"
  },
  {
    icon: <Verify variant="Bold" size={24} color={COLORS.accent} />,
    label: "Phản hồi và đánh giá",
    route: "/feedback"
  },
  {
    icon: <Logout variant="Bold" size={24} color={COLORS.accent} />,
    label: "Đăng xuất",
    action: "logout"
  }
]
