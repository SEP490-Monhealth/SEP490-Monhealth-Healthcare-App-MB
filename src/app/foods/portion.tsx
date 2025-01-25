import React, { useRef, useState } from "react"

import { Text, View } from "react-native"

import { get } from "lodash"
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  useWatch
} from "react-hook-form"

import {
  HStack,
  Input,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"

interface FoodPortionProps {
  control: Control<FieldValues>
  errors: FieldErrors
  setValue: (name: string, value: any) => void
}

const portionSizesData = [
  { label: "g (gram)", value: "g" },
  { label: "ml (mililiter)", value: "ml" }
]

function FoodPortion({ control, errors, setValue }: FoodPortionProps) {
  const [selectedPortion, setSelectedPortion] = useState<string | null>(null)

  const SheetRef = useRef<SheetRefProps>(null)

  const selectedUnit = useWatch({
    control,
    name: "portion.unit"
  })

  const onUnitSelect = (unit: string) => {
    setValue("portion.unit", unit)
    setSelectedPortion(unit)
    closeSheet()
  }

  const openSheet = () => {
    SheetRef.current?.scrollTo(-300)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  const sizeError = get(errors, "portion.size.message", null)
  const weightError = get(errors, "portion.weight.message", null)
  const unitError = get(errors, "portion.unit.message", null)

  return (
    <>
      <VStack gap={20}>
        <VStack gap={8}>
          <VStack>
            <Controller
              name="portion.size"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="Nhập khẩu phần ăn"
                  onChangeText={onChange}
                  keyboardType="default"
                  canClearText
                />
              )}
            />

            <Text className="ml-1 font-tregular text-sm text-accent">
              Ví dụ: "Phần", "Hộp", "Lon", v.v.
            </Text>
          </VStack>

          <HStack center gap={8}>
            <View style={{ flex: 1 }}>
              <Controller
                name="portion.weight"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value ? value.toString() : ""}
                    placeholder="1"
                    onChangeText={(text) => onChange(parseFloat(text) || 0)}
                    keyboardType="numeric"
                  />
                )}
              />
            </View>

            <View style={{ flex: 3 }}>
              <Select
                defaultValue="Chọn đơn vị"
                value={
                  portionSizesData.find((item) => item.value === selectedUnit)
                    ?.label || "Chọn đơn vị"
                }
                onPress={openSheet}
              />
            </View>
          </HStack>
        </VStack>

        <VStack>
          {typeof sizeError === "string" && (
            <Text className="ml-1 font-tregular text-base text-destructive">
              {sizeError}
            </Text>
          )}
          {typeof weightError === "string" && (
            <Text className="ml-1 font-tregular text-base text-destructive">
              {weightError}
            </Text>
          )}
          {typeof unitError === "string" && (
            <Text className="ml-1 font-tregular text-base text-destructive">
              {unitError}
            </Text>
          )}
        </VStack>
      </VStack>

      <Sheet ref={SheetRef} dynamicHeight={300}>
        {portionSizesData.map((portion) => (
          <SheetItem
            key={portion.value}
            item={portion.label}
            isSelected={selectedPortion === portion.value}
            onSelect={() => onUnitSelect(portion.value)}
          />
        ))}
      </Sheet>
    </>
  )
}

export default FoodPortion
