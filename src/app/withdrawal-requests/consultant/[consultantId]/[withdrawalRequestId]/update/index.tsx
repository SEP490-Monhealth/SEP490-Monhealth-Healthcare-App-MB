import React, { useEffect } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
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

import {
  useGetWithdrawalRequestById,
  useUpdateWithdrawalRequest
} from "@/hooks/useWithdrawalRequest"

import {
  UpdateWithdrawalRequestType,
  updateWithdrawalRequestSchema
} from "@/schemas/withdrawalRequestSchema"

import { useWithdrawalRequestStore } from "@/stores/withdrawalRequestStore"

function UpdateWithdrawalRequestScreen() {
  const router = useRouter()

  const { consultantId, withdrawalRequestId } = useLocalSearchParams<{
    consultantId: string
    withdrawalRequestId: string
  }>()

  const { accountNumber, updateField, reset } = useWithdrawalRequestStore()

  const { mutate: updateWithdrawalRequest } = useUpdateWithdrawalRequest()

  const { data: withdrawalRequestData, isLoading } =
    useGetWithdrawalRequestById(withdrawalRequestId)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateWithdrawalRequestType>({
    resolver: zodResolver(updateWithdrawalRequestSchema)
  })

  useEffect(() => {
    if (withdrawalRequestData) {
      setValue("consultantBankId", withdrawalRequestData.consultantBankId)
      setValue("description", withdrawalRequestData.description)
      setValue("amount", withdrawalRequestData.amount)
    }
  }, [withdrawalRequestData, setValue, updateField])

  const handleViewConsultantBanks = () => {
    router.push(`/withdrawal-requests/consultant/${consultantId}/create/banks`)
  }

  const onSubmit = (data: UpdateWithdrawalRequestType) => {
    Keyboard.dismiss()

    const finalData = data

    // console.log(JSON.stringify(finalData, null, 2))

    updateWithdrawalRequest(
      { withdrawalRequestId, updatedData: finalData },
      {
        onSuccess: () => {
          reset()
          router.back()
        }
      }
    )
  }

  if (!withdrawalRequestData || isLoading) return <LoadingScreen />

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container dismissKeyboard>
          <Header back label="Cập nhật" />

          <Content className="mt-2">
            <VStack gap={32}>
              <VStack gap={8}>
                <Select
                  label="Ngân hàng"
                  defaultValue="VD: 2003150599"
                  value={accountNumber}
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

export default UpdateWithdrawalRequestScreen
