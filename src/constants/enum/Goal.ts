import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum GoalTypeEnum {
  WeightLoss,
  Maintenance,
  WeightGain,
  MuscleGain
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
  },
  [GoalTypeEnum.MuscleGain]: {
    label: "Tăng cơ"
  }
}

export function getGoalTypeMeta(type: GoalTypeEnum): EnumMeta {
  return goalTypeMap[type]
}
