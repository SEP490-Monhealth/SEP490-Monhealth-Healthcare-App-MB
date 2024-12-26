import React from "react"

import { Text, View } from "react-native"

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
    setValue,
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
        <VStack gap={20}>
          <Controller
            name="height"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value ? value.toString() : ""}
                placeholder="Nhập chiều cao"
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                keyboardType="numeric"
                endIcon={<Text className="font-tmedium text-primary">Cm</Text>}
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
                endIcon={<Text className="font-tmedium text-primary">Kg</Text>}
                errorMessage={errors.weight?.message}
              />
            )}
          />
          <Button size="lg" onPress={handleSubmit(onSubmit)}>
            Tiếp tục
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default HeightWeightScreen
