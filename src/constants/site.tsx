import {
  AlignVertically,
  Calendar,
  Call,
  Lovely,
  ProfileCircle,
  Sms,
  Weight
} from "iconsax-react-native"
./app
import { COLORS } from "./appConstants"

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
