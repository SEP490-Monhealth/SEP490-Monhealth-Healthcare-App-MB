import { EnumMeta } from "@/configs/enum"
import {
  ClipboardExport,
  ClipboardImport,
  ClipboardTick
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
    color: "#EF4444"
  },
  [GoalStatusEnum.Active]: {
    label: "Đang thực hiện",
    color: "#3B82F6"
  },
  [GoalStatusEnum.Completed]: {
    label: "Đã hoàn thành",
    color: "#10B981"
  }
}

export function getGoalTypeMeta(type: GoalTypeEnum): EnumMeta {
  return goalTypeMap[type]
}

export function getGoalStatusMeta(status: GoalStatusEnum): EnumMeta {
  return goalStatusMap[status]
}
