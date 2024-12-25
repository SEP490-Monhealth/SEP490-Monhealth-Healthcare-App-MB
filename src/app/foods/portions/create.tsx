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
  Card,
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
      size: "1 phần",
      weight: 100,
      unit: "g"
    }
  })

  const SheetRef = useRef<SheetRefProps>(null)

  const openSheet = () => {
    SheetRef.current?.scrollTo(-250)
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
    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full bg-background">
        <View className="px-6">
          <Header back label="Thêm khẩu phần" />

          <Content>
            <VStack gap={20} className="mt-2">
              <VStack gap={8}>
                <Controller
                  name="size"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      placeholder="Nhập khẩu phần ăn"
                      keyboardType="default"
                      errorMessage={errors.size?.message}
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
                          value={value.toString()}
                          onChangeText={(text) =>
                            onChange(parseFloat(text) || 0)
                          }
                          placeholder="1"
                          keyboardType="numeric"
                          clearText={false}
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

              <Button size="lg" onPress={handleSubmit(onSubmit)}>
                Thêm mới
              </Button>
            </VStack>
          </Content>
        </View>

        <Sheet ref={SheetRef}>
          <VStack gap={10}>
            <TouchableOpacity onPress={() => onUnitSelect("g")}>
              <Text
                className={`rounded-xl border border-border px-4 py-6 font-tmedium text-base ${selectedUnit === "g" ? "bg-primary text-white" : "bg-muted text-primary"}`}
              >
                g (Gram)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onUnitSelect("ml")}>
              <Text
                className={`rounded-xl border border-border px-4 py-6 font-tmedium text-base ${selectedUnit === "ml" ? "bg-primary text-white" : "bg-muted text-primary"}`}
              >
                ml (Milliliter)
              </Text>
            </TouchableOpacity>
          </VStack>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PortionCreateScreen
