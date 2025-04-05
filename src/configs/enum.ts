import { IconProps } from "iconsax-react-native"

export type EnumMeta = {
  label: string
  engLabel?: string
  viLabel?: string
  description?: string
  color?: string
  icon?: React.FC<IconProps> | string
  ratio?: number
}
