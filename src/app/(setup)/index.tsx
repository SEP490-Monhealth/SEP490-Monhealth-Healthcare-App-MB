import React, { useState } from "react"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "lodash"
import { useForm } from "react-hook-form"

import { Button, Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import {
  metricActivityLevelSchema,
  metricDateOfBirthSchema,
  metricGenderSchema,
  metricHeightWeightSchema
} from "@/schemas/metricSchema"

import { useSetupStore } from "@/stores/setupStore"

import SetupActivityLevel from "./activity-level"
import SetupDateOfBirth from "./date-of-birth"
import SetupGender from "./gender"
import SetupHeightWeight from "./height-weight"

function SetupScreen() {
  const router = useRouter()

  const { user } = useAuth()

  const { dateOfBirth, gender, height, weight, activityLevel, updateField } =
    useSetupStore()

  const [currentStep, setCurrentStep] = useState(1)

  const formData: Record<string, any> = {
    userId: user?.userId,
    dateOfBirth,
    gender,
    height,
    weight,
    activityLevel
  }

  const setupSteps = [
    {
      step: 1,
      title: "Ngày sinh",
      component: SetupDateOfBirth,
      fields: ["userId", "dateOfBirth"],
      schema: metricDateOfBirthSchema
    },
    {
      step: 2,
      title: "Mức độ hoạt động",
      component: SetupGender,
      fields: ["gender"],
      schema: metricGenderSchema
    },
    {
      step: 3,
      title: "Chiều cao và cân nặng",
      component: SetupHeightWeight,
      fields: ["height", "weight"],
      schema: metricHeightWeightSchema
    },
    {
      step: 4,
      title: "Mức độ hoạt động",
      component: SetupActivityLevel,
      fields: ["activityLevel"],
      schema: metricActivityLevelSchema
    }
  ]

  const currentStepData = setupSteps.find((step) => step.step === currentStep)

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

    if (currentStep < setupSteps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      const finalData = {
        ...useSetupStore.getState(),
        userId: formData.userId
      }

      console.log("Final Form Data:", JSON.stringify(finalData, null, 2))
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const StepComponent = currentStepData.component

  return (
    <Container className="flex-1">
      <Header
        back={currentStep !== 1}
        label={currentStepData.title}
        onBackPress={handleBack}
      />

      <Content className="mt-2">
        <StepComponent control={control} errors={errors} setValue={setValue} />
      </Content>

      <Button
        size="lg"
        onPress={handleSubmit(onSubmitStep)}
        className="absolute bottom-0 left-6 right-6 w-full"
      >
        {currentStep === setupSteps.length ? "Hoàn thành" : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default SetupScreen
