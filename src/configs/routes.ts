import {
  Calendar2,
  DirectNormal,
  FavoriteChart,
  Home2,
  Ram,
  Setting,
  Sound
} from "iconsax-react-native"
import { IconProps } from "iconsax-react-native"

interface RouteType {
  name: string
  label: string
  icon: React.ComponentType<IconProps>
  main?: boolean
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
  { name: "schedule", label: "Lịch trình", icon: Calendar2 },
  { name: "voice", label: "", icon: Sound, main: true },
  { name: "service", label: "Dịch vụ", icon: Ram },
  { name: "settings", label: "Cài đặt", icon: Setting }
]
