import React, { useState } from "react"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button, Container, Content, Progress } from "@/components/global/atoms"
import { CustomHeader, StepHeader } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateUserFoods } from "@/hooks/useFood"
import { useCreateMetric } from "@/hooks/useMetric"

import { allergySetupSchema } from "@/schemas/allergySchema"
import { categorySetupSchema } from "@/schemas/categorySchema"
import { typeGoalSchema } from "@/schemas/goalSchema"
import {
  activityLevelMetricSchema,
  dateOfBirthMetricSchema,
  genderMetricSchema,
  heightWeightMetricSchema,
  weightGoalSchema
} from "@/schemas/metricSchema"

import { useSetupStore } from "@/stores/setupStore"

import { LoadingOverlay } from "../loading"
import SetupActivityLevel from "./activity-level"
import SetupAllergies from "./allergies"
import SetupCategories from "./categories"
import SetupDateOfBirth from "./date-of-birth"
import SetupGender from "./gender"
import SetupGoalType from "./goal-type"
import SetupHeightWeight from "./height-weight"
import SetupWeightGoal from "./weight-goal"

interface SetupStepsProps {
  step: number
  title: string
  description: string
  component: React.FC<any>
  fields: string[]
  schema: any
}

function SetupScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { mutate: createMetric } = useCreateMetric()
  const { mutate: createUserFoods } = useCreateUserFoods(userId || "")

  const {
    dateOfBirth,
    gender,
    height,
    weight,
    activityLevel,
    goalType,
    weightGoal,
    categories,
    allergies,
    updateField
  } = useSetupStore()

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const formData: Record<string, any> = {
    userId,
    dateOfBirth,
    gender,
    height,
    weight,
    activityLevel,
    goalType,
    weightGoal,
    categories,
    allergies
  }

  const setupSteps: SetupStepsProps[] = [
    {
      step: 1,
      title: "Ngày sinh",
      description: "Nhập ngày sinh để xác định tuổi của bạn",
      component: SetupDateOfBirth,
      fields: ["dateOfBirth"],
      schema: dateOfBirthMetricSchema
    },
    {
      step: 2,
      title: "Giới tính",
      description: "Chọn giới tính để cá nhân hóa trải nghiệm",
      component: SetupGender,
      fields: ["gender"],
      schema: genderMetricSchema
    },
    {
      step: 3,
      title: "Chiều cao và cân nặng",
      description: "Nhập chiều cao và cân nặng hiện tại",
      component: SetupHeightWeight,
      fields: ["height", "weight"],
      schema: heightWeightMetricSchema
    },
    {
      step: 4,
      title: "Mức độ hoạt động",
      description: "Chọn mức độ hoạt động hàng ngày",
      component: SetupActivityLevel,
      fields: ["activityLevel"],
      schema: activityLevelMetricSchema
    },
    {
      step: 5,
      title: "Mục tiêu",
      description: "Xác định mục tiêu sức khỏe của bạn",
      component: SetupGoalType,
      fields: ["goalType"],
      schema: typeGoalSchema
    },
    {
      step: 6,
      title: "Mục tiêu cân nặng",
      description: "Nhập cân nặng mục tiêu mong muốn",
      component: SetupWeightGoal,
      fields: ["weightGoal"],
      schema: weightGoalSchema
    },
    {
      step: 7,
      title: "Danh mục yêu thích",
      description: "Chọn danh mục bạn yêu thích",
      component: SetupCategories,
      fields: ["categories"],
      schema: categorySetupSchema
    },
    {
      step: 8,
      title: "Dị ứng",
      description: "Cho biết thực phẩm bạn dị ứng",
      component: SetupAllergies,
      fields: ["allergies"],
      schema: allergySetupSchema
    }
  ]

  const currentStepData = setupSteps.find((step) => step.step === currentStep)

  if (!currentStepData) {
    return null
  }

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData
  })

  const onSubmitStep = async (data: Record<string, any>, setError: any) => {
    const { weightGoal } = data
    const { weight } = useSetupStore.getState()

    if (goalType === "WeightLoss" && weightGoal >= weight) {
      setError("weightGoal", {
        type: "manual",
        message: "Mục tiêu giảm cân phải nhỏ hơn cân nặng hiện tại"
      })
      return
    }

    if (goalType === "WeightGain" && weightGoal <= weight) {
      setError("weightGoal", {
        type: "manual",
        message: "Mục tiêu tăng cân phải lớn hơn cân nặng hiện tại"
      })
      return
    }

    Object.keys(data).forEach((key) => {
      updateField(key, data[key])
    })

    const updatedState = useSetupStore.getState()

    if (currentStep < setupSteps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      const userData = {
        userId: formData.userId
      }

      const metricData = {
        dateOfBirth: updatedState.dateOfBirth,
        gender: updatedState.gender,
        height: updatedState.height,
        weight: updatedState.weight,
        activityLevel: updatedState.activityLevel
      }

      const goalData = {
        goalType: updatedState.goalType,
        weightGoal: updatedState.weightGoal
      }

      const categoryData = {
        categories: updatedState.categories
      }

      const allergyData = {
        allergies: updatedState.allergies
      }

      const newMetricData = {
        ...userData,
        ...metricData,
        ...goalData
      }

      const newUserFoodsData = { ...categoryData, ...allergyData }

      // console.log("new metric data", JSON.stringify(newMetricData, null, 2))
      // console.log(
      //   "new user foods data",
      //   JSON.stringify(newUserFoodsData, null, 2)
      // )

      setIsLoading(true)

      try {
        await Promise.all([
          new Promise((resolve, reject) =>
            createMetric(newMetricData, {
              onSuccess: resolve,
              onError: reject
            })
          ),
          new Promise((resolve, reject) =>
            createUserFoods(newUserFoodsData, {
              onSuccess: resolve,
              onError: reject
            })
          )
        ])

        router.replace("/(setup)/summary")
      } catch (error) {
        console.error("Error during setup submission:", error)
      } finally {
        setIsLoading(false)
      }
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
    <Container dismissKeyboard>
      {isLoading && <LoadingOverlay visible={isLoading} />}

      <CustomHeader
        back={currentStep === 1 ? false : true}
        content={
          <Progress
            height={14}
            progress={(currentStep / setupSteps.length) * 100}
            color={COLORS.PRIMARY.lemon}
          />
        }
        onBackPress={handleBack}
      />

      <Content className="mt-2">
        <StepHeader
          title={currentStepData.title}
          description={currentStepData.description}
        />

        <StepComponent control={control} setValue={setValue} errors={errors} />
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
