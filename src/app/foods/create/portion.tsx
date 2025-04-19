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

import { getMeasurementUnitLabel } from "@/utils/helpers"

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
  const SheetRef = useRef<SheetRefProps>(null)

  const selectedUnit = useWatch({
    control,
    name: "portion.unit"
  })

  const [selectedPortion, setSelectedPortion] = useState<string | null>(null)

  const sheetHeight = 280

  const onUnitSelect = (unit: string) => {
    setValue("portion.unit", unit)
    setSelectedPortion(unit)
    closeSheet()
  }

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)
  const closeSheet = () => SheetRef.current?.scrollTo(0)

  const sizeError = get(errors, "portion.size.message", null)
  const weightError = get(errors, "portion.weight.message", null)
  const unitError = get(errors, "portion.unit.message", null)

  return (
    <>
      <VStack gap={20} className="px-6">
        <VStack gap={8}>
          <VStack>
            <Controller
              name="portion.size"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Kích thước"
                  placeholder="VD: Phần, hộp, lon,..."
                  onChangeText={onChange}
                  canClearText
                />
              )}
            />
          </VStack>

          <HStack center gap={8}>
            <View style={{ flex: 1 }}>
              <Controller
                name="portion.weight"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value ? value.toString() : ""}
                    label="Khối lượng"
                    placeholder="VD: 100"
                    onChangeText={(text) => onChange(parseFloat(text) || 0)}
                    keyboardType="numeric"
                  />
                )}
              />
            </View>

            <View style={{ flex: 3 }}>
              <Select
                label="Đơn vị"
                defaultValue="Chọn đơn vị"
                value={getMeasurementUnitLabel(selectedUnit)}
                onPress={openSheet}
              />
            </View>
          </HStack>
        </VStack>

        <VStack gap={8}>
          <Text className="ml-1 font-tregular text-sm text-accent">
            Bạn có thể nhập đơn vị tùy chỉnh như "Phần", "Hộp", "Lon",...
          </Text>

          <Text className="ml-1 font-tregular text-sm text-accent">
            Nhập số lượng thực tế, đơn vị có thể chọn bên cạnh.
          </Text>

          <Text className="ml-1 font-tregular text-sm text-accent">
            Chọn "g" cho gram hoặc "ml" cho mililiter.
          </Text>

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

      <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
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
