import { CategoryType } from "@/schemas/categorySchema"

import { CategoryTypeEnum } from "./enum/Category"

export const sampleCategoriesData: CategoryType[] = [
  {
    categoryId: "ee39be57-cf88-4420-8e19-606b2ed4dc6d",
    type: CategoryTypeEnum.Food,
    name: "Hải sản",
    imageUrl: require("../../public/icons/categories/crab.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "99052f16-54f5-4456-80f8-1691db7c90f2",
    type: CategoryTypeEnum.Food,
    name: "Thịt",
    imageUrl: require("../../public/icons/categories/steak.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "6d3beea0-5f00-4a8a-ab52-d5774e3c5770",
    type: CategoryTypeEnum.Food,
    name: "Rau củ",
    imageUrl: require("../../public/icons/categories/broccoli.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "4c35b262-4c08-4624-900b-e22ba8988c92",
    type: CategoryTypeEnum.Food,
    name: "Ngũ cốc",
    imageUrl: require("../../public/icons/categories/rice.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "fe3a3546-b294-4665-9c82-092d4ab5a187",
    type: CategoryTypeEnum.Food,
    name: "Hạt và đậu",
    imageUrl: require("../../public/icons/categories/grain.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "22ee062d-4904-4c64-a783-74b3e142aac7",
    type: CategoryTypeEnum.Food,
    name: "Món chay",
    imageUrl: require("../../public/icons/categories/radish.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "78651ea5-2013-4e50-a55f-714de91a712d",
    type: CategoryTypeEnum.Food,
    name: "Món ngọt",
    imageUrl: require("../../public/icons/categories/cupcake.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "f63dd434-9796-46ab-95ad-759bfac51e26",
    type: CategoryTypeEnum.Food,
    name: "Đồ uống",
    imageUrl: require("../../public/icons/categories/coffee-cup.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "fc7f66aa-8c09-46db-a679-be440e3ed91f",
    type: CategoryTypeEnum.Food,
    name: "Món lên men",
    imageUrl: require("../../public/icons/categories/pickles.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "19fe32e8-9e15-486b-9398-f0116cd5019a",
    type: CategoryTypeEnum.Food,
    name: "Trái cây",
    imageUrl: require("../../public/icons/categories/apple.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  },
  {
    categoryId: "bd21fd3f-8b19-4756-9da8-8ea32fc646d6",
    type: CategoryTypeEnum.Food,
    name: "Đồ ăn nhanh",
    imageUrl: require("../../public/icons/categories/burger.png"),
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z"
  }
]
