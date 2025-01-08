import React, { useState } from "react"

import { KeyboardAvoidingView, Platform, Text } from "react-native"

import { get } from "lodash"
import { Control, Controller, FieldValues } from "react-hook-form"

import { Input, ScrollArea, VStack } from "@/components/global/atoms"
import { Section } from "@/components/global/organisms"

interface FoodNutritionProps {
  control: Control<FieldValues>
  errors: any
}

function FoodNutrition({ control, errors }: FoodNutritionProps) {
  const basicNutritionItems = [
    {
      name: "nutrition.calories",
      label: "Năng lượng (Calories)",
      unit: "kcal"
    },
    { name: "nutrition.protein", label: "Chất đạm (Protein)", unit: "g" },
    { name: "nutrition.carbs", label: "Tinh bột (Carbs)", unit: "g" },
    { name: "nutrition.fiber", label: "Chất xơ (Fiber)", unit: "g" },
    { name: "nutrition.sugar", label: "Đường (Sugar)", unit: "g" },
    { name: "nutrition.fat", label: "Chất béo (Fat)", unit: "g" }
  ]

  const detailedNutritionItems = [
    { name: "nutrition.saturatedFat", label: "Chất béo bão hòa", unit: "g" },
    {
      name: "nutrition.unsaturatedFat",
      label: "Chất béo không bão hòa",
      unit: "g"
    },
    { name: "nutrition.cholesterol", label: "Cholesterol", unit: "mg" },
    { name: "nutrition.sodium", label: "Natri (Sodium)", unit: "mg" },
    { name: "nutrition.potassium", label: "Kali (Potassium)", unit: "mg" },
    { name: "nutrition.calcium", label: "Canxi (Calcium)", unit: "mg" },
    { name: "nutrition.iron", label: "Sắt (Iron)", unit: "mg" },
    { name: "nutrition.vitaminA", label: "Vitamin A", unit: "IU" },
    { name: "nutrition.vitaminB1", label: "Vitamin B1", unit: "mg" },
    { name: "nutrition.vitaminB2", label: "Vitamin B2", unit: "mg" },
    { name: "nutrition.vitaminC", label: "Vitamin C", unit: "mg" },
    { name: "nutrition.vitaminD", label: "Vitamin D", unit: "IU" },
    { name: "nutrition.vitaminE", label: "Vitamin E", unit: "mg" }
  ]

  const renderInput = (
    name: string,
    label: string,
    unit: string,
    placeholder = "0"
  ) => (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const [inputValue, setInputValue] = useState(value?.toString() || "")

        const handleChangeText = (text: string) => {
          const normalizedText = text.replace(",", ".") // Chuyển dấu ',' thành '.'
          setInputValue(normalizedText) // Cập nhật giá trị hiển thị

          if (/^\d*\.?\d*$/.test(normalizedText)) {
            // Nếu giá trị hợp lệ, chuyển thành số và cập nhật qua onChange
            const parsedValue = parseFloat(normalizedText)
            if (!isNaN(parsedValue)) {
              onChange(parsedValue)
            } else {
              onChange(null) // Giá trị rỗng
            }
          }
        }

        return (
          <Input
            value={inputValue}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            keyboardType="numeric"
            alignRight
            startIcon={<Text>{label}</Text>}
            endIcon={<Text>{unit}</Text>}
            alwaysShowEndIcon
            errorMessage={get(errors, `${name}.message`, null)}
          />
        )
      }}
    />
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollArea>
        <VStack gap={12} className="px-6 pb-40">
          <VStack>
            <Section label="Dinh dưỡng cơ bản" />
            <VStack gap={12}>
              {basicNutritionItems.map((item) =>
                renderInput(item.name, item.label, item.unit)
              )}
            </VStack>
          </VStack>

          <VStack>
            <Section label="Dinh dưỡng chi tiết" />
            <VStack gap={12}>
              {detailedNutritionItems.map((item) =>
                renderInput(item.name, item.label, item.unit)
              )}
            </VStack>
          </VStack>
        </VStack>
      </ScrollArea>
    </KeyboardAvoidingView>
  )
}

export default FoodNutrition
