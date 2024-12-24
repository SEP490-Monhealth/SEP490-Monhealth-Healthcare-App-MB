import React, { useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
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
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { PortionType, portionSchema } from "@/schemas/portionSchema"

function PortionCreateScreen() {
  const [selectedUnit, setSelectedUnit] = useState("g")

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<PortionType>({
    resolver: zodResolver(portionSchema),
    defaultValues: {
      portionSize: "1 phần",
      portionWeight: 100,
      measurementUnit: "g"
    }
  })

  const SheetRef = useRef<SheetRefProps>(null)

  const openSheet = () => {
    SheetRef.current?.scrollTo(-200)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  const onUnitSelect = (unit: string) => {
    setSelectedUnit(unit)
    setValue("measurementUnit", unit)
    closeSheet()
  }

  const onSubmit = (data: PortionType) => {
    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full bg-background">
        <View className="px-6">
          <Header back title="Thêm khẩu phần" />

          <Content>
            <VStack gap={20} className="mt-2">
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
                          value={value.toString()}
                          onChangeText={(text) =>
                            onChange(parseFloat(text) || 0)
                          }
                          placeholder="1"
                          keyboardType="numeric"
                          clearText={false}
                          errorMessage={errors.portionWeight?.message}
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

              <Button size="lg" onPress={handleSubmit(onSubmit)}>
                Thêm mới
              </Button>
            </VStack>
          </Content>
        </View>

        <Sheet ref={SheetRef}>
          <TouchableOpacity onPress={() => onUnitSelect("g")}>
            <Text
              className={`py-2 ${selectedUnit === "g" ? "text-primary" : ""}`}
            >
              g (gram)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onUnitSelect("ml")}>
            <Text
              className={`py-2 ${selectedUnit === "ml" ? "text-primary" : ""}`}
            >
              ml (milliliter)
            </Text>
          </TouchableOpacity>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PortionCreateScreen
