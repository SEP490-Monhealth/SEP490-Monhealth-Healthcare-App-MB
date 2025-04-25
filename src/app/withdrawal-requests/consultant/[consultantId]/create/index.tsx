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
import { useCreateWithdrawalRequest } from "@/hooks/useWithdrawalRequest"

import {
  CreateWithdrawalRequestType,
  createWithdrawalRequestSchema
} from "@/schemas/withdrawalRequestSchema"

import { useWithdrawalRequestStore } from "@/stores/withdrawalRequestStore"

function WithdrawalRequestCreateScreen() {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const {
    consultantBankId,
    accountNumber,
    name,
    shortName,
    logoUrl,
    updateField,
    resetWithdrawalRequest
  } = useWithdrawalRequestStore()

  const { data: consultantBanksData } =
    useGetConsultantBanksByConsultantId(consultantId)

  const { mutate: addWithdrawalRequest } = useCreateWithdrawalRequest()

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateWithdrawalRequestType>({
    resolver: zodResolver(createWithdrawalRequestSchema)
  })

  useEffect(() => {
    setValue("consultantId", consultantId)
    setValue("consultantBankId", consultantBankId)
  }, [consultantId, consultantBankId])

  useEffect(() => {
    if (consultantBanksData?.length === 1) {
      updateField("accountNumber", consultantBanksData[0].number)
      setValue("consultantBankId", consultantBanksData[0].consultantBankId)

      updateField("name", consultantBanksData[0].bank.name)
      updateField("shortName", consultantBanksData[0].bank.shortName)
      updateField("logoUrl", consultantBanksData[0].bank.logoUrl)
    }
  }, [
    consultantId,
    consultantBankId,
    name,
    shortName,
    logoUrl,
    consultantBanksData
  ])

  const onSubmit = (newData: CreateWithdrawalRequestType) => {
    Keyboard.dismiss()

    const finalData = newData

    // console.log(JSON.stringify(finalData, null, 2))

    addWithdrawalRequest(finalData, {
      onSuccess: () => {
        resetWithdrawalRequest()
        router.back()
      }
    })
  }

  const handleViewConsultantBanks = () => {
    if (consultantBanksData?.length === 1) {
      return null
    } else {
      router.push(
        `/withdrawal-requests/consultant/${consultantId}/create/banks`
      )
    }
  }

  if (!consultantBanksData) {
    return <LoadingScreen />
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container dismissKeyboard>
          <Header back label="Tạo yêu cầu" />

          <Content className="mt-2">
            <VStack gap={32}>
              <VStack gap={8}>
                {accountNumber && (
                  <Card>
                    <HStack center>
                      <TouchableOpacity
                        activeOpacity={1}
                        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
                      >
                        <SvgUri uri={logoUrl} width={24} height={24} />
                      </TouchableOpacity>

                      <VStack>
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
                      </VStack>
                    </HStack>
                  </Card>
                )}

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
