import { z } from "zod"

export enum FoodTypeEnum {
  Carbs,
  Protein,
  Vegetables,
  Fat,
  Fruit,
  Balanced
}

export enum MealTypeEnum {
  Breakfast,
  Lunch,
  Dinner,
  Snack
}

export enum DishTypeEnum {
  MainDish,
  SideDish,
  Soup,
  Dessert,
  Snack,
  Drink
}

export const FoodTypeSchemaEnum = z.nativeEnum(FoodTypeEnum)
export const MealTypeSchemaEnum = z.nativeEnum(MealTypeEnum)
export const DishTypeSchemaEnum = z.nativeEnum(DishTypeEnum)
