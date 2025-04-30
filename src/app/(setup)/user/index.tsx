import React, { useEffect, useState } from "react"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, Container, Content, Progress } from "@/components/global/atoms"
import { CustomHeader, StepHeader } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"
import { GoalTypeEnum } from "@/constants/enum/Goal"

import { useAuth } from "@/contexts/AuthContext"
import { useStorage } from "@/contexts/StorageContext"

import { useCreateUserAllergy } from "@/hooks/useAllergy"
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
import SetupTimeLine from "./time-line"
import SetupWeightGoal from "./weight-goal"

interface SetupStepsProps {
  step: number
  title: string
  description: string
  component: React.FC<any>
  fields: string[]
  schema: any
  condition?: () => boolean
}

function SetupUserScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { addAllergies } = useStorage()

  const { mutate: createMetric } = useCreateMetric()
  const { mutate: createUserAllergies } = useCreateUserAllergy()

  const {
    dateOfBirth,
    gender,
    height,
    weight,
    activityLevel,
    weightGoal,
    goalType,
    caloriesRatio,
    // categories,
    allergies,
    updateField
  } = useSetupStore()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (goalType !== null) {
      let newRatio = caloriesRatio

      if (
        caloriesRatio === 0 ||
        (goalType === GoalTypeEnum.WeightLoss && caloriesRatio >= 1) ||
        (goalType === GoalTypeEnum.Maintenance && caloriesRatio !== 1) ||
        (goalType === GoalTypeEnum.WeightGain && caloriesRatio <= 1)
      ) {
        switch (goalType) {
          case GoalTypeEnum.WeightLoss:
            newRatio = 0.8
            break
          case GoalTypeEnum.Maintenance:
            newRatio = 1
            break
          case GoalTypeEnum.WeightGain:
            newRatio = 1.2
            break
        }

        if (newRatio !== caloriesRatio) {
          updateField("caloriesRatio", newRatio)
        }
      }
    }
  }, [goalType, caloriesRatio, updateField])

  const formData: Record<string, any> = {
    userId,
    dateOfBirth,
    gender,
    height,
    weight,
    activityLevel,
    weightGoal,
    goalType,
    caloriesRatio,
    // categories,
    allergies
  }

  const setupSteps: SetupStepsProps[] = [
    {
      step: 1,
      title: "Ngày sinh của bạn",
      description:
        "Nhập ngày sinh để chúng tôi tính toán chế độ dinh dưỡng phù hợp với độ tuổi",
      component: SetupDateOfBirth,
      fields: ["dateOfBirth"],
      schema: dateOfBirthSetupSchema
    },
    {
      step: 2,
      title: "Giới tính của bạn",
      description:
        "Chọn giới tính để chúng tôi tính toán nhu cầu dinh dưỡng chính xác",
      component: SetupGender,
      fields: ["gender"],
      schema: genderSetupSchema
    },
    {
      step: 3,
      title: "Chiều cao và cân nặng",
      description:
        "Nhập chiều cao và cân nặng hiện tại để tính chỉ số BMI và nhu cầu calo hàng ngày",
      component: SetupHeightWeight,
      fields: ["height", "weight"],
      schema: heightWeightSetupSchema
    },
    {
      step: 4,
      title: "Mức độ hoạt động",
      description:
        "Cho chúng tôi biết bạn vận động nhiều thế nào để tính lượng calo bạn cần mỗi ngày",
      component: SetupActivityLevel,
      fields: ["activityLevel"],
      schema: activityLevelSetupSchema
    },
    {
      step: 5,
      title: "Mục tiêu sức khỏe",
      description: "Bạn muốn giảm cân, duy trì cân nặng, hay tăng cân và cơ?",
      component: SetupGoalType,
      fields: ["goalType"],
      schema: goalTypeSetupSchema
    },
    {
      step: 6,
      title: "Cân nặng mong muốn",
      description:
        "Nhập cân nặng mục tiêu bạn muốn đạt được trong thời gian tới",
      component: SetupWeightGoal,
      fields: ["weightGoal"],
      schema: weightGoalSetupSchema
    },
    {
      step: 7,
      title: "Tốc độ thay đổi cân nặng",
      description:
        "Chọn tốc độ phù hợp để đạt được mục tiêu cân nặng an toàn và hiệu quả",
      component: SetupCaloriesRatio,
      fields: ["caloriesRatio"],
      schema: caloriesRatioSetupSchema,
      condition: () => goalType !== GoalTypeEnum.Maintenance
    },
    {
      step: 8,
      title: "Lộ trình của bạn",
      description:
        "Dựa trên thông tin bạn cung cấp, đây là kế hoạch để đạt mục tiêu cân nặng",
      component: SetupTimeLine,
      fields: [],
      schema: z.object({}),
      condition: () => goalType !== GoalTypeEnum.Maintenance
    },
    {
      step: 9,
      title: "Dị ứng thực phẩm",
      description:
        "Chọn thực phẩm bạn bị dị ứng để chúng tôi tạo kế hoạch dinh dưỡng an toàn",
      component: SetupAllergies,
      fields: ["allergies"],
      schema: allergySetupSchema
    }
  ]

  const filteredSteps = setupSteps.filter((s) => !s.condition || s.condition())
  const visibleStepIndex = filteredSteps.findIndex(
    (s) => s.step === currentStep
  )

  useEffect(() => {
    if (visibleStepIndex === -1 && filteredSteps.length > 0) {
      const nextValid = filteredSteps.find((s) => s.step > currentStep)
      const fallback = nextValid
        ? nextValid.step
        : filteredSteps[filteredSteps.length - 1].step
      setCurrentStep(fallback)
    }
  }, [visibleStepIndex, filteredSteps, currentStep])

  const currentStepData =
    filteredSteps.find((s) => s.step === currentStep) || filteredSteps[0]

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

  const findNextStep = () => {
    const currentIndex = filteredSteps.findIndex(
      (step) => step.step === currentStep
    )
    if (currentIndex < filteredSteps.length - 1) {
      return filteredSteps[currentIndex + 1].step
    }
    return null
  }

  const findPrevStep = () => {
    const currentIndex = filteredSteps.findIndex(
      (step) => step.step === currentStep
    )
    if (currentIndex > 0) {
      return filteredSteps[currentIndex - 1].step
    }
    return null
  }

  const onSubmitStep = async (data: Record<string, any>, setError: any) => {
    const { weightGoal } = data
    const { weight } = useSetupStore.getState()

    if (weightGoal !== undefined && weight !== null) {
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

      if (
        goalType === GoalTypeEnum.Maintenance &&
        Math.abs(weightGoal - weight) > 2
      ) {
        setError("weightGoal", {
          type: "manual",
          message: "Mục tiêu duy trì cân nặng nên gần với cân nặng hiện tại"
        })
        return
      }
    }

    Object.keys(data).forEach((key) => {
      updateField(key, data[key])
    })

    if (data.goalType !== undefined) {
      const currentCaloriesRatio = useSetupStore.getState().caloriesRatio

      if (
        currentCaloriesRatio === 0 ||
        (data.goalType === GoalTypeEnum.WeightLoss &&
          currentCaloriesRatio >= 1) ||
        (data.goalType === GoalTypeEnum.Maintenance &&
          currentCaloriesRatio !== 1) ||
        (data.goalType === GoalTypeEnum.WeightGain && currentCaloriesRatio <= 1)
      ) {
        let newRatio = currentCaloriesRatio
        switch (data.goalType) {
          case GoalTypeEnum.WeightLoss:
            newRatio = 0.8
            break
          case GoalTypeEnum.Maintenance:
            newRatio = 1
            break
          case GoalTypeEnum.WeightGain:
            newRatio = 1.2
            break
        }

        updateField("caloriesRatio", newRatio)
      }

      if (data.goalType === GoalTypeEnum.Maintenance) {
        updateField("weightGoal", weight)
      }
    }

    const nextStep = findNextStep()

    if (nextStep) {
      setCurrentStep(nextStep)
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

        // console.log("new metric data", JSON.stringify(newMetricData, null, 2))
        // console.log(
        //   "new user foods data",
        //   JSON.stringify(newUserFoodsData, null, 2)
        // )

        await addAllergies(userAllergiesData.allergies)

        await Promise.all([
          new Promise((resolve, reject) =>
            // @ts-ignore
            createMetric(newMetricData, {
              onSuccess: resolve,
              onError: reject
            })
          ),
          new Promise((resolve, reject) =>
            // @ts-ignore
            createUserAllergies(newUserFoodsData, {
              onSuccess: resolve,
              onError: reject
            })
          )
        ])

        router.replace("/(setup)/user/summary")
      } catch (error) {
        console.error("Error during setup submission:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    const prevStep = findPrevStep()

    if (prevStep) {
      setCurrentStep(prevStep)
    } else {
      router.back()
    }
  }

  const StepComponent = currentStepData.component
  const totalSteps = filteredSteps.length
  const currentStepIndex = filteredSteps.findIndex(
    (step) => step.step === currentStep
  )

  // console.log("errors", errors)

  return (
    <Container dismissKeyboard>
      {isLoading && <LoadingOverlay visible={isLoading} />}

      <CustomHeader
        back={currentStepIndex > 0}
        content={
          <Progress
            height={14}
            progress={(currentStepIndex / (totalSteps - 1)) * 100}
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
        loading={isLoading}
        size="lg"
        onPress={handleSubmit((data) => onSubmitStep(data, setError))}
        className="absolute bottom-4 left-6 right-6"
      >
        {currentStepIndex === totalSteps - 1 ? "Hoàn thành" : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default SetupUserScreen
