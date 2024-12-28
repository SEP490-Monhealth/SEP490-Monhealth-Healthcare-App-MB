import { MealType } from "@/schemas/mealSchema"

export const sampleMealsData: MealType[] = [
  {
    mealId: "c43ad7ca",
    userId: "123",
    type: "Breakfast",

    nutrition: {
      calories: 840,
      protein: 24.6,
      carbs: 157.9,
      fat: 13.6,
      fiber: 9.2,
      sugar: 29.9
    },

    mealFoods: [
      {
        mealFoodId: "4d6c32b1-e274-4038-8434-5aae78f14a20",
        foodId: "72403979-2c88-4437-81b3-e4d7443bd0cf",
        name: "Cơm",

        quantity: 1,

        portion: {
          size: "1 phần",
          weight: 100,
          unit: "g"
        },

        calories: 130
      },
      {
        mealFoodId: "c68b7716-757c-4ce4-8f7b-1bf6fec68f01",
        foodId: "ddc5f97a-749f-4334-bd6d-dfecb47d913a",
        name: "Bánh mì",

        quantity: 1,

        portion: {
          size: "1 ổ",
          weight: 100,
          unit: "g"
        },

        calories: 249
      },
      {
        mealFoodId: "1d8bdf33-539f-4396-8de4-1abd49586cd0",
        foodId: "7c58b4ed-d697-4c86-affe-7810ef7c6b0d",
        name: "Chuối",

        quantity: 1,

        portion: {
          size: "1 quả vừa",
          weight: 118,
          unit: "g"
        },

        calories: 105
      },
      {
        mealFoodId: "b7b921ca-200f-4b23-8b96-03d62df47483",
        foodId: "c70ab971-bd64-4557-ae05-df9a5599e154",
        name: "Bún bò huế",

        quantity: 1,

        portion: {
          size: "1 tô",
          weight: 400,
          unit: "g"
        },

        calories: 820
      },
      {
        mealFoodId: "ddf6f1e9-c2ed-4e60-b9b9-e73292b31949",
        foodId: "16de3ed1-d0ec-47e8-851b-80d6ba872a26",
        name: "Táo",

        quantity: 1,

        portion: {
          size: "1 trái",
          weight: 150,
          unit: "g"
        },

        calories: 78
      }
    ],

    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
    createdBy: "asd",
    updatedBy: "asd"
  }
]
