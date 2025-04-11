import { EnumMeta } from "@/configs/enum"
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
    label: "Giảm cân"
  },
  [GoalTypeEnum.Maintenance]: {
    label: "Duy trì cân nặng"
  },
  [GoalTypeEnum.WeightGain]: {
    label: "Tăng cân"
  }
  // [GoalTypeEnum.MuscleGain]: {
  //   label: "Tăng cơ"
  // }
}

const goalStatusMap: Record<GoalStatusEnum, EnumMeta> = {
  [GoalStatusEnum.Abandoned]: {
    label: "Đã từ bỏ"
  },
  [GoalStatusEnum.Active]: {
    label: "Đang thực hiện"
  },
  [GoalStatusEnum.Completed]: {
    label: "Đã hoàn thành"
  }
}

export function getGoalTypeMeta(type: GoalTypeEnum): EnumMeta {
  return goalTypeMap[type]
}

export function getGoalStatusMeta(status: GoalStatusEnum): EnumMeta {
  return goalStatusMap[status]
}
