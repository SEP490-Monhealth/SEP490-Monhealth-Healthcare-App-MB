import React from "react"

import { Text, View } from "react-native"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { CreatePortionType, portionSchema } from "@/schemas/portionSchema"

function ActivityScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePortionType>({
    resolver: zodResolver(portionSchema),
    defaultValues: {
      portionSize: "",
      portionWeight: 0,
      measurementUnit: ""
    }
  })

  const onSubmit = (data: CreatePortionType) => {
    // setIsLoading(true)
    console.log(data)
  }

  return (
    <Container className="flex-1 justify-between">
      <Content>
        <Header title="Tạo khẩu phần" />
        <VStack gap={8}>
          <Controller
            name="portionSize"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nhập khẩu phần ăn"
                keyboardType="default"
                errorMessage={errors.portionSize?.message}
                clearText={false}
              />
            )}
          />
          <HStack center gap={8}>
            <View style={{ flex: 1 }}>
              <Controller
                name="portionWeight"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value ? String(value) : ""}
                    onChangeText={(text) => onChange(Number(text) || 0)}
                    placeholder="0"
                    keyboardType="phone-pad"
                    errorMessage={errors.portionWeight?.message}
                    clearText={false}
                  />
                )}
              />
            </View>

            <View style={{ flex: 4 }}>
              <Controller
                name="measurementUnit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Đơn vị đo lường"
                    keyboardType="default"
                    errorMessage={errors.measurementUnit?.message}
                    clearText={false}
                  />
                )}
              />
            </View>
          </HStack>
        </VStack>
      </Content>

      <Button
        size="lg"
        onPress={handleSubmit(onSubmit)}
        className="absolute bottom-4 left-6 right-6 w-full"
      >
        Tiếp tục
      </Button>
    </Container>
  )
}

export default ActivityScreen
