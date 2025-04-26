import React, { useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useRouter } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "lodash"
import { useForm } from "react-hook-form"

import { Button, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateConsultantBank } from "@/hooks/useConsultantBank"

import { createConsultantBankSchema } from "@/schemas/consultantBankSchema"

import { useBankStore } from "@/stores/bankStore"
import { useWithdrawalRequestStore } from "@/stores/withdrawalRequestStore"

import BankSelection from "./bank"
import BankInformation from "./information"

function BankCreateScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const { mutate: createConsultantBank } = useCreateConsultantBank()

  const { bankId, number, name, isDefault, updateField, reset } = useBankStore()

  const { resetWithdrawalRequest } = useWithdrawalRequestStore()

  const [currentStep, setCurrentStep] = useState(1)
  const [isStepLoading, setIsStepLoading] = useState(false)

  const formData: Record<string, any> = {
    consultantId,
    bankId,
    number,
    name,
    isDefault
  }

  const steps = [
    {
      step: 1,
      title: "Ngân hàng",
      component: BankSelection,
      fields: ["bankId"],
      schema: createConsultantBankSchema.pick({
        bankId: true
      })
    },
    {
      step: 2,
      title: "Thông tin",
      component: BankInformation,
      fields: ["name", "number", "isDefault"],
      schema: createConsultantBankSchema.pick({
        number: true,
        name: true,
        isDefault: true
      })
    }
  ]

  const currentStepData = steps.find((step) => step.step === currentStep)

  if (!currentStepData) {
    setCurrentStep(1)
    return null
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData
  })

  const onSubmitStep = (data: Record<string, any>) => {
    // console.log("Submitted data:", data)
    // console.log("Errors after submit:", errors)

    Object.keys(data).forEach((key) => {
      set(formData, key, data[key])
    })

    Object.keys(data).forEach((key) => {
      const keys = key.split(".")
      if (keys.length > 1) {
        const [parent, child] = keys
        updateField(parent, { ...formData[parent], [child]: data[key] })
      } else {
        updateField(key, data[key])
      }
    })

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      const finalData = {
        ...useBankStore.getState(),
        consultantId: formData.consultantId
      }

      // console.log("Final Form Data:", JSON.stringify(finalData, null, 2))

      createConsultantBank(finalData, {
        onSuccess: () => {
          router.replace(`/banks/consultant/${consultantId}`)
          reset()
          resetWithdrawalRequest()
        }
      })
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full flex-1 bg-background">
        {/* <LoadingOverlay visible={isStepLoading} /> */}

        <View className="px-6">
          <Header back label={currentStepData.title} onBackPress={handleBack} />
        </View>

        <Content className="mt-2 pb-28">
          <StepComponent
            control={control}
            errors={errors}
            setValue={setValue}
            setIsLoading={setIsStepLoading}
          />
        </Content>

        <Button
          onPress={handleSubmit(onSubmitStep)}
          className="absolute bottom-12 left-6 right-6"
        >
          {currentStep === steps.length ? "Thêm mới" : "Tiếp tục"}
        </Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default BankCreateScreen
