import React from "react"

import { Control, Controller, FieldValues } from "react-hook-form"

import { Input, ScrollArea, VStack } from "@/components/global/atoms"

import { formatISODate } from "@/utils/formatters"

interface SetupCertificateProps {
  control: Control<FieldValues>
  errors: any
  openDateSheet: (type: "issueDate" | "expiryDate") => void
}

function SetupCertificate({
  control,
  errors,
  openDateSheet
}: SetupCertificateProps) {
  return (
    <ScrollArea>
      <VStack gap={12}>
        <Controller
          name="number"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              label="Số chứng chỉ"
              placeholder="VD: HCM-00199590"
              onChangeText={onChange}
              canClearText
              errorMessage={errors.number?.message}
            />
          )}
        />

        <Controller
          name="certificate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              label="Tên chứng chỉ"
              placeholder="VD: Chứng chỉ dinh dưỡng cơ bản"
              onChangeText={onChange}
              canClearText
              errorMessage={errors.certificate?.message}
            />
          )}
        />

        <Controller
          name="issueDate"
          control={control}
          render={({ field: { value } }) => (
            <Input
              disabled
              value={value ? formatISODate(value, "dd/MM/yyyy") : ""}
              label="Ngày cấp"
              placeholder="VD: 01/01/2021"
              onPress={() => openDateSheet("issueDate")}
              errorMessage={errors.issueDate?.message}
            />
          )}
        />

        <Controller
          name="expiryDate"
          control={control}
          render={({ field: { value } }) => (
            <Input
              disabled
              value={value ? formatISODate(value, "dd/MM/yyyy") : ""}
              label="Ngày hết hạn"
              placeholder="VD: 01/01/2024"
              onPress={() => openDateSheet("expiryDate")}
              errorMessage={errors.expiryDate?.message}
            />
          )}
        />

        <Controller
          name="issuedBy"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              label="Nơi cấp"
              placeholder="VD: Trường đại học y dược"
              onChangeText={onChange}
              canClearText
              errorMessage={errors.issuedBy?.message}
            />
          )}
        />
      </VStack>
    </ScrollArea>
  )
}

export default SetupCertificate
