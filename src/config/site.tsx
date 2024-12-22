import { useRouter } from "expo-router"

import {
  AlignVertically,
  Calendar,
  Call,
  Chart2,
  Command,
  I3Dcube,
  Lock1,
  Lovely,
  NotificationStatus,
  Profile,
  ProfileCircle,
  Sms,
  Verify,
  Weight
} from "iconsax-react-native"

import { COLORS } from "@/constants/app"

const router = useRouter()

export const generalItems = [
  {
    icon: <Profile variant="Bold" size={24} color={COLORS.secondary} />,
    label: "Hồ sơ cá nhân",
    onPress: () => {
      router.push("/users/user-information")
    }
  },
  {
    icon: <Command variant="Bold" size={24} color={COLORS.secondary} />,
    label: "Theo dõi sức khỏe",
    onPress: () => {
      router.push("/users/health-tracking")
    }
  },
  {
    icon: <Chart2 variant="Bold" size={24} color={COLORS.secondary} />,
    label: "Thống kê sức khỏe",
    onPress: () => {
      router.push("/users/health-stats")
    }
  },
  {
    icon: (
      <NotificationStatus variant="Bold" size={24} color={COLORS.secondary} />
    ),
    label: "Nhắc nhở",
    onPress: () => {
      router.push("/users/reminders")
    }
  },
  {
    icon: <Lock1 variant="Bold" size={24} color={COLORS.secondary} />,
    label: "Cài đặt bảo mật",
    onPress: () => {
      router.push("/users/security-settings")
    }
  }
]

export const aboutItems = [
  {
    icon: <I3Dcube variant="Bold" size={24} color={COLORS.secondary} />,
    label: "Thông tin ứng dụng",
    onPress: () => {
      router.push("/about")
    }
  },
  {
    icon: <Verify variant="Bold" size={24} color={COLORS.secondary} />,
    label: "Phản hồi và đánh giá",
    onPress: () => {
      router.push("/feedback")
    }
  }
]

export const informationItems = [
  {
    icon: <ProfileCircle variant="Bold" size={24} color={COLORS.primary} />,
    label: "Van Huu Toan"
  },
  {
    icon: <Calendar variant="Bold" size={24} color={COLORS.primary} />,
    label: "27/08/2003"
  },
  {
    icon: <Lovely variant="Bold" size={24} color={COLORS.primary} />,
    label: "Nam"
  },
  {
    icon: <Weight variant="Bold" size={24} color={COLORS.primary} />,
    label: "50kg"
  },
  {
    icon: <AlignVertically variant="Bold" size={24} color={COLORS.primary} />,
    label: "200cm"
  }
]

export const accountItems = [
  {
    icon: <Sms variant="Bold" size={24} color={COLORS.primary} />,
    label: "vanhuutoan27@gmail.com"
  },
  {
    icon: <Call variant="Bold" size={24} color={COLORS.primary} />,
    label: "0987654321"
  }
]
