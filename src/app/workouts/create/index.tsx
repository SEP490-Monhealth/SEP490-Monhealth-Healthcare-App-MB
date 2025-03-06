import React, { useEffect, useRef, useState } from "react"

import { Dimensions, Keyboard, SafeAreaView } from "react-native"
import { TouchableWithoutFeedback } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Progress,
  Sheet,
  SheetRefProps,
  SheetSelect
} from "@/components/global/atoms"
import { CustomHeader, StepHeader } from "@/components/global/molecules"

import { sampleCategoriesData } from "@/constants/categories"
import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import { CategoryTypeEnum } from "@/constants/enum/CategoryType"
import { DifficultyLevelEnum } from "@/constants/enum/DifficultyLevel"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateUserWorkout } from "@/hooks/useWorkout"

import { createWorkoutSchema } from "@/schemas/workoutSchema"

import { useCreateWorkoutStore } from "@/stores/workoutStore"

import ExerciseWorkout from "./exercise"
import InformationWorkout from "./information"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

interface SetupStepsProps {
  step: number
  title: string
  description: string
  component: React.FC<any>
  fields: string[]
  schema: any
}

function CreateWorkoutScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const userId = user?.userId
  const { mutate: createConsultant } = useCreateUserWorkout()

  const [sheetType, setSheetType] = useState<
    "category" | "difficultyLevel" | "exercise"
  >()
  const CategorySheetRef = useRef<SheetRefProps>(null)
  const DifficultyLevelSheetRef = useRef<SheetRefProps>(null)
  const ExerciseSheetRef = useRef<SheetRefProps>(null)
  const [categorySheetHeight, setCategorySheetHeight] = useState<number>(230)

  const [exerciseOptionsState, setExerciseOptionsState] = useState<
    Record<string, string>
  >({})

  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null
  )

  const difficultyLevelSheetHeight = 230
  const exerciseSheetHeight = 180

  const categoryData = sampleCategoriesData.filter(
    (item) => item.type === CategoryTypeEnum.Workout
  )

  const difficultyLevelLabels: Record<DifficultyLevelEnum, string> = {
    [DifficultyLevelEnum.Easy]: "Mức dễ",
    [DifficultyLevelEnum.Medium]: "Mức trung bình",
    [DifficultyLevelEnum.Hard]: "Mức khó"
  }

  const exerciseOptions = [
    { label: "Thời gian", value: "duration" },
    { label: "Lần", value: "reps" }
  ]

  const difficultyLevels = Object.values(DifficultyLevelEnum).filter(
    (value): value is DifficultyLevelEnum => typeof value === "number"
  ) as DifficultyLevelEnum[]

  const {
    category,
    name,
    description,
    difficultyLevel,
    isPublic,
    exercises,
    updateField
  } = useCreateWorkoutStore()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const formData = {
    userId,
    category,
    name,
    description,
    difficultyLevel,
    isPublic,
    exercises: exercises || []
  }

  const setupSteps: SetupStepsProps[] = [
    {
      step: 1,
      title: "Thông tin",
      description: "Nhập thông tin chi tiết về bài tập luyện của bạn",
      component: InformationWorkout,
      fields: [
        "category",
        "name",
        "description",
        "difficultyLevel",
        "isPublic"
      ],
      schema: createWorkoutSchema.pick({
        category: true,
        name: true,
        description: true,
        difficultyLevel: true,
        isPublic: true
      })
    },
    {
      step: 2,
      title: "Bài tập",
      description: "Chọn các bài tập có trong bài tập luyện này",
      component: ExerciseWorkout,
      fields: ["exercises"],
      schema: createWorkoutSchema.pick({
        exercises: true
      })
    }
  ]

  const currentStepData = setupSteps.find((step) => step.step === currentStep)

  if (!currentStepData) return null

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData
  })

  useEffect(() => {
    setValue("exercises", exercises || [])
  }, [exercises, setValue])

  const calculateSheetHeight = (categoryLength: number) => {
    const minHeight = 160
    const maxHeight = SCREEN_HEIGHT * 0.8
    let itemHeight = 100

    if (categoryLength === 3) {
      itemHeight = 80
    } else if (categoryLength >= 4 && categoryLength <= 5) {
      itemHeight = 70
    } else if (categoryLength > 5) {
      itemHeight = 60
    }

    return Math.min(Math.max(itemHeight * categoryLength, minHeight), maxHeight)
  }

  const openSheet = (
    type: "category" | "difficultyLevel" | "exercise",
    exerciseId?: string
  ) => {
    setSheetType(type)

    switch (type) {
      case "category":
        const calculatedHeight = calculateSheetHeight(categoryData.length)
        setCategorySheetHeight(calculatedHeight)
        CategorySheetRef.current?.scrollTo(-calculatedHeight)
        break
      case "difficultyLevel":
        DifficultyLevelSheetRef.current?.scrollTo(-difficultyLevelSheetHeight)
        break
      case "exercise":
        ExerciseSheetRef.current?.scrollTo(-exerciseSheetHeight)
        if (exerciseId) {
          setExerciseOptionsState((prev) => ({
            ...prev,
            [exerciseId]: prev[exerciseId] || "duration"
          }))
        }
        break
    }
  }

  const closeSheet = () => {
    if (sheetType === "category") {
      CategorySheetRef.current?.scrollTo(0)
    } else {
      DifficultyLevelSheetRef.current?.scrollTo(0)
      ExerciseSheetRef.current?.scrollTo(0)
    }
  }

  const onSubmit = async (data: Record<string, any>) => {
    setIsLoading(true)

    try {
      console.log("Step Data", currentStep, ":", data)

      currentStepData.fields.forEach((field) => {
        updateField(field, data[field])
      })

      if (currentStep < setupSteps.length) {
        setCurrentStep(currentStep + 1)
      } else {
        const finalData = {
          ...useCreateWorkoutStore.getState(),
          userId: formData.userId,
          exercises: formData.exercises
        }

        console.log("Final Form Data:", JSON.stringify(finalData, null, 2))
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStep === 1) {
      router.back()
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  console.log("Các bài tập đã chọn:", exercises)

  const StepComponent = currentStepData.component

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
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

            <StepComponent
              control={control}
              setValue={setValue}
              errors={errors}
              openSheet={openSheet}
            />

            <Button
              loading={isLoading}
              size="lg"
              onPress={handleSubmit(onSubmit)}
              className="absolute bottom-4 w-full"
            >
              {currentStep === setupSteps.length ? "Hoàn thành" : "Tiếp tục"}
            </Button>
          </Content>
        </Container>

        <Sheet ref={CategorySheetRef} dynamicHeight={categorySheetHeight}>
          {categoryData.map((item) => (
            <SheetSelect
              key={item.categoryId}
              label={item.name}
              onPress={() => {
                setValue("category", item.categoryId)
                updateField("category", item.categoryId)
                closeSheet()
              }}
            />
          ))}
        </Sheet>

        <Sheet
          ref={DifficultyLevelSheetRef}
          dynamicHeight={difficultyLevelSheetHeight}
        >
          {DATA.LEVEL.map((level) => (
            <SheetSelect
              key={level.value}
              label={level.label}
              onPress={() => {
                setValue("difficultyLevel", level.value)
                updateField("difficultyLevel", level.value)
                closeSheet()
              }}
            />
          ))}
        </Sheet>

        <Sheet ref={ExerciseSheetRef} dynamicHeight={exerciseSheetHeight}>
          {exerciseOptions.map((item) => (
            <SheetSelect
              key={item.value}
              label={item.label}
              onPress={() => {
                if (selectedExerciseId) {
                  setExerciseOptionsState((prev) => ({
                    ...prev,
                    [selectedExerciseId]: item.value
                  }))
                }
                closeSheet()
              }}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default CreateWorkoutScreen
