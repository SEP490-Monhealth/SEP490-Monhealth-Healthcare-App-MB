import React, { useRef, useState } from "react"

import { Text, View } from "react-native"

import { get } from "lodash"
import { Controller, FieldErrors, useWatch } from "react-hook-form"

import {
  HStack,
  Input,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"

interface CreatePortionProps {
  control: any
  errors: FieldErrors
  setValue: (name: string, value: any) => void
}

export const CreatePortion = ({
  control,
  errors,
  setValue
}: CreatePortionProps) => {
  const portions = ["g (gram)", "ml (mililiter)"]
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
      <VStack gap={20} className="mt-2 h-full px-6 pb-12">
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
                value={selectedUnit}
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

      <Sheet ref={SheetRef}>
        {portions.map((portion) => (
          <SheetItem
            key={portion}
            item={portion}
            isSelected={selectedPortion === portion}
            onSelect={() => onUnitSelect(portion)}
          />
        ))}
      </Sheet>
    </>
  )
}
