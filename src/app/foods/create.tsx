import { useState } from "react"

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

  const { mutate: createFood } = useCreateFood()

  const { foodType, name, description, portion, nutrition, updateField } =
    useFoodStore()

  const [currentStep, setCurrentStep] = useState(1)

  const formData: Record<string, any> = {
    userId,
    foodType,
    name,
    description,
    portion,
    nutrition
  }

  const steps = [
    {
      step: 1,
      title: "Tạo món ăn",
      component: FoodInformation,
      fields: ["foodType", "name", "description"],
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
          />
        </Content>

        <Button
          size="lg"
          onPress={handleSubmit(onSubmitStep)}
          className="absolute bottom-16 left-6 right-6"
        >
          {currentStep === steps.length ? "Tạo mới" : "Tiếp tục"}
        </Button>

        {/* <VStack
          gap={12}
          className="absolute bottom-16 w-full bg-background px-6"
        >
          <Button variant="secondary" onPress={handleBack}>
            {currentStep === 1 ? "Hủy" : "Quay lại"}
          </Button>

          <Button onPress={handleSubmit(onSubmitStep)}>
            {currentStep === steps.length ? "Tạo mới" : "Tiếp tục"}
          </Button>
        </VStack> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default FoodCreateScreen
