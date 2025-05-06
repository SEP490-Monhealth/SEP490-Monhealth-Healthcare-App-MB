import React, { useEffect, useRef, useState } from "react"

import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Modal,
  Progress,
  Sheet,
  SheetRefProps,
  SheetSelect
} from "@/components/global/atoms"
import { CustomHeader, StepHeader } from "@/components/global/molecules"

import { DatePickerSheet } from "@/components/local/setup"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateConsultant } from "@/hooks/useConsultant"

import {
  certificateSetupSchema,
  expertiseSetupSchema,
  imageSetupSchema,
  informationSetupSchema
} from "@/schemas/consultantSchema"

import { whoIAm } from "@/services/authService"

import { useConsultantStore } from "@/stores/consultantStore"

import { handleSelectImage, handleUploadImage } from "@/utils/images"

import SetupCertificate from "./certificate"
import SetupExpertise from "./expertise"
import SetupImage from "./images"
import SetupInformation from "./information"

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

  const { user, setUser } = useAuth()
  const userId = user?.userId

  const { mutate: createConsultant } = useCreateConsultant()

  const ExpertiseSheetRef = useRef<SheetRefProps>(null)
  const IssueDateSheetRef = useRef<SheetRefProps>(null)
  const ExpiryDateSheetRef = useRef<SheetRefProps>(null)
  const UploadSheetRef = useRef<SheetRefProps>(null)

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [, setDateType] = useState<"issueDate" | "expiryDate">("issueDate")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)

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
    imageUrls: (imageUrls || [])
      .filter((img) => !img.deleting && !img.uploading)
      .map((img) => (typeof img === "string" ? img : img.uri))
  }

  const setupSteps: SetupStepsProps[] = [
    {
      step: 1,
      title: "Thông tin",
      description: "Giới thiệu bản thân và kinh nghiệm làm việc của bạn",
      component: SetupInformation,
      fields: ["bio", "experience"],
      schema: informationSetupSchema
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
      fields: ["number", "certificate", "issueDate", "expiryDate", "issuedBy"],
      schema: certificateSetupSchema
    },
    {
      step: 4,
      title: "Hình ảnh",
      description: "Tải lên hình ảnh chứng chỉ của bạn để hoàn tất hồ sơ",
      component: SetupImage,
      fields: ["imageUrls"],
      schema: imageSetupSchema
    }
    // {
    //   step: 5,
    //   title: "Cuộc họp",
    //   description: "Thêm đường dẫn cuộc họp của bạn để tư vấn trực tuyến",
    //   component: SetupMeeting,
    //   fields: ["meetUrl"],
    //   schema: meetingSetupSchema
    // }
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

  const handleDateChange = (type: "issueDate" | "expiryDate", date: string) => {
    try {
      if (date && date.trim() !== "") {
        const parsedDate = new Date(date)
        if (!isNaN(parsedDate.getTime())) {
          setValue(type, date)

          if (type === "issueDate") {
            const expiryDateValue = getValues("expiryDate")
            if (expiryDateValue && new Date(date) > new Date(expiryDateValue)) {
              setValue("expiryDate", "")
            }
          }
        } else {
          console.warn(`Invalid date format received: ${date}`)
        }
      }
    } catch (error) {
      console.error(`Error processing ${type} date:`, error)
    }

    closeSheet()
  }

  const openDateSheet = (type: "issueDate" | "expiryDate") => {
    setDateType(type)

    const currentValue = getValues(type)
    let initialDate = new Date()

    if (
      currentValue &&
      typeof currentValue === "string" &&
      currentValue.trim() !== ""
    ) {
      try {
        const parsedDate = new Date(currentValue)
        if (!isNaN(parsedDate.getTime())) {
          initialDate = parsedDate
        }
      } catch (error) {
        console.warn(`Error parsing ${type} date:`, error)
      }
    }

    setSelectedDate(initialDate)

    if (type === "issueDate") {
      IssueDateSheetRef.current?.scrollTo(-dateSheetHeight)
    } else {
      ExpiryDateSheetRef.current?.scrollTo(-dateSheetHeight)
    }
  }

  const openUploadSheet = () =>
    UploadSheetRef.current?.scrollTo(-uploadSheetHeight)

  const closeSheet = () => {
    ExpertiseSheetRef.current?.scrollTo(0)
    IssueDateSheetRef.current?.scrollTo(0)
    ExpiryDateSheetRef.current?.scrollTo(0)
    UploadSheetRef.current?.scrollTo(0)
  }

  useEffect(() => {
    if (currentStep === 4 && imageUrls) {
      const imageUris = imageUrls
        .filter((img) => !img.deleting && !img.uploading)
        .map((img) => (typeof img === "string" ? img : img.uri))

      setValue("imageUrls", imageUris)
    }
  }, [currentStep, imageUrls, setValue])

  const handleNextStep = (data: Record<string, any>) => {
    currentStepData.fields.forEach((field) => {
      updateField(field, data[field])
    })

    // console.log(`Completed Step ${currentStep} with data:`, data)

    if (currentStep < setupSteps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsModalVisible(true)
    }
  }

  const handleBack = () => {
    if (currentStep === 1) {
      router.back()
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  // console.log(errors)

  const handleSubmission = () => {
    setIsLoading(true)

    try {
      const finalImageUrls = useConsultantStore
        .getState()
        .imageUrls.filter((img) => !img.deleting && !img.uploading)

      let imageUris: string[] = []
      finalImageUrls.forEach((img) => {
        if (typeof img === "string") {
          imageUris.push(img)
        } else if (
          img &&
          typeof img === "object" &&
          "uri" in img &&
          typeof img.uri === "string"
        ) {
          imageUris.push(img.uri)
        } else {
          console.warn("Unexpected image value:", img)
        }
      })

      const {
        bio,
        experience,
        expertise,
        number,
        certificate,
        issueDate,
        expiryDate,
        issuedBy
      } = useConsultantStore.getState()

      const finalData = {
        userId,
        bio,
        experience,
        expertise,
        number,
        certificate,
        issueDate,
        expiryDate,
        issuedBy,
        imageUrls: imageUris
      }

      // console.log(JSON.stringify(finalData, null, 2))

      // @ts-ignore
      createConsultant(finalData, {
        onSuccess: async () => {
          const updatedUser = await whoIAm()
          setUser(updatedUser)
          router.replace({
            pathname: "/(setup)/completed",
            params: { type: "consultant" }
          })
        }
      })
    } catch (error) {
      console.error("Error during API submission:", error)
      setIsLoading(false)
    }
  }

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

          <Content className="mt-2 pb-28">
            <StepHeader
              title={currentStepData.title}
              description={currentStepData.description}
            />

            <StepComponent
              control={control}
              setValue={setValue}
              errors={errors}
              openDateSheet={openDateSheet}
              openUploadSheet={openUploadSheet}
            />

            <Button
              loading={isLoading}
              size="lg"
              onPress={handleSubmit(handleNextStep)}
              className="absolute bottom-4 w-full"
            >
              {currentStep === setupSteps.length ? "Hoàn thành" : "Tiếp tục"}
            </Button>
          </Content>
        </Container>

        <Sheet ref={IssueDateSheetRef} dynamicHeight={dateSheetHeight}>
          <DatePickerSheet
            selectedDate={selectedDate}
            dateType="issueDate"
            onDateChange={handleDateChange}
          />
        </Sheet>

        <Sheet ref={ExpiryDateSheetRef} dynamicHeight={dateSheetHeight}>
          <DatePickerSheet
            selectedDate={selectedDate}
            dateType="expiryDate"
            minDate={
              getValues("issueDate")
                ? new Date(getValues("issueDate"))
                : undefined
            }
            onDateChange={handleDateChange}
          />
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

        <Modal
          isVisible={isModalVisible}
          title="Hoàn tất"
          description="Thông tin của bạn đang được xác nhận. Vui lòng chờ thông báo từ hệ thống"
          cancelText="Hủy"
          confirmText="Đồng ý"
          onConfirm={() => {
            handleSubmission()
          }}
          onClose={() => setIsModalVisible(false)}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SetupConsultantScreen
