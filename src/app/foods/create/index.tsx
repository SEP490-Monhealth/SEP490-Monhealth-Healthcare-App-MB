import React, { useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "lodash"
import { useForm } from "react-hook-form"

import { Button, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateFood } from "@/hooks/useFood"

import {
  informationFoodSchema,
  nutritionFoodSchema,
  portionFoodSchema
} from "@/schemas/foodSchema"

import { useFoodStore } from "@/stores/foodStore"

import FoodInformation from "./information"
import FoodNutrition from "./nutrition"
import FoodPortion from "./portion"

function FoodCreateScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  // const SheetMealRef = useRef<SheetRefProps>(null)
  // const SheetDishRef = useRef<SheetRefProps>(null)

  // const sheetMealHeight = 280
  // const sheetDishHeight = 320

  const { mutate: createFood } = useCreateFood()

  const {
    // mealType,
    // dishType,
    name,
    description,
    portion,
    nutrition,
    isPublic,
    updateField
  } = useFoodStore()

  const [currentStep, setCurrentStep] = useState(1)

  const formData: Record<string, any> = {
    userId,
    // mealType,
    // dishType,
    name,
    description,
    portion,
    nutrition,
    isPublic
  }

  const steps = [
    {
      step: 1,
      title: "Tạo món ăn",
      component: FoodInformation,
      fields: ["name", "description", "isPublic"],
      schema: informationFoodSchema
    },
    {
      step: 2,
      title: "Khẩu phần ăn",
      component: FoodPortion,
      fields: ["portion"],
      schema: portionFoodSchema
    },
    {
      step: 3,
      title: "Dinh dưỡng",
      component: FoodNutrition,
      fields: ["nutrition"],
      schema: nutritionFoodSchema
    }
  ]

  const currentStepData = steps.find((step) => step.step === currentStep)

  if (!currentStepData) {
    setCurrentStep(1)
    return null
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData
  })

  const onSubmitStep = (data: Record<string, any>) => {
    console.log("Submitted data:", data)
    // console.log("Errors after submit:", errors)

    Object.keys(data).forEach((key) => {
      set(formData, key, data[key])
    })

    Object.keys(data).forEach((key) => {
      const keys = key.split(".")
      if (keys.length > 1) {
        const [parent, child] = keys
        updateField(parent, { ...formData[parent], [child]: data[key] })
      } else {
        updateField(key, data[key])
      }
    })

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      const finalData = {
        ...useFoodStore.getState(),
        userId: formData.userId,
        nutrition: formData.nutrition || {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0
        }
      }

      console.log("Final Form Data:", JSON.stringify(finalData, null, 2))

      createFood(finalData, {
        onSuccess: () => {
          router.push("/foods")
        }
      })
    }
  }

  // const openMealSheet = () => SheetMealRef.current?.scrollTo(-sheetMealHeight)
  // const openDishSheet = () => SheetDishRef.current?.scrollTo(-sheetDishHeight)

  // const toggleSelection = (
  //   list: (MealTypeEnum | DishTypeEnum)[],
  //   value: MealTypeEnum | DishTypeEnum,
  //   field: "mealType" | "dishType"
  // ) => {
  //   const updatedList = list.includes(value)
  //     ? list.filter((item) => item !== value)
  //     : [...list, value]

  //   const sortOrder = (
  //     field === "mealType"
  //       ? DATA.MEALS.map((meal) => meal.value)
  //       : DATA.DISHES.map((dish) => dish.value)
  //   ) as (MealTypeEnum | DishTypeEnum)[]

  //   const orderedList = updatedList.sort(
  //     (a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
  //   )

  //   updateField(field, orderedList)
  //   setValue(field, orderedList)
  // }

  const handleBack = () => {
    if (currentStep === 1) {
      router.back()
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const StepComponent = currentStepData.component

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full flex-1 bg-background">
        <View className="px-6">
          <Header back label={currentStepData.title} onBackPress={handleBack} />
        </View>

        <Content className="mt-2">
          <StepComponent
            control={control}
            errors={errors}
            setValue={setValue}
            // openMealSheet={openMealSheet}
            // openDishSheet={openDishSheet}
          />
        </Content>

        <Button
          size="lg"
          onPress={handleSubmit(onSubmitStep)}
          className="absolute bottom-12 left-6 right-6"
        >
          {currentStep === steps.length ? "Tạo mới" : "Tiếp tục"}
        </Button>

        {/* <Sheet ref={SheetMealRef} dynamicHeight={sheetMealHeight}>
          {DATA.MEALS.map((meal) => (
            <SheetItem
              key={meal.value}
              item={meal.label}
              isSelected={mealType.includes(meal.value as MealTypeEnum)}
              onSelect={() => {
                toggleSelection(
                  mealType,
                  meal.value as MealTypeEnum,
                  "mealType"
                )
              }}
            />
          ))}
        </Sheet>

        <Sheet ref={SheetDishRef} dynamicHeight={sheetDishHeight}>
          {DATA.DISHES.map((dish) => (
            <SheetItem
              key={dish.value}
              item={dish.label}
              isSelected={dishType.includes(dish.value as DishTypeEnum)}
              onSelect={() =>
                toggleSelection(
                  dishType,
                  dish.value as DishTypeEnum,
                  "dishType"
                )
              }
            />
          ))}
        </Sheet> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default FoodCreateScreen
