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
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import { CustomHeader, StepHeader } from "@/components/global/molecules"

import { sampleCategoriesData } from "@/constants/categories"
import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import { CategoryTypeEnum } from "@/constants/enum/Category"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateUserWorkout } from "@/hooks/useWorkout"

import { createWorkoutSchema } from "@/schemas/workoutSchema"

import { useExerciseItemsStore, useWorkoutStore } from "@/stores/workoutStore"

import ExerciseWorkout from "./exercise"
import WorkoutInformation from "./information"

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

  const { mutate: createWorkout } = useCreateUserWorkout()

  const CategorySheetRef = useRef<SheetRefProps>(null)
  const DifficultyLevelSheetRef = useRef<SheetRefProps>(null)
  const ExerciseSheetRef = useRef<SheetRefProps>(null)

  const [sheetType, setSheetType] = useState<
    "category" | "difficultyLevel" | "exercises"
  >()

  const difficultyLevelSheetHeight = 230
  const exerciseSheetHeight = 180

  const [categorySheetHeight, setCategorySheetHeight] = useState<number>(230)

  const [exerciseIdSelected, setExerciseTypeSelected] = useState<
    string | undefined
  >("")

  const categoryData = sampleCategoriesData.filter(
    (item) => item.type === CategoryTypeEnum.Workout
  )

  const {
    category,
    name,
    description,
    difficultyLevel,
    isPublic,
    exercises,
    updateField
  } = useWorkoutStore()

  const { exercisesSelected, updateType } = useExerciseItemsStore()

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
      component: WorkoutInformation,
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

  if (!currentStepData) {
    setCurrentStep(1)
    return null
  }

  const {
    control,
    setValue,
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
    type: "category" | "difficultyLevel" | "exercises",
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
      case "exercises":
        setExerciseTypeSelected(exerciseId)
        ExerciseSheetRef.current?.scrollTo(-exerciseSheetHeight)
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
          ...useWorkoutStore.getState(),
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
  console.log("Exercises Selected:", exercisesSelected)

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
          {DATA.DIFFICULTY_LEVELS.map((level) => (
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
          {DATA.EXERCISE_TYPES.map((item) => (
            <SheetSelect
              key={item.value}
              label={item.label}
              onPress={() => {
                useExerciseItemsStore.getState().updateType(
                  "exercisesSelected",
                  {
                    exerciseId: exerciseIdSelected,
                    exerciseType: item.value
                  },
                  true
                )
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
