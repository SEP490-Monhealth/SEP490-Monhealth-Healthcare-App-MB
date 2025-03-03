import React, { useEffect, useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback
} from "react-native"

import { useRouter } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
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

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import { sampleExpertiseGroupData } from "@/constants/expertise"

import { useAuth } from "@/contexts/AuthContext"

import { certificateSetupSchema } from "@/schemas/certificateSchema"
import { informationConsultantSchema } from "@/schemas/consultantSchema"
import { expertiseSetupSchema } from "@/schemas/expertiseSchema"

import { useConsultantSetupStore } from "@/stores/consultantSetupStore"

import { handleSelectImage, handleUploadImage } from "@/utils/images"

import SetupCertificate from "./certificate"
import SetupExpertise from "./expertise"
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

  const ExpertiseSheetRef = useRef<SheetRefProps>(null)
  const CertificateSheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 500

  const { user } = useAuth()
  const userId = user?.userId

  const {
    bio,
    experience,
    expertise,
    certificate,
    issueDate,
    expiryDate,
    images,
    updateField
  } = useConsultantSetupStore()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [activeSheet, setActiveSheet] = useState<
    "expertise" | "certificate" | null
  >(null)

  const formData: Record<string, any> = {
    userId,
    bio,
    experience,
    expertise,
    certificate,
    issueDate,
    expiryDate,
    images: (images || []).filter((img) => img?.uri).map((img) => img.uri)
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
      fields: ["certificate", "issueDate", "expiryDate", "images"],
      schema: certificateSetupSchema
    }
  ]

  const currentStepData = setupSteps.find((step) => step.step === currentStep)

  if (!currentStepData) return null

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData
  })

  const [selectedGroup, setSelectedGroup] = useState<any | null>(null)

  const openSheet = (
    sheetName: "expertise" | "certificate",
    group: any = null
  ) => {
    setActiveSheet(sheetName)

    if (sheetName === "expertise") {
      setSelectedGroup(group)

      const itemHeight = 90

      const dynamicSheetHeight = Math.min(
        itemHeight * (group?.expertise.length || 1)
      )

      setTimeout(() => {
        ExpertiseSheetRef.current?.scrollTo(-dynamicSheetHeight)
      }, 100)
    } else {
      CertificateSheetRef.current?.scrollTo(-sheetHeight)
    }
  }

  const closeSheet = () => {
    setActiveSheet(null)
    ExpertiseSheetRef.current?.scrollTo(0)
    CertificateSheetRef.current?.scrollTo(0)
  }

  useEffect(() => {
    const imagesUris = images.map((img) => img.uri)
    setValue("images", imagesUris)
  }, [images, setValue])

  const onSubmit = async (data: Record<string, any>) => {
    console.log(`Step Data ${currentStep}:`, data)

    currentStepData.fields.forEach((field) => {
      updateField(field, data[field])
    })

    if (currentStep < setupSteps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Final Data", formData)
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
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

            <StepComponent
              control={control}
              setValue={setValue}
              errors={errors}
              onOpenSheet={openSheet}
            />

            <Button
              size="lg"
              onPress={handleSubmit(onSubmit)}
              className="absolute bottom-4 w-full"
            >
              {currentStep === setupSteps.length ? "Hoàn thành" : "Tiếp tục"}
            </Button>
          </Content>
        </Container>

        <Sheet ref={ExpertiseSheetRef} dynamicHeight={sheetHeight}>
          {activeSheet === "expertise" &&
            selectedGroup?.expertise &&
            selectedGroup.expertise.map(
              (option: { expertiseId: string; name: string }) => (
                <SheetSelect
                  key={option.expertiseId}
                  label={option.name}
                  onPress={() => {
                    setValue("expertise", option.name) 
                    updateField("expertise", option.name)
                    closeSheet()
                  }}
                />
              )
            )}
        </Sheet>

        <Sheet ref={CertificateSheetRef} dynamicHeight={sheetHeight}>
          {activeSheet === "certificate" &&
            DATA.UPLOADS.map((option) => {
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
