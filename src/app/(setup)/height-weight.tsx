import React from "react"

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
import { Header } from "@/components/global/organisms"

import {
  CreateHeightWeightMetricType,
  createHeightWeightMetricSchema
} from "@/schemas/metricSchema"

function HeightWeightScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateHeightWeightMetricType>({
    resolver: zodResolver(createHeightWeightMetricSchema)
  })

  const onSubmit = (data: CreateHeightWeightMetricType) => {
    console.log(data)
  }

  return (
    <Container>
      <Header back label="Thông tin" />

      <Content>
        <VStack gap={32} className="mt-2">
          <VStack gap={12}>
            <Controller
              name="height"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value ? value.toString() : ""}
                  placeholder="Nhập chiều cao"
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                  keyboardType="numeric"
                  endIcon={
                    <Text className="font-tmedium text-base text-primary">
                      cm
                    </Text>
                  }
                  canClearText
                  errorMessage={errors.height?.message}
                />
              )}
            />

            <Controller
              name="weight"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value ? value.toString() : ""}
                  placeholder="Nhập cân nặng"
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                  keyboardType="numeric"
                  endIcon={
                    <Text className="font-tmedium text-base text-primary">
                      kg
                    </Text>
                  }
                  canClearText
                  errorMessage={errors.weight?.message}
                />
              )}
            />
          </VStack>

          <Button size="lg" onPress={handleSubmit(onSubmit)}>
            Tiếp tục
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default HeightWeightScreen
