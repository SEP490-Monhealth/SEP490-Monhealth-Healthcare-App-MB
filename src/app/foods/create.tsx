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

import { Button, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import {
  CreateInformation,
  CreateNutrition,
  CreatePortion
} from "@/components/local/foods"

import {
  createFoodInformationSchema,
  createFoodNutritionSchema,
  createFoodPortionSchema
} from "@/schemas/foodSchema"

import { useFoodStore } from "@/stores/foodStore"

function FoodCreateScreen() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const { userId, type, name, description, portion, nutrition, updateField } =
    useFoodStore()

  const formData: Record<string, any> = {
    userId,
    type,
    name,
    description,
    portion,
    nutrition
  }

  const steps = [
    {
      step: 1,
      title: "Tạo món ăn",
      component: CreateInformation,
      fields: ["userId", "type", "name", "description"],
      schema: createFoodInformationSchema
    },
    {
      step: 2,
      title: "Khẩu phần ăn",
      component: CreatePortion,
      fields: ["portion"],
      schema: createFoodPortionSchema
    },
    {
      step: 3,
      title: "Dinh dưỡng",
      component: CreateNutrition,
      fields: ["nutrition"],
      schema: createFoodNutritionSchema
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
    // console.log("Submitted data:", data)
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
      console.log(
        "Final Form Data:",
        JSON.stringify(useFoodStore.getState(), null, 2)
      )
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

  // console.log("Default Values:", defaultValues)
  // console.log(errors)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full bg-background">
        <View className="px-6">
          <Header back label={currentStepData.title} />
        </View>

        <Content>
          <StepComponent
            control={control}
            errors={errors}
            setValue={setValue}
          />
        </Content>

        <VStack
          gap={12}
          className="absolute bottom-16 w-full bg-background px-6"
        >
          <Button variant="secondary" onPress={handleBack}>
            {currentStep === 1 ? "Hủy" : "Quay lại"}
          </Button>

          <Button onPress={handleSubmit(onSubmitStep)}>
            {currentStep === steps.length ? "Tạo mới" : "Tiếp tục"}
          </Button>
        </VStack>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default FoodCreateScreen
