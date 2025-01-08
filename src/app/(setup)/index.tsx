import React, { useState } from "react"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "lodash"
import { useForm } from "react-hook-form"

import { Button, Container, Content, Progress } from "@/components/global/atoms"
import { CustomHeader, StepHeader } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import { nameCategorySchema } from "@/schemas/categorySchema"
import { typeGoalSchema } from "@/schemas/goalSchema"
import {
  activityLevelMetricSchema,
  dateOfBirthMetricSchema,
  genderMetricSchema,
  heightWeightMetricSchema,
  weightGoalSchema
} from "@/schemas/metricSchema"

import { useSetupStore } from "@/stores/setupStore"

import SetupActivityLevel from "./activity-level"
import SetupInterestCategories from "./categories"
import SetupDateOfBirth from "./date-of-birth"
import SetupGender from "./gender"
import SetupGoalType from "./goal-type"
import SetupHeightWeight from "./height-weight"
import SetupWeightGoal from "./weight-goal"

function SetupScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const {
    dateOfBirth,
    gender,
    height,
    weight,
    activityLevel,
    goalType,
    weightGoal,
    categories,
    updateField
  } = useSetupStore()

  const [currentStep, setCurrentStep] = useState(1)

  const formData: Record<string, any> = {
    userId,
    dateOfBirth,
    gender,
    height,
    weight,
    activityLevel,
    goalType,
    weightGoal,
    categories
  }

  const setupSteps = [
    {
      step: 1,
      title: "Ngày sinh",
      description:
        "Vui lòng nhập ngày sinh của bạn để chúng tôi xác định độ tuổi",
      component: SetupDateOfBirth,
      fields: ["dateOfBirth"],
      schema: dateOfBirthMetricSchema
    },
    {
      step: 2,
      title: "Giới tính",
      description: "Chọn giới tính của bạn để cá nhân hóa trải nghiệm",
      component: SetupGender,
      fields: ["gender"],
      schema: genderMetricSchema
    },
    {
      step: 3,
      title: "Chiều cao và cân nặng",
      description:
        "Nhập chiều cao và cân nặng để tính toán chỉ số sức khỏe của bạn",
      component: SetupHeightWeight,
      fields: ["height", "weight"],
      schema: heightWeightMetricSchema
    },
    {
      step: 4,
      title: "Mức độ hoạt động",
      description:
        "Chọn mức độ hoạt động để dự đoán nhu cầu năng lượng của bạn",
      component: SetupActivityLevel,
      fields: ["activityLevel"],
      schema: activityLevelMetricSchema
    },
    {
      step: 5,
      title: "Mục tiêu",
      description: "Chọn mục tiêu sức khỏe của bạn để bắt đầu",
      component: SetupGoalType,
      fields: ["goalType"],
      schema: typeGoalSchema
    },
    {
      step: 6,
      title: "Mục tiêu cân nặng",
      description: "Nhập mục tiêu cân nặng của bạn để theo dõi",
      component: SetupWeightGoal,
      fields: ["weightGoal"],
      schema: weightGoalSchema
    },
    {
      step: 7,
      title: "Danh mục yêu thích",
      description: "Chọn các danh mục bạn yêu thích để chúng tôi gợi ý phù hợp",
      component: SetupInterestCategories,
      fields: ["categories"],
      schema: nameCategorySchema
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
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData
  })

  const onSubmitStep = (data: Record<string, any>, setError: any) => {
    const { weightGoal } = data
    const { weight } = useSetupStore.getState()

    if (goalType === "WeightLoss" && weightGoal >= weight) {
      setError("weightGoal", {
        type: "manual",
        message: "Mục tiêu giảm cân phải nhỏ hơn cân nặng hiện tại"
      })
      return
    }

    // if (goalType === "MaintainWeight" && weightGoal !== weight) {
    //   setError("weightGoal", {
    //     type: "manual",
    //     message: "Mục tiêu duy trì cân nặng phải bằng cân nặng hiện tại"
    //   })
    //   return
    // }

    if (goalType === "WeightGain" && weightGoal <= weight) {
      setError("weightGoal", {
        type: "manual",
        message: "Mục tiêu tăng cân phải lớn hơn cân nặng hiện tại"
      })
      return
    }

    console.log("Submitted data:", data)
    // console.log("Errors after submit:", errors)

    // Object.keys(data).forEach((key) => {
    //   set(formData, key, data[key])
    // })

    Object.keys(data).forEach((key) => {
      updateField(key, data[key])
    })

    Object.keys(data).forEach((key) => {
      const keys = key.split("")
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
      const metricData = {
        userId: formData.userId,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        height: formData.height,
        weight: formData.weight,
        activityLevel: formData.activityLevel,
        goalType: formData.goalType,
        weightGoal: formData.weightGoal
      }

      console.log(metricData)

      const finalData = {
        userId: formData.userId,
        ...useSetupStore.getState()
      }

      console.log("Final Form Data:", JSON.stringify(finalData, null, 2))

      // router.replace("/(setup)/summary")
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

  console.log(errors)

  return (
    <Container dismissKeyboard>
      <CustomHeader
        content={
          <Progress
            height={14}
            progress={(currentStep / setupSteps.length) * 100}
            color={COLORS.lemon}
          />
        }
        onBackPress={handleBack}
      />

      <Content className="mt-2">
        <StepHeader
          title={currentStepData.title}
          description={currentStepData.description}
        />

        <StepComponent control={control} errors={errors} setValue={setValue} />
      </Content>

      <Button
        size="lg"
        onPress={handleSubmit((data) => onSubmitStep(data, setError))}
        className="absolute bottom-0 left-6 right-6"
      >
        {currentStep === setupSteps.length ? "Hoàn thành" : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default SetupScreen
