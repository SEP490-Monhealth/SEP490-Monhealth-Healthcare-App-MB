import React from "react"

import { Text, TouchableOpacity, View } from "react-native"
import { SvgUri } from "react-native-svg"

import { Control, Controller, FieldValues } from "react-hook-form"

import {
  Card,
  CardHeader,
  Chip,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"

import { useBankStore, useSelectBankStore } from "@/stores/bankStore"

interface BankSelectionProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
}

function BankInformation({ control, errors, setValue }: BankSelectionProps) {
  const { isDefault, updateField } = useBankStore()

  const { name, shortName, logoUrl } = useSelectBankStore()

  const handleVisibilitySelect = (value: boolean) => {
    updateField("isDefault", value)
    setValue("isDefault", value)
  }

  return (
    <VStack gap={32} className="px-6">
      <VStack gap={12}>
        <Card>
          <HStack center gap={16}>
            <TouchableOpacity
              activeOpacity={1}
              className="h-12 w-12 items-center justify-center rounded-full bg-muted"
            >
              <SvgUri uri={logoUrl} width={24} height={24} />
            </TouchableOpacity>

            <View className="flex-1">
              <Text className="font-tmedium text-base text-primary">
                {shortName}
              </Text>
              <Text className="font-tmedium text-sm text-accent">{name}</Text>
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
              placeholder="VD: 435645776"
              onChangeText={onChange}
              canClearText
              errorMessage={errors.number?.message}
            />
          )}
        />
      </VStack>

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
              onPress={() => handleVisibilitySelect(false)}
            />

            <Chip
              label="Mặc định"
              selected={isDefault}
              onPress={() => handleVisibilitySelect(true)}
            />
          </HStack>
        </VStack>
      </Card>
    </VStack>
  )
}

export default BankInformation
