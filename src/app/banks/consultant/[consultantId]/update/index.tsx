import React, { useEffect } from "react"

import { Text, TouchableOpacity, View } from "react-native"
import { SvgUri } from "react-native-svg"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Badge,
  Button,
  Card,
  Container,
  Content,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import {
  useGetConsultantBankById,
  useUpdateConsultantBank
} from "@/hooks/useConsultantBank"

import {
  UpdateConsultantBankType,
  updateConsultantBankSchema
} from "@/schemas/consultantBankSchema"

import { formatDate } from "@/utils/formatters"

const BankUpdateScreen = () => {
  const router = useRouter()
  const { consultantBankId } = useLocalSearchParams() as {
    consultantBankId?: string
  }

  const { data: consultantBankData, isLoading: isConsultantBankLoading } =
    useGetConsultantBankById(consultantBankId)
  const { mutate: updateConsultantBank } = useUpdateConsultantBank()

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateConsultantBankType>({
    resolver: zodResolver(updateConsultantBankSchema),
    defaultValues: {
      number: consultantBankData?.number,
      name: consultantBankData?.name
    }
  })

  useEffect(() => {
    if (consultantBankData) {
      setValue("number", consultantBankData.number)
      setValue("name", consultantBankData.name)
    }
  }, [consultantBankData, setValue])

  const onSubmit = (newData: UpdateConsultantBankType) => {
    const finalData = newData

    // console.log(JSON.stringify(finalData, null, 2))

    updateConsultantBank(
      { consultantBankId, consultantBankData: finalData },
      {
        onSuccess: () => {
          router.back()
        }
      }
    )
  }

  if (!consultantBankData || isConsultantBankLoading) {
    return <LoadingScreen />
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Cập nhật ngân hàng" />

      <Content className="mt-2">
        <VStack gap={32}>
          <VStack gap={8}>
            <Card>
              <HStack center gap={16}>
                <TouchableOpacity
                  activeOpacity={1}
                  className="h-12 w-12 items-center justify-center rounded-full bg-muted"
                >
                  <SvgUri
                    uri={consultantBankData.bank.logoUrl}
                    width={24}
                    height={24}
                  />
                </TouchableOpacity>

                <View className="flex-1">
                  <HStack center className="justify-between">
                    <Text className="font-tmedium text-base text-primary">
                      {consultantBankData.bank.shortName}
                    </Text>
                    {consultantBankData.isDefault && <Badge label="Mặc định" />}
                  </HStack>

                  <Text className="font-tmedium text-sm text-accent">
                    Ngày tạo: {formatDate(consultantBankData.createdAt)}
                  </Text>
                </View>
              </HStack>
            </Card>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Tên tài khoản"
                  placeholder="VD: Nguyễn Văn A"
                  defaultValue=""
                  onChangeText={onChange}
                  canClearText
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="number"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Số tài khoản"
                  placeholder="VD: 34588239012"
                  onChangeText={onChange}
                  canClearText
                  errorMessage={errors.number?.message}
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

export default BankUpdateScreen
