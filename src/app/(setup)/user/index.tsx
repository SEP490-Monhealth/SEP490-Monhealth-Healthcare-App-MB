import React, { useEffect, useState } from "react"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
      description:
        "Nhập chiều cao và cân nặng hiện tại để tính chỉ số BMI và nhu cầu dinh dưỡng của bạn",
      component: SetupHeightWeight,
      fields: ["height", "weight"],
      schema: heightWeightSetupSchema
    },
    {
      title: "Hoạt động",
      description:
        "Chọn mức độ vận động hàng ngày để chúng tôi có thể tính toán nhu cầu calo phù hợp cho bạn",
      component: SetupActivityLevel,
      fields: ["activityLevel"],
      schema: activityLevelSetupSchema
    },
    {
      title: "Mục tiêu",
      description:
        "Bạn muốn giảm cân, duy trì cân nặng hiện tại, hay tăng cân?",
      component: SetupGoalType,
      fields: ["goalType"],
      schema: goalTypeSetupSchema
    },
    {
      title: "Cân nặng mục tiêu",
      description:
        "Dựa trên chiều cao và giới tính của bạn, hệ thống gợi ý cân nặng phù hợp",
      component: SetupWeightGoal,
      fields: ["weightGoal"],
      schema: weightGoalSetupSchema
    }
  ]

  let stepsWithGoalType = [...baseSteps]

  if (goalType !== GoalTypeEnum.Maintenance) {
    stepsWithGoalType.push({
      title:
        goalType === GoalTypeEnum.WeightLoss
          ? "Tốc độ giảm cân"
          : "Tốc độ tăng cân",
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
    description:
      "Chọn các thực phẩm bạn bị dị ứng để chúng tôi loại bỏ khỏi chế độ ăn của bạn",
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

    if (weight !== null) {
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
    }

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
    if (currentStep === 1) {
      router.back()
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const StepComponent = currentStepData.component

  // console.log(errors)

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
        loading={isLoading}
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
