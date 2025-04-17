import React, { useEffect } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  Select,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useCreateWithdrawalRequest } from "@/hooks/useWithdrawalRequest"

import {
  CreateWithdrawalRequestType,
  createWithdrawalRequestSchema
} from "@/schemas/withdrawalRequestSchema"

function WithdrawalRequestCreateScreen() {
  const router = useRouter()
  const { consultantId, consultantBankId, accountNumber } =
    useLocalSearchParams<{
      consultantId: string
      consultantBankId?: string
      accountNumber?: string
    }>()

  const { mutate: addWithdrawalRequest } = useCreateWithdrawalRequest()

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateWithdrawalRequestType>({
    resolver: zodResolver(createWithdrawalRequestSchema),
    defaultValues: {
      consultantId: consultantId || "",
      consultantBankId: "",
      description: "",
      amount: 0
    }
  })

  useEffect(() => {
    if (consultantBankId) {
      setValue("consultantBankId", consultantBankId)
    }
  }, [consultantBankId, setValue])

  const onSubmit = (newData: CreateWithdrawalRequestType) => {
    Keyboard.dismiss()

    const finalData = newData

    console.log(JSON.stringify(finalData, null, 2))

    addWithdrawalRequest(finalData, {
      onSuccess: () => {
        router.back()
      }
    })
  }

  const handleViewConsultantBanks = () => {
    router.replace(
      `/withdrawal-requests/consultant/${consultantId}/create/banks`
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container dismissKeyboard>
          <Header back label="Tạo yêu cầu" />

          <Content className="mt-2">
            <VStack gap={32}>
              <VStack gap={8}>
                <Select
                  label="Ngân hàng"
                  defaultValue="VD: 2003150599"
                  value={accountNumber || ""}
                  errorMessage={errors.consultantBankId?.message}
                  onPress={handleViewConsultantBanks}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      label="Mô tả"
                      placeholder="VD: Rút tiền hàng tháng"
                      onChangeText={onChange}
                      canClearText
                      errorMessage={errors.description?.message}
                    />
                  )}
                />

                <Controller
                  name="amount"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value ? value.toString() : ""}
                      label="Số tiền"
                      placeholder="VD: 50.000"
                      onChangeText={(text) => onChange(parseFloat(text) || 0)}
                      keyboardType="numeric"
                      endIcon={
                        <Text className="font-tregular text-sm text-accent">
                          VND
                        </Text>
                      }
                      canClearText
                      alwaysShowEndIcon
                      errorMessage={errors.amount?.message}
                    />
                  )}
                />
              </VStack>

              <Button onPress={handleSubmit(onSubmit)}>Tạo yêu cầu</Button>
            </VStack>
          </Content>
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default WithdrawalRequestCreateScreen
