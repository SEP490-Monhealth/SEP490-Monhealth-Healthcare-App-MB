import React from "react"

import { Text } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
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
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { mutate: addWithdrawalRequest } = useCreateWithdrawalRequest()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateWithdrawalRequestType>({
    resolver: zodResolver(createWithdrawalRequestSchema),
    defaultValues: {
      consultantId: consultantId || "",
      description: "",
      amount: 0
    }
  })

  const onSubmit = (newData: CreateWithdrawalRequestType) => {
    const finalData = newData

    // console.log(JSON.stringify(finalData, null, 2))

    addWithdrawalRequest(finalData, {
      onSuccess: () => {
        router.replace(`/withdrawal-requests/consultant/${consultantId}`)
      }
    })
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Thêm yêu cầu" />

      <Content className="mt-2">
        <VStack gap={32}>
          <VStack gap={8}>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Mô tả yêu cầu"
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
  )
}

export default WithdrawalRequestCreateScreen
