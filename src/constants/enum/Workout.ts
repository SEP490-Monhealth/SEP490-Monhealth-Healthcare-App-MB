import { z } from "zod"

export enum WorkoutTypeEnum {
  Warmup,
  Workout
}

export enum DifficultyLevelEnum {
  Easy,
  Medium,
  Hard
}

export enum ExerciseTypeEnum {
  Time,
  Reps
}

export const WorkoutTypeSchemaEnum = z.nativeEnum(WorkoutTypeEnum)
export const DifficultyLevelSchemaEnum = z.nativeEnum(DifficultyLevelEnum)
export const ExerciseTypeSchemaEnum = z.nativeEnum(ExerciseTypeEnum)
