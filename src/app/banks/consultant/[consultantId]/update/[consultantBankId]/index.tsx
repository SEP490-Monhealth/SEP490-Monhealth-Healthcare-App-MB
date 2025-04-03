import React, { useEffect } from "react"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Card,
  Container,
  Content,
  Input,
  VStack
} from "@/components/global/atoms"
import { BankCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import {
  useGetConsultantBankById,
  useUpdateConsultantBank
} from "@/hooks/useConsultantBank"

import {
  UpdateConsultantBankType,
  updateConsultantBankSchema
} from "@/schemas/consultantBankSchema"

const BankUpdateScreen = () => {
  const router = useRouter()
  const { consultantBankId } = useLocalSearchParams<{
    consultantBankId: string
  }>()

  const { mutate: updateConsultantBank } = useUpdateConsultantBank()

  const { data: consultantBankData, isLoading: isConsultantBankLoading } =
    useGetConsultantBankById(consultantBankId)

  console.log(JSON.stringify(consultantBankData, null, 2))

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
      { consultantBankId, updatedData: finalData },
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
          <VStack gap={20}>
            <BankCard
              name={consultantBankData.bank.name}
              shortName={consultantBankData.bank.shortName}
              logoUrl={consultantBankData.bank.logoUrl}
            />

            <VStack gap={8}>
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
          </VStack>

          <Button onPress={handleSubmit(onSubmit)}>Cập nhật</Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default BankUpdateScreen
