import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { get } from "lodash"
import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ErrorText, ScrollArea, VStack } from "@/components/global/atoms"

import { sampleCategoriesData } from "@/constants/categories"
import { TypeCategoryEnum } from "@/constants/enums"

interface SetupCategoriesProps {
  control: Control<FieldValues>
  errors: any
}

function SetupCategories({ control, errors }: SetupCategoriesProps) {
  const categoriesData = sampleCategoriesData
  const filteredCategoriesData = categoriesData.filter(
    (c) => c.type === TypeCategoryEnum.Food
  )

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
      <VStack gap={12} className="pb-24">
        {filteredCategoriesData.map((category) => {
          return (
            <Chip
              key={category.categoryId}
              size="lg"
              border
              borderWidth={2}
              label={category.name}
              icon={
                <View className="h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Image
                    source={
                      typeof category.image === "string"
                        ? { uri: category.image }
                        : category.image
                    }
                    style={{ width: 24, height: 24 }}
                  />
                </View>
              }
              selected={field.value?.includes(category.name)}
              onPress={() => handleSelectCategories(category.name)}
            />
          )
        })}

        {errorMessage && <ErrorText text={errorMessage} />}
      </VStack>
    </ScrollArea>
  )
}

export default SetupCategories
