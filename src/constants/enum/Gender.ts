import { EnumMeta } from "@/configs/enum"
import { Man, Woman } from "iconsax-react-native"
import { z } from "zod"

export enum GenderEnum {
  Male,
  Female
}

export const GenderSchemaEnum = z.nativeEnum(GenderEnum)

export const genderMap: Record<GenderEnum, EnumMeta> = {
  [GenderEnum.Male]: {
    label: "Nam",
    icon: Man
  },
  [GenderEnum.Female]: {
    label: "Nữ",
    icon: Woman
  }
}

export function getGenderMeta(status: GenderEnum): EnumMeta {
  return genderMap[status]
}
