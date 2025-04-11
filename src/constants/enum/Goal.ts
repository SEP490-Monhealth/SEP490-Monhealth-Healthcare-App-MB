import { EnumMeta } from "@/configs/enum"
import {
  ClipboardExport,
  ClipboardImport,
  ClipboardTick,
  Convert,
  Danger,
  FlashCircle
} from "iconsax-react-native"
import { z } from "zod"

export enum GoalTypeEnum {
  WeightLoss,
  Maintenance,
  WeightGain
  // MuscleGain
}

export enum GoalStatusEnum {
  Abandoned,
  Active,
  Completed
}

export const GoalTypeSchemaEnum = z.nativeEnum(GoalTypeEnum)
export const GoalStatusSchemaEnum = z.nativeEnum(GoalStatusEnum)

const goalTypeMap: Record<GoalTypeEnum, EnumMeta> = {
  [GoalTypeEnum.WeightLoss]: {
    label: "Giảm cân",
    icon: ClipboardImport
  },
  [GoalTypeEnum.Maintenance]: {
    label: "Duy trì cân nặng",
    icon: ClipboardTick
  },
  [GoalTypeEnum.WeightGain]: {
    label: "Tăng cân",
    icon: ClipboardExport
  }
  // [GoalTypeEnum.MuscleGain]: {
  //   label: "Tăng cơ"
  // }
}

const goalStatusMap: Record<GoalStatusEnum, EnumMeta> = {
  [GoalStatusEnum.Abandoned]: {
    label: "Đã từ bỏ",
    icon: Danger
  },
  [GoalStatusEnum.Active]: {
    label: "Đang thực hiện",
    icon: FlashCircle
  },
  [GoalStatusEnum.Completed]: {
    label: "Đã hoàn thành",
    icon: Convert
  }
}

export function getGoalTypeMeta(type: GoalTypeEnum): EnumMeta {
  return goalTypeMap[type]
}

export function getGoalStatusMeta(status: GoalStatusEnum): EnumMeta {
  return goalStatusMap[status]
}
