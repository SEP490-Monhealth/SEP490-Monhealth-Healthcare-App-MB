import React, { useState } from "react"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button, Container, Content, Progress } from "@/components/global/atoms"
import { CustomHeader, StepHeader } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"
import { GoalTypeEnum } from "@/constants/enum/Goal"

import { useAuth } from "@/contexts/AuthContext"
import { useStorage } from "@/contexts/StorageContext"

import { useCreateUserFoods } from "@/hooks/useFood"
import { useCreateMetric } from "@/hooks/useMetric"

import { allergySetupSchema } from "@/schemas/allergySchema"
import {
  caloriesRatioSetupSchema,
  goalTypeSetupSchema
} from "@/schemas/goalSchema"
import {
  activityLevelSetupSchema,
  dateOfBirthSetupSchema,
  genderSetupSchema,
  heightWeightSetupSchema,
  weightGoalSetupSchema
} from "@/schemas/metricSchema"

import { useSetupStore } from "@/stores/setupStore"

import { LoadingOverlay } from "../../loading"
import SetupActivityLevel from "./activity-level"
import SetupAllergies from "./allergies"
import SetupCaloriesRatio from "./calories-ratio"
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

function SetupUserScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { addAllergies } = useStorage()

  const { mutate: createMetric } = useCreateMetric()
  const { mutate: createUserFoods } = useCreateUserFoods()

  const {
    dateOfBirth,
    gender,
    height,
    weight,
    activityLevel,
    goalType,
    weightGoal,
    caloriesRatio,
    // categories,
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
    caloriesRatio,
    // categories,
    allergies
  }

  const baseSteps: Omit<SetupStepsProps, "step">[] = [
    {
      title: "Sinh nhật",
      description: "Nhập ngày sinh để chúng tôi xác định tuổi của bạn",
      component: SetupDateOfBirth,
      fields: ["dateOfBirth"],
      schema: dateOfBirthSetupSchema
    },
    {
      title: "Giới tính",
      description: "Chọn giới tính để cá nhân hóa trải nghiệm của bạn",
      component: SetupGender,
      fields: ["gender"],
      schema: genderSetupSchema
    },
    {
      title: "Số đo",
      description: "Nhập chiều cao và cân nặng hiện tại của bạn",
      component: SetupHeightWeight,
      fields: ["height", "weight"],
      schema: heightWeightSetupSchema
    },
    {
      title: "Hoạt động",
      description: "Chọn mức độ vận động hàng ngày của bạn",
      component: SetupActivityLevel,
      fields: ["activityLevel"],
      schema: activityLevelSetupSchema
    },
    {
      title: "Mục tiêu",
      description: "Xác định mục tiêu sức khỏe chính của bạn",
      component: SetupGoalType,
      fields: ["goalType"],
      schema: goalTypeSetupSchema
    },
    {
      title: "Cân nặng",
      description: "Nhập cân nặng mục tiêu mà bạn mong muốn",
      component: SetupWeightGoal,
      fields: ["weightGoal"],
      schema: weightGoalSetupSchema
    }
  ]

  let stepsWithGoalType = [...baseSteps]

  if (goalType !== GoalTypeEnum.Maintenance) {
    stepsWithGoalType.push({
      title: goalType === GoalTypeEnum.WeightLoss ? "Giảm cân" : "Tăng cân",
      description:
        goalType === GoalTypeEnum.WeightLoss
          ? "Chọn tốc độ giảm cân phù hợp với cơ thể của bạn"
          : "Chọn tốc độ tăng cân phù hợp với cơ thể của bạn",
      component: SetupCaloriesRatio,
      fields: ["caloriesRatio"],
      schema: caloriesRatioSetupSchema
    })
  }

  stepsWithGoalType.push({
    title: "Dị ứng",
    description: "Cho chúng tôi biết những thực phẩm bạn bị dị ứng",
    component: SetupAllergies,
    fields: ["allergies"],
    schema: allergySetupSchema
  })

  const setupSteps: SetupStepsProps[] = stepsWithGoalType.map(
    (step, index) => ({
      step: index + 1,
      ...step
    })
  )
  const currentStepData = setupSteps.find((step) => step.step === currentStep)

  if (!currentStepData) {
    setCurrentStep(1)
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

    if (weight !== undefined) {
      if (goalType === GoalTypeEnum.WeightLoss && weightGoal >= weight) {
        setError("weightGoal", {
          type: "manual",
          message: "Mục tiêu giảm cân phải nhỏ hơn cân nặng hiện tại"
        })
        return
      }

      if (goalType === GoalTypeEnum.WeightGain && weightGoal <= weight) {
        setError("weightGoal", {
          type: "manual",
          message: "Mục tiêu tăng cân phải lớn hơn cân nặng hiện tại"
        })
        return
      }
    }

    Object.keys(data).forEach((key) => {
      updateField(key, data[key])
    })

    if (currentStep < setupSteps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)

      try {
        const updatedState = useSetupStore.getState()

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
          weightGoal: updatedState.weightGoal,
          caloriesRatio: updatedState.caloriesRatio
        }

        const allergyData = {
          allergies: updatedState.allergies
        }

        const newMetricData = {
          ...userData,
          ...metricData,
          ...goalData
        }

        const newUserFoodsData = { ...userData, ...allergyData }
        const userAllergiesData = allergyData

        console.log("new metric data", JSON.stringify(newMetricData, null, 2))
        console.log(
          "new user foods data",
          JSON.stringify(newUserFoodsData, null, 2)
        )

        await addAllergies(userAllergiesData.allergies)

        // await Promise.all([
        //   new Promise((resolve, reject) =>
        //     // @ts-ignore
        //     createMetric(newMetricData, {
        //       onSuccess: resolve,
        //       onError: reject
        //     })
        //   ),
        //   new Promise((resolve, reject) =>
        //     // @ts-ignore
        //     createUserFoods(newUserFoodsData, {
        //       onSuccess: resolve,
        //       onError: reject
        //     })
        //   )
        // ])

        router.replace("/(setup)/user/summary")
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
            progress={((currentStep - 1) / setupSteps.length) * 100}
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
        className="absolute bottom-4 left-6 right-6"
      >
        {currentStep === setupSteps.length ? "Hoàn thành" : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default SetupUserScreen
