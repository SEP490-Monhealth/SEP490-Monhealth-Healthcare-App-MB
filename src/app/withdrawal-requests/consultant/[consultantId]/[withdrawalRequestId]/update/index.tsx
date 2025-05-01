import React, { useEffect } from "react"

import { Keyboard, Text, View } from "react-native"

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
import { BankCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { useGetConsultantBanksByConsultantId } from "@/hooks/useConsultantBank"
import { useGetWalletByConsultantId } from "@/hooks/useWallet"
import {
  useGetWithdrawalRequestById,
  useUpdateWithdrawalRequest
} from "@/hooks/useWithdrawalRequest"

import {
  UpdateWithdrawalRequestType,
  updateWithdrawalRequestSchema
} from "@/schemas/withdrawalRequestSchema"

import { useWithdrawalRequestStore } from "@/stores/withdrawalRequestStore"

import { formatCurrency } from "@/utils/formatters"

function UpdateWithdrawalRequestScreen() {
  const router = useRouter()

  const { consultantId, withdrawalRequestId } = useLocalSearchParams<{
    consultantId: string
    withdrawalRequestId: string
  }>()

  // console.log(withdrawalRequestId)

  const {
    consultantBankId,
    accountNumber,
    name,
    shortName,
    logoUrl,
    updateField
  } = useWithdrawalRequestStore()

  const { mutate: updateWithdrawalRequest } = useUpdateWithdrawalRequest()

  const { data: withdrawalRequestData } =
    useGetWithdrawalRequestById(withdrawalRequestId)
  const { data: walletData } = useGetWalletByConsultantId(consultantId)
  const { data: consultantBanksData } =
    useGetConsultantBanksByConsultantId(consultantId)

  // console.log(JSON.stringify(withdrawalRequestData, null, 2))

  const availableBalance = walletData?.balance || 0

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
      updateField("consultantBankId", withdrawalRequestData.consultantBankId)

      updateField(
        "accountNumber",
        withdrawalRequestData.consultantBank.accountNumber
      )

      updateField("name", withdrawalRequestData.bank.name)
      updateField("shortName", withdrawalRequestData.bank.shortName)
      updateField("logoUrl", withdrawalRequestData.bank.logoUrl)

      setValue("consultantBankId", withdrawalRequestData.consultantBankId)
      setValue("description", withdrawalRequestData.description)
      setValue("amount", withdrawalRequestData.amount)
    }
  }, [withdrawalRequestData, setValue, updateField])

  useEffect(() => {
    if (consultantBankId) {
      setValue("consultantBankId", consultantBankId)
    }
  }, [consultantBankId, setValue])

  const handleViewConsultantBanks = () => {
    if (consultantBanksData?.length === 1) {
      return null
    } else {
      router.push(
        `/withdrawal-requests/consultant/${consultantId}/create/banks`
      )
    }
  }

  const onSubmit = (data: UpdateWithdrawalRequestType) => {
    Keyboard.dismiss()

    const finalData = data

    // console.log(JSON.stringify(finalData, null, 2))

    updateWithdrawalRequest(
      { withdrawalRequestId, updatedData: finalData },
      {
        onSuccess: () => {
          router.back()
        }
      }
    )
  }

  if (!withdrawalRequestData || !walletData || !consultantBanksData)
    return <LoadingScreen />

  return (
    <Container dismissKeyboard>
      <Header back label="Cập nhật" />

      <Content className="mt-2">
        <VStack gap={32}>
          <VStack gap={12}>
            <View>
              <Text className="mb-1 ml-1 font-tregular text-base">
                Ngân hàng
              </Text>
              <BankCard name={name} shortName={shortName} logoUrl={logoUrl} />
            </View>

            <Text className="font-tregular text-sm text-accent">
              Số dư khả dụng: {formatCurrency(availableBalance)}
            </Text>

            <Select
              label="Số tài khoản"
              defaultValue="VD: 2003150599"
              value={
                accountNumber ||
                withdrawalRequestData?.consultantBank.accountNumber
              }
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

          <Button onPress={handleSubmit(onSubmit)}>Cập nhật</Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default UpdateWithdrawalRequestScreen
