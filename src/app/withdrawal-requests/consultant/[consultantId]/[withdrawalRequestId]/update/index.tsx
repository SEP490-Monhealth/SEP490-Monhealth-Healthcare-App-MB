import React, { useEffect } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"
import { SvgUri } from "react-native-svg"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Card,
  Container,
  Content,
  HStack,
  Input,
  Select,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useGetConsultantBanksByConsultantId } from "@/hooks/useConsultantBank"
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

  // console.log(withdrawalRequestId)

  const {
    consultantBankId,
    accountNumber,
    name,
    shortName,
    logoUrl,
    updateField,
    resetWithdrawalRequest
  } = useWithdrawalRequestStore()

  const { mutate: updateWithdrawalRequest } = useUpdateWithdrawalRequest()

  const { data: withdrawalRequestData, isLoading: isLoadingWithdrawalRequest } =
    useGetWithdrawalRequestById(withdrawalRequestId)

  const { data: consultantBanksData, isLoading: isLoadingConsultantBanksData } =
    useGetConsultantBanksByConsultantId(consultantId)

  // console.log(JSON.stringify(withdrawalRequestData, null, 2))

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
          resetWithdrawalRequest()
          router.back()
        }
      }
    )
  }

  if (
    !withdrawalRequestData ||
    isLoadingWithdrawalRequest ||
    !consultantBanksData ||
    isLoadingConsultantBanksData
  )
    return <LoadingScreen />

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container dismissKeyboard>
          <Header back label="Cập nhật" />

          <Content className="mt-2">
            <VStack gap={32}>
              <VStack gap={8}>
                <Card>
                  <HStack center>
                    <TouchableOpacity
                      activeOpacity={1}
                      className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
                    >
                      <SvgUri uri={logoUrl} width={24} height={24} />
                    </TouchableOpacity>

                    <View className="flex-1">
                      <Text className="font-tmedium text-base text-primary">
                        {shortName}
                      </Text>

                      <Text
                        className="font-tmedium text-sm text-accent"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {name}
                      </Text>
                    </View>
                  </HStack>
                </Card>

                <Select
                  label="Ngân hàng"
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default UpdateWithdrawalRequestScreen
