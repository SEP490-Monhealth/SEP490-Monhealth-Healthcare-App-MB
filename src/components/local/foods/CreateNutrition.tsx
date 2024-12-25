import React from "react"

import { KeyboardAvoidingView, Platform, Text } from "react-native"

import { get } from "lodash"
import { Controller } from "react-hook-form"

import { Input, ScrollArea, VStack } from "@/components/global/atoms"
import { Section } from "@/components/global/organisms"

interface CreateNutritionProps {
  control: any
  errors: any
}

export const CreateNutrition = ({ control, errors }: CreateNutritionProps) => {
  const renderInput = (
    name: string,
    label: string,
    unit: string,
    placeholder = "0"
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input
          value={value?.toString() || ""}
          placeholder={placeholder}
          onChangeText={(text) => onChange(parseFloat(text) || 0)}
          keyboardType="numeric"
          alignRight
          startIcon={<Text>{label}</Text>}
          endIcon={<Text>{unit}</Text>}
          errorMessage={get(errors, `${name}.message`, null)}
        />
      )}
    />
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollArea>
        <VStack gap={20} className="mt-2 h-full px-6 pb-40">
          <VStack>
            <Section label="Dinh dưỡng cơ bản" />

            <VStack gap={12}>
              {renderInput("nutrition.calories", "Năng lượng", "kcal")}
              {renderInput("nutrition.protein", "Chất đạm (Protein)", "g")}
              {renderInput("nutrition.carbs", "Tinh bột (Carbs)", "g")}
              {renderInput("nutrition.fiber", "Chất xơ (Fiber)", "g")}
              {renderInput("nutrition.sugar", "Đường (Sugar)", "g")}
              {renderInput("nutrition.fat", "Chất béo (Fat)", "g")}
            </VStack>
          </VStack>

          <VStack>
            <Section label="Dinh dưỡng chi tiết" />

            <VStack gap={12}>
              {renderInput("nutrition.saturatedFat", "Chất béo bão hòa", "g")}
              {renderInput(
                "nutrition.unsaturatedFat",
                "Chất béo không bão hòa",
                "g"
              )}
              {renderInput("nutrition.cholesterol", "Cholesterol", "mg")}
              {renderInput("nutrition.sodium", "Natri (Sodium)", "mg")}
              {renderInput("nutrition.potassium", "Kali (Potassium)", "mg")}
              {renderInput("nutrition.calcium", "Canxi (Calcium)", "mg")}
              {renderInput("nutrition.iron", "Sắt (Iron)", "mg")}
              {renderInput("nutrition.vitaminA", "Vitamin A", "IU")}
              {renderInput("nutrition.vitaminB1", "Vitamin B1", "mg")}
              {renderInput("nutrition.vitaminB2", "Vitamin B2", "mg")}
              {renderInput("nutrition.vitaminC", "Vitamin C", "mg")}
              {renderInput("nutrition.vitaminD", "Vitamin D", "IU")}
              {renderInput("nutrition.vitaminE", "Vitamin E", "mg")}
            </VStack>
          </VStack>
        </VStack>
      </ScrollArea>
    </KeyboardAvoidingView>
  )
}
