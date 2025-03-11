import React, { useEffect, useRef, useState } from "react"

import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback
} from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
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

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import { sampleExpertiseGroupData } from "@/constants/expertise"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateConsultant } from "@/hooks/useConsultant"

import { certificateSetupSchema } from "@/schemas/certificateSchema"
import { informationConsultantSchema } from "@/schemas/consultantSchema"
import { expertiseSetupSchema } from "@/schemas/expertiseSchema"

import { useConsultantStore } from "@/stores/consultantStore"

import { formatUTCDate } from "@/utils/formatters"
import { handleSelectImage, handleUploadImage } from "@/utils/images"

import SetupCertificate from "./certificate"
import SetupExpertise from "./expertise"
import SetupInformation from "./information"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

interface SetupStepsProps {
  step: number
  title: string
  description: string
  component: React.FC<any>
  fields: string[]
  schema: any
}

function SetupConsultantScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const { mutate: createConsultant } = useCreateConsultant()

  const ExpertiseSheetRef = useRef<SheetRefProps>(null)
  const DateSheetRef = useRef<SheetRefProps>(null)
  const UploadSheetRef = useRef<SheetRefProps>(null)

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dateType, setDateType] = useState<"issueDate" | "expiryDate">()
  const [expertiseSheetHeight, setExpertiseSheetHeight] = useState<number>(320)

  const expertiseData =
    sampleExpertiseGroupData.find((group) => group.groupId === selectedGroup)
      ?.expertise || []

  const dateSheetHeight = 300
  const uploadSheetHeight = 200

  const {
    bio,
    experience,
    expertise,
    number,
    certificate,
    issueDate,
    expiryDate,
    issuedBy,
    imageUrls,
    updateField
  } = useConsultantStore()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const formData: Record<string, any> = {
    userId,
    bio,
    experience,
    number,
    expertise,
    certificate,
    issueDate,
    expiryDate,
    issuedBy,
    imageUrls: (imageUrls || []).filter((img) => img?.uri).map((img) => img.uri)
  }

  const setupSteps: SetupStepsProps[] = [
    {
      step: 1,
      title: "Thông tin",
      description: "Nhập giới thiệu bản thân và kinh nghiệm làm việc của bạn",
      component: SetupInformation,
      fields: ["bio", "experience"],
      schema: informationConsultantSchema
    },
    {
      step: 2,
      title: "Chuyên môn",
      description: "Chọn 1 chuyên môn chính bạn sẽ tư vấn",
      component: SetupExpertise,
      fields: ["expertise"],
      schema: expertiseSetupSchema
    },
    {
      step: 3,
      title: "Chứng chỉ",
      description: "Thêm thông tin chứng chỉ và tải lên ảnh chứng chỉ",
      component: SetupCertificate,
      fields: [
        "number",
        "certificate",
        "issueDate",
        "expiryDate",
        "issuedBy",
        "imageUrls"
      ],
      schema: certificateSetupSchema
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
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData
  })

  const handleDateSelect = (_: DateTimePickerEvent, date?: Date) => {
    if (date && dateType) {
      const isoDate = formatUTCDate(date)
      setSelectedDate(date)
      setValue(dateType, isoDate)
    }
  }

  // useEffect(() => {
  //   const imagesUris = imageUrls.map((img) => img.uri)
  //   setValue("imageUrls", imagesUris)
  // }, [imageUrls, setValue])

  useEffect(() => {
    if (imageUrls && imageUrls.length > 0) {
      setValue(
        "imageUrls",
        imageUrls.map((img) => img.uri || img)
      )
    }
  }, [imageUrls, setValue])

  const onSubmit = async (data: Record<string, any>) => {
    setIsLoading(true)

    // console.log(`Step Data ${currentStep}:`, data)

    try {
      currentStepData.fields.forEach((field) => {
        updateField(field, data[field])
      })

      if (currentStep < setupSteps.length) {
        setCurrentStep(currentStep + 1)
      } else {
        console.log("Final Data", data)

        // await new Promise((resolve) => setTimeout(resolve, 2000))
        // createConsultant(data as CreateConsultantType, {
        //   onSuccess: () => {
        //     router.push("/(setup)/completed")
        //   }
        // })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateSheetHeight = (expertiseLength: number) => {
    const minHeight = 160
    const maxHeight = SCREEN_HEIGHT * 0.8
    let itemHeight = 100

    if (expertiseLength === 3) {
      itemHeight = 80
    } else if (expertiseLength >= 4 && expertiseLength <= 5) {
      itemHeight = 70
    } else if (expertiseLength > 5) {
      itemHeight = 60
    }

    return Math.min(
      Math.max(itemHeight * expertiseLength, minHeight),
      maxHeight
    )
  }

  const openExpertiseSheet = (group: string) => {
    setSelectedGroup(group)

    const expertiseList =
      sampleExpertiseGroupData.find((g) => g.groupId === group)?.expertise || []
    const calculatedHeight = calculateSheetHeight(expertiseList.length)

    setExpertiseSheetHeight(calculatedHeight)
    ExpertiseSheetRef.current?.scrollTo(-calculatedHeight)
  }
  const openDateSheet = (inputType: "issueDate" | "expiryDate") => {
    setDateType(inputType)
    DateSheetRef.current?.scrollTo(-dateSheetHeight)
  }
  const openUploadSheet = () =>
    UploadSheetRef.current?.scrollTo(-uploadSheetHeight)

  const closeSheet = () => {
    ExpertiseSheetRef.current?.scrollTo(0)
    DateSheetRef.current?.scrollTo(0)
    UploadSheetRef.current?.scrollTo(0)
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
              openExpertiseSheet={openExpertiseSheet}
              openDateSheet={openDateSheet}
              openUploadSheet={openUploadSheet}
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

        <Sheet ref={ExpertiseSheetRef} dynamicHeight={expertiseSheetHeight}>
          {expertiseData.map((item) => (
            <SheetSelect
              key={item.expertiseId}
              label={item.name}
              onPress={() => {
                setValue("expertise", item.name)
                closeSheet()
              }}
            />
          ))}
        </Sheet>

        <Sheet ref={DateSheetRef} dynamicHeight={dateSheetHeight}>
          <VStack center>
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="spinner"
              minimumDate={
                dateType === "expiryDate" &&
                getValues("issueDate") &&
                !isNaN(new Date(getValues("issueDate")).getTime())
                  ? new Date(getValues("issueDate"))
                  : new Date(1904, 0, 1)
              }
              maximumDate={new Date()}
              onChange={handleDateSelect}
              locale="vi"
            />
          </VStack>
        </Sheet>

        <Sheet ref={UploadSheetRef} dynamicHeight={uploadSheetHeight}>
          {DATA.UPLOADS.map((option) => {
            const Icon = option.icon

            return (
              <SheetSelect
                key={option.value}
                label={option.label}
                icon={
                  <Icon variant="Bold" size={24} color={COLORS.secondary} />
                }
                onPress={() => {
                  closeSheet()
                  handleSelectImage(
                    option.value === "library",
                    handleUploadImage
                  )
                }}
              />
            )
          })}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SetupConsultantScreen
