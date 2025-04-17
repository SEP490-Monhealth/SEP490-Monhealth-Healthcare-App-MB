import React, { useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

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

import { DATA } from "@/constants/data"

import { useCreatePortion } from "@/hooks/usePortion"

import { CreatePortionType, createPortionSchema } from "@/schemas/portionSchema"

function PortionCreateScreen() {
  const router = useRouter()
  const { foodId } = useLocalSearchParams() as { foodId: string }

  const { mutate: createPortion } = useCreatePortion()

  const [selectedUnit, setSelectedUnit] = useState("")

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = DATA.MEASUREMENT_UNITS.length * 110

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreatePortionType>({
    resolver: zodResolver(createPortionSchema),
    defaultValues: {
      foodId: foodId || "",
      size: "",
      weight: 0,
      unit: ""
    }
  })

  const openSheet = () => {
    SheetRef.current?.scrollTo(-sheetHeight)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  const onUnitSelect = (label: string, value: string) => {
    setSelectedUnit(label)
    setValue("unit", value)
    closeSheet()
  }

  const onSubmit = (data: CreatePortionType) => {
    Keyboard.dismiss()

    console.log("Submitted Data:", JSON.stringify(data, null, 2))

    createPortion(data, {
      onSuccess: () => {
        handleViewFood(foodId)
      }
    })
  }

  const handleViewFood = (foodId: string) => {
    router.push(`/foods/${foodId}`)
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
                      label="Kích thước"
                      placeholder="VD: Phần, hộp, lon,..."
                      onChangeText={onChange}
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
                          label="Khối lượng"
                          placeholder="VD: 100"
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
                      label="Đơn vị"
                      defaultValue="VD: g, ml,..."
                      value={selectedUnit}
                      onPress={openSheet}
                    />
                  </View>
                </HStack>
              </VStack>

              <Button onPress={handleSubmit(onSubmit)}>Tạo khẩu phần</Button>
            </VStack>
          </Content>
        </View>

        <Sheet ref={SheetRef}>
          {DATA.MEASUREMENT_UNITS.map((unit) => (
            <SheetItem
              key={unit.value}
              item={unit.label}
              isSelected={selectedUnit === unit.label}
              onSelect={() => onUnitSelect(unit.label, unit.value)}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PortionCreateScreen
