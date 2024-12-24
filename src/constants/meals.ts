import { MealType } from "@/schemas/mealSchema"

export const sampleMealsData: MealType[] = [
  {
    mealId: "c43ad7ca",
    mealType: "Breakfast",

    calories: 840,
    protein: 24.6,
    carbs: 157.9,
    fat: 13.6,
    fiber: 9.2,
    sugar: 29.9,

    mealFoods: [
      {
        mealFoodId: "4d6c32b1-e274-4038-8434-5aae78f14a20",
        foodId: "72403979-2c88-4437-81b3-e4d7443bd0cf",
        name: "Cơm",

        size: "1 chén (bát)",
        weight: 100,
        unit: "g",

        calories: 130
      },
      {
        mealFoodId: "c68b7716-757c-4ce4-8f7b-1bf6fec68f01",
        foodId: "ddc5f97a-749f-4334-bd6d-dfecb47d913a",
        name: "Bánh mì",

        weight: 100,
        unit: "g",

        calories: 249
      },
      {
        mealFoodId: "1d8bdf33-539f-4396-8de4-1abd49586cd0",
        foodId: "7c58b4ed-d697-4c86-affe-7810ef7c6b0d",
        name: "Chuối",

        size: "1 quả vừa",
        weight: 118,
        unit: "g",

        calories: 105
      },
      {
        mealFoodId: "b7b921ca-200f-4b23-8b96-03d62df47483",
        foodId: "c70ab971-bd64-4557-ae05-df9a5599e154",
        name: "Bún bò huế",

        size: "1 tô",
        weight: 400,
        unit: "g",

        calories: 820
      },
      {
        mealFoodId: "ddf6f1e9-c2ed-4e60-b9b9-e73292b31949",
        foodId: "16de3ed1-d0ec-47e8-851b-80d6ba872a26",
        name: "Táo",

        size: "1 trái",
        weight: 150,
        unit: "g",

        calories: 78
      }
    ],
    createdAt: "2021-12-07T00:00:00.000Z",
    updatedAt: "2021-12-07T00:00:00.000Z"
  }
]

export const eatenMeals = [
  {
    mealId: "c43ad7ca-ae49-4178-b793-fcd5d73d1513",
    mealType: "Breakfast",

    mealFoods: [
      {
        mealFoodId: "49ccddf0-5bb0-44f8-ad21-96435b1e91e8",
        foodId: "72403979-2c88-4437-81b3-e4d7443bd0cf",
        name: "Cơm",

        size: "1 chén (bát)",
        weight: 100,
        unit: "g",

        calories: 130
      },
      {
        mealFoodId: "224648d0-bc45-4c46-8ca5-151d00a345ed",
        foodId: "16de3ed1-d0ec-47e8-851b-80d6ba872a26",
        name: "Táo",

        size: "1 trái",
        weight: 150,
        unit: "g",

        calories: 78
      },
      {
        mealFoodId: "1d8bdf33-539f-4396-8de4-1abd49586cd0",
        foodId: "7c58b4ed-d697-4c86-affe-7810ef7c6b0d",
        name: "Chuối",

        size: "1 quả vừa",
        weight: 118,
        unit: "g",

        calories: 105
      },
      {
        mealFoodId: "4d3baa5e-b50d-441c-bc28-ef957857a5d7",
        foodId: "11adf317-b001-4df7-bd1c-a4d1934c48f2",
        name: "Cơm tấm sườn",

        size: "1 đĩa",
        weight: 400,
        unit: "g",

        calories: 527
      }
    ],
    createdAt: "2021-12-07T00:00:00.000Z",
    updatedAt: "2021-12-07T00:00:00.000Z"
  }
]
