import React, { useState } from "react"

import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from "react-native"

import { useRouter } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button, Container, Content, Progress } from "@/components/global/atoms"
import { CustomHeader, StepHeader } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { certificateSetupSchema } from "@/schemas/certificateSchema"
import { informationConsultantSchema } from "@/schemas/consultantSchema"
import { expertiseSetupSchema } from "@/schemas/expertiseSchema"

import { useConsultantSetupStore } from "@/stores/consultantSetupStore"

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

  const formData: Record<string, any> = {
    userId,
    bio,
    experience,
    expertise,
    certificate,
    issueDate,
    expiryDate,
    images
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

  if (!currentStepData) {
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

  // console.log(errors)

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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SetupConsultantScreen
