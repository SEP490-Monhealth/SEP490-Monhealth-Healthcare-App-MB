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

import { useAuth } from "@/contexts/AuthContext"

import {
  foodInformationSchema,
  foodNutritionSchema,
  foodPortionSchema
} from "@/schemas/foodSchema"

import { useFoodStore } from "@/stores/foodStore"

import FoodInformation from "./information"
import FoodNutrition from "./nutrition"
import FoodPortion from "./portion"

function FoodCreateScreen() {
  const router = useRouter()

  const { user } = useAuth()

  const { type, name, description, portion, nutrition, updateField } =
    useFoodStore()

  const [currentStep, setCurrentStep] = useState(1)

  const formData: Record<string, any> = {
    userId: user?.userId,
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
      component: FoodInformation,
      fields: ["type", "name", "description"],
      schema: foodInformationSchema
    },
    {
      step: 2,
      title: "Khẩu phần ăn",
      component: FoodPortion,
      fields: ["portion"],
      schema: foodPortionSchema
    },
    {
      step: 3,
      title: "Dinh dưỡng",
      component: FoodNutrition,
      fields: ["nutrition"],
      schema: foodNutritionSchema
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

  // console.log(errors)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full flex-1 bg-background">
        <View className="px-6">
          <Header back label={currentStepData.title} />
        </View>

        <Content className="mt-2">
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
