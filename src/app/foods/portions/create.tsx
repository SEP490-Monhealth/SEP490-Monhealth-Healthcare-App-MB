import React, { useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Content,
  HStack,
  Input,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { PortionType, portionSchema } from "@/schemas/portionSchema"

function PortionCreateScreen() {
  const units = ["g (gram)", "ml (mililit)"]
  const [selectedUnit, setSelectedUnit] = useState("")

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = units.length * 110

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<PortionType>({
    resolver: zodResolver(portionSchema)
  })

  const openSheet = () => {
    SheetRef.current?.scrollTo(-sheetHeight)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  const onUnitSelect = (unit: string) => {
    setSelectedUnit(unit)
    setValue("unit", unit)
    closeSheet()
  }

  const onSubmit = (data: PortionType) => {
    console.log("Submitted Data:", data)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full flex-1 bg-background">
        <View className="flex-1 px-6">
          <Header back label="Thêm khẩu phần" />

          <Content className="mt-2">
            <VStack gap={32}>
              <VStack gap={8}>
                <Controller
                  name="size"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      placeholder="Nhập khẩu phần ăn"
                      onChangeText={onChange}
                      keyboardType="default"
                      errorMessage={errors.size?.message}
                      canClearText
                    />
                  )}
                />

                <HStack center gap={8}>
                  <View style={{ flex: 1 }}>
                    <Controller
                      name="weight"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          value={value ? value.toString() : ""}
                          placeholder="1"
                          onChangeText={(text) =>
                            onChange(parseFloat(text) || 0)
                          }
                          keyboardType="numeric"
                          errorMessage={errors.weight?.message}
                        />
                      )}
                    />
                  </View>

                  <View style={{ flex: 3 }}>
                    <Select
                      defaultValue="Chọn khẩu phần ăn"
                      value={selectedUnit}
                      onPress={openSheet}
                    />
                  </View>
                </HStack>
              </VStack>

              <Button onPress={handleSubmit(onSubmit)}>Thêm mới</Button>
            </VStack>
          </Content>
        </View>

        <Sheet ref={SheetRef}>
          {units.map((unit) => (
            <SheetItem
              key={unit}
              item={unit}
              isSelected={selectedUnit === unit}
              onSelect={() => onUnitSelect(unit)}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PortionCreateScreen
