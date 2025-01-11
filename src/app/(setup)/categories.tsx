import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { ErrorText, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleCategoriesData } from "@/constants/categories"

interface SetupCategoriesProps {
  control: Control<FieldValues>
  errors: any
}

function SetupCategories({ control, errors }: SetupCategoriesProps) {
  const categoriesData = sampleCategoriesData

  const { field } = useController({
    name: "categories",
    control
  })

  const handleSelectCategories = (category: string) => {
    const currentValue = field.value || []
    if (currentValue.includes(category)) {
      field.onChange(currentValue.filter((item: string) => item !== category))
    } else {
      field.onChange([...currentValue, category])
    }
  }

  const errorMessage = get(errors, "categories.message", null)

  return (
    <ScrollArea>
      <VStack gap={12}>
        <View
          className="flex-row flex-wrap"
          style={{ rowGap: 16, columnGap: 12 }}
        >
          {categoriesData.map((category) => (
            <TouchableOpacity
              key={category.name}
              activeOpacity={0.7}
              onPress={() => handleSelectCategories(category.categoryId)}
              className={`flex-row items-center rounded-2xl border-2 bg-muted px-4 py-2.5 ${
                (field.value || []).includes(category.categoryId)
                  ? "border-primary"
                  : "border-border"
              }`}
            >
              <Image
                source={
                  typeof category.image === "string"
                    ? { uri: category.image }
                    : category.image
                }
                className="mr-3 h-8 w-8"
              />

              <Text
                className={`font-tmedium text-base ${
                  (field.value || []).includes(category.name)
                    ? "text-primary"
                    : "text-black"
                }`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {errorMessage && <ErrorText text={errorMessage} />}
      </VStack>
    </ScrollArea>
  )
}

export default SetupCategories
