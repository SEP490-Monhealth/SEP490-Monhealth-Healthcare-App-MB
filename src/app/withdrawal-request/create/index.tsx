import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

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

import { useAuth } from "@/contexts/AuthContext"

import { useCreateWithdrawalRequest } from "@/hooks/useWithdrawalRequest"

import {
  CreateWithdrawalRequestType,
  createWithdrawalRequestSchema
} from "@/schemas/withdrawalRequestSchema"

function WithdrawalRequestCreateScreen() {
  const { user } = useAuth()
  const consultantId = user?.consultantId

  const router = useRouter()

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

  const onSubmit = (newWithdrawalRequestData: CreateWithdrawalRequestType) => {
    const finalData = { ...newWithdrawalRequestData }

    // console.log(JSON.stringify(finalData, null, 2))

    addWithdrawalRequest(finalData, {
      onSuccess: () => {
        router.replace("/withdrawal-request")
      }
    })
  }
  return (
    <Container dismissKeyboard>
      <Header back label="Tạo yêu cầu rút tiền" />
      <Content className="mt-2">
        <VStack gap={32}>
          <VStack gap={12}>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Mô tả yêu cầu"
                  placeholder="VD: Rút tiền"
                  onChangeText={onChange}
                  canClearText
                  errorMessage={errors.description?.message}
                  className="w-full"
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
                  className="w-full"
                />
              )}
            />
          </VStack>
        </VStack>
      </Content>
      <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
        Tạo yêu cầu
      </Button>
    </Container>
  )
}

export default WithdrawalRequestCreateScreen
