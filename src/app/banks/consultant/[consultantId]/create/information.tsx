import React, { useEffect } from "react"

import { Text } from "react-native"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { Control, Controller, FieldValues } from "react-hook-form"

import {
  Card,
  CardHeader,
  Chip,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"
import { BankCard } from "@/components/global/molecules"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBankById } from "@/hooks/useBank"
import { useGetConsultantBanksByConsultantId } from "@/hooks/useConsultantBank"

import { useBankStore } from "@/stores/bankStore"

interface BankSelectionProps {
  control: Control<FieldValues>
  setValue: any
  errors: any
  onOverlayLoading: (isLoading: boolean) => void
}

function BankInformation({
  control,
  setValue,
  errors,
  onOverlayLoading
}: BankSelectionProps) {
  const { user } = useAuth()
  const consultantId = user?.consultantId

  const { bankId, isDefault, updateField } = useBankStore()

  const { data: consultantBanksData } =
    useGetConsultantBanksByConsultantId(consultantId)

  const { data: bankData } = useGetBankById(bankId)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  const handleDefaultSelect = (value: boolean) => {
    updateField("isDefault", value)
    setValue("isDefault", value)
  }

  return (
    <VStack gap={32} className="px-6">
      <VStack gap={12}>
        {bankData && (
          <BankCard
            name={bankData.name}
            shortName={bankData.shortName}
            logoUrl={bankData.logoUrl}
          />
        )}

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              label="Tên tài khoản"
              placeholder="VD: NGUYEN VAN A"
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
              placeholder="VD: 0123456789"
              onChangeText={onChange}
              canClearText
              errorMessage={errors.number?.message}
            />
          )}
        />
      </VStack>

      {consultantBanksData && consultantBanksData.length > 0 ? (
        <Card activeOpacity={1}>
          <VStack gap={12}>
            <VStack>
              <CardHeader label="Bạn muốn lưu tài khoản này như thế nào?" />

              <Text className="font-tregular text-sm text-accent">
                Chọn "Mặc định" để sử dụng thẻ ngân hàng này làm mặc định hoặc
                "Tùy chỉnh" để chỉ sử dụng khi cần.
              </Text>
            </VStack>

            <HStack gap={12} className="justify-end">
              <Chip
                label="Tùy chỉnh"
                selected={!isDefault}
                onPress={() => handleDefaultSelect(false)}
              />

              <Chip
                label="Mặc định"
                selected={isDefault}
                onPress={() => handleDefaultSelect(true)}
              />
            </HStack>
          </VStack>
        </Card>
      ) : (
        <Text className="text-justify font-tregular text-sm text-accent">
          Tài khoản này sẽ được sử dụng cho tất cả các giao dịch rút tiền của
          bạn, đảm bảo sự thuận tiện và nhanh chóng trong mọi yêu cầu tài chính.
          Hãy chắc chắn rằng thông tin tài khoản của bạn là chính xác.
        </Text>
      )}
    </VStack>
  )
}

export default BankInformation
