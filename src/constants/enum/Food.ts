import { EnumMeta } from "@/configs/enum"
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

export const mealTypeMap: Record<MealTypeEnum, EnumMeta> = {
  [MealTypeEnum.Breakfast]: {
    label: "Bữa sáng",
    engLabel: "Breakfast",
    description: "Bữa ăn quan trọng đầu ngày cung cấp năng lượng thiết yếu",
    icon: require("../../public/icons/meals/sandwich.png"),
    ratio: 30
  },
  [MealTypeEnum.Lunch]: {
    label: "Bữa trưa",
    engLabel: "Lunch",
    description: "Bữa ăn chính giữa ngày giúp duy trì năng lượng làm việc",
    icon: require("../../public/icons/meals/rice.png"),
    ratio: 35
  },
  [MealTypeEnum.Dinner]: {
    label: "Bữa tối",
    engLabel: "Dinner",
    description: "Bữa ăn nhẹ buổi tối giúp cơ thể phục hồi qua đêm",
    icon: require("../../public/icons/meals/roast-chicken.png"),
    ratio: 25
  },
  [MealTypeEnum.Snack]: {
    label: "Bữa phụ",
    engLabel: "Snack",
    description: "Bữa ăn nhẹ bổ sung năng lượng giữa các bữa chính",
    icon: require("../../public/icons/meals/cupcake.png"),
    ratio: 10
  }
}

export function getMealTypeMeta(status: MealTypeEnum): EnumMeta {
  return mealTypeMap[status]
}
