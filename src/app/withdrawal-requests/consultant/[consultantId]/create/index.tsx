import React, { useEffect, useMemo, useRef, useState } from "react"

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Chip,
  Container,
  Content,
  HStack,
  Input,
  Modal,
  Select,
  VStack
} from "@/components/global/atoms"
import { BankCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { useGetConsultantBanksByConsultantId } from "@/hooks/useConsultantBank"
import { useGetWalletByConsultantId } from "@/hooks/useWallet"
import { useCreateWithdrawalRequest } from "@/hooks/useWithdrawalRequest"

import {
  CreateWithdrawalRequestType,
  createWithdrawalRequestSchema
} from "@/schemas/withdrawalRequestSchema"

import { useWithdrawalRequestStore } from "@/stores/withdrawalRequestStore"

import { formatCurrency, formatCurrencyWithoutSymbol } from "@/utils/formatters"

function WithdrawalRequestCreateScreen() {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const scrollViewRef = useRef<ScrollView>(null)

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {
    consultantBankId,
    accountNumber,
    name,
    shortName,
    logoUrl,
    updateField
  } = useWithdrawalRequestStore()

  const { mutate: addWithdrawalRequest } = useCreateWithdrawalRequest()

  const { data: walletData } = useGetWalletByConsultantId(consultantId)
  const { data: consultantBanksData } =
    useGetConsultantBanksByConsultantId(consultantId)

  const availableBalance = walletData?.balance || 0
  const defaultConsultantBank = consultantBanksData?.find(
    (bank) => bank.isDefault === true
  )

  const quickAmountOptions = useMemo(() => {
    const baseOptions = [100000, 200000, 500000, 1000000]
    return baseOptions.filter((amount) => amount <= availableBalance)
  }, [availableBalance])

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
    setValue(
      "consultantBankId",
      consultantBankId || defaultConsultantBank?.consultantBankId || ""
    )
  }, [consultantId, consultantBankId, defaultConsultantBank, setValue])

  useEffect(() => {
    setIsLoading(false)

    if (consultantBanksData?.length === 0) {
      setIsModalVisible(true)
    } else if (defaultConsultantBank && !consultantBankId) {
      setValue("consultantBankId", defaultConsultantBank.consultantBankId)
      updateField("consultantBankId", defaultConsultantBank.consultantBankId)
      updateField("accountNumber", defaultConsultantBank.number)
      updateField("name", defaultConsultantBank.bank.name)
      updateField("shortName", defaultConsultantBank.bank.shortName)
      updateField("logoUrl", defaultConsultantBank.bank.logoUrl)
    }
  }, [
    consultantBanksData,
    consultantBankId,
    defaultConsultantBank,
    updateField,
    setValue
  ])

  const onSubmit = (newData: CreateWithdrawalRequestType) => {
    Keyboard.dismiss()

    const finalData = newData

    // console.log(JSON.stringify(finalData, null, 2))

    addWithdrawalRequest(finalData, {
      onSuccess: () => {
        router.back()
      }
    })
  }

  const handleViewConsultantBanks = () => {
    if (consultantBanksData?.length !== 1) {
      router.push(
        `/withdrawal-requests/consultant/${consultantId}/create/banks`
      )
    }
  }

  const handleConfirmAction = () => {
    setIsModalVisible(false)
    router.push(`/banks/consultant/${consultantId}`)
  }

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 50)
  }

  if (!walletData || !consultantBanksData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container dismissKeyboard>
        <Header back label="Tạo yêu cầu" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
        >
          <Content className="mt-2">
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 60 }}
            >
              <VStack gap={32}>
                <VStack gap={12}>
                  <View>
                    <Text className="mb-1 ml-1 font-tregular text-base">
                      Ngân hàng
                    </Text>

                    {accountNumber && (
                      <BankCard
                        name={name}
                        shortName={shortName}
                        logoUrl={logoUrl}
                      />
                    )}
                  </View>

                  <Text className="font-tregular text-sm text-accent">
                    Số dư khả dụng: {formatCurrency(availableBalance)}
                  </Text>

                  <Select
                    label="Số tài khoản"
                    defaultValue="VD: 1234567890"
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
                        onFocus={scrollToInput}
                      />
                    )}
                  />

                  <Controller
                    name="amount"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <VStack gap={12}>
                        <Input
                          value={value ? value.toString() : ""}
                          label="Số tiền"
                          placeholder="VD: 50.000"
                          onChangeText={(text) =>
                            onChange(parseFloat(text) || 0)
                          }
                          keyboardType="numeric"
                          endIcon={
                            <Text className="font-tregular text-sm text-accent">
                              VND
                            </Text>
                          }
                          canClearText
                          alwaysShowEndIcon
                          errorMessage={errors.amount?.message}
                          onFocus={scrollToInput}
                        />

                        <HStack gap={8} className="flex-wrap">
                          {quickAmountOptions.map((amount) => (
                            <Chip
                              key={amount}
                              label={formatCurrencyWithoutSymbol(amount)}
                              selected={value === amount}
                              onPress={() => onChange(amount)}
                            />
                          ))}
                        </HStack>
                      </VStack>
                    )}
                  />
                </VStack>

                <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
                  {!isLoading && "Tạo yêu cầu"}
                </Button>
              </VStack>
            </ScrollView>
          </Content>
        </KeyboardAvoidingView>
      </Container>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Cảnh báo"
        description="Bạn chưa có ngân hàng nào. Vui lòng thêm ngân hàng trước khi tạo yêu cầu rút tiền."
        confirmText="Đồng ý"
        onConfirm={handleConfirmAction}
      />
    </>
  )
}

export default WithdrawalRequestCreateScreen
