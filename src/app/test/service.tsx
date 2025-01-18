import React, { useState } from "react"

import { Text } from "react-native"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  VStack
} from "@/components/global/atoms"
import { StepHeader } from "@/components/global/molecules"

import {
  CreateUpdateServiceType,
  createUpdateServiceSchema
} from "@/schemas/serviceSchema"

function ServiceScreen() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUpdateServiceType>({
    resolver: zodResolver(createUpdateServiceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0
    }
  })

  const onSubmit = async (serviceData: CreateUpdateServiceType) => {
    setIsLoading(true)

    console.log(serviceData)

    setIsLoading(false)
  }

  return (
    <Container dismissKeyboard>
      <Content className="mt-2">
        <StepHeader
          title="Thiết lập thông tin dịch vụ"
          description="Nhập thông tin về dịch vụ bạn cung cấp để người dùng có thể tìm thấy bạn dễ dàng hơn"
        />

        <VStack gap={12} className="mt-8">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="Nhập tên dịch vụ"
                onChangeText={onChange}
                keyboardType="default"
                canClearText
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="Mô tả chi tiết về dịch vụ mà bạn cung cấp"
                onChangeText={onChange}
                keyboardType="default"
                numberOfLines={5}
                isMultiline
                canClearText
                errorMessage={errors.description?.message}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value ? value.toString() : ""}
                placeholder="Nhập giá dịch vụ"
                onChangeText={(text) => {
                  const numericValue = text ? parseFloat(text) : 0
                  onChange(numericValue)
                }}
                keyboardType="numeric"
                endIcon={
                  <Text className="font-tregular text-sm text-accent">
                    VND/giờ
                  </Text>
                }
                canClearText
                errorMessage={errors.price?.message}
              />
            )}
          />

          <Button
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
            className="mt-8"
          >
            {!isLoading && "Gửi yêu cầu phê duyệt"}
          </Button>

          <Text className="mt-4 text-center font-tregular text-primary">
            *Vui lòng kiểm tra kĩ thông tin trước khi gửi. Chúng tôi sẽ phê
            duyệt trong 24-48 giờ
          </Text>
        </VStack>
      </Content>
    </Container>
  )
}

export default ServiceScreen
