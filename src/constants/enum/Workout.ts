import { z } from "zod"

export enum ExerciseTypeEnum {
  Time,
  Reps
}

export enum WorkoutTypeEnum {
  Warmup,
  Workout
}

export enum DifficultyLevelEnum {
  Easy,
  Medium,
  Hard
}

export const ExerciseTypeSchemaEnum = z.nativeEnum(ExerciseTypeEnum)
export const WorkoutTypeSchemaEnum = z.nativeEnum(WorkoutTypeEnum)
export const DifficultyLevelSchemaEnum = z.nativeEnum(DifficultyLevelEnum)
