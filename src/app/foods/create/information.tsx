import React from "react"

import { Text } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import { Card, Chip, HStack, Input, VStack } from "@/components/global/atoms"

import { useFoodStore } from "@/stores/foodStore"

interface FoodInformationProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
  // openMealSheet: () => void
  // openDishSheet: () => void
}

function FoodInformation({
  control,
  errors,
  setValue
  // openMealSheet,
  // openDishSheet
}: FoodInformationProps) {
  // const { mealType, dishType, isPublic, updateField } = useFoodStore()
  const { isPublic, updateField } = useFoodStore()

  // const [isPublic, setIsPublic] = useState(false)

  const handleVisibilitySelect = (value: boolean) => {
    // setIsPublic(value)
    updateField("isPublic", value)
    setValue("isPublic", value)
  }

  return (
    <VStack gap={32} className="px-6">
      <VStack gap={12}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              // label="Tên"
              placeholder="Nhập tên món ăn"
              onChangeText={onChange}
              keyboardType="default"
              canClearText
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              // label="Mô tả"
              placeholder="Nhập mô tả món ăn"
              onChangeText={onChange}
              keyboardType="default"
              isMultiline
              numberOfLines={4}
              canClearText
              errorMessage={errors.description?.message}
            />
          )}
        />

        {/* <Select
          defaultValue="Phù hợp với bữa ăn"
          value={getLabelsFromValues(mealType, DATA.MEALS).join(", ")}
          onPress={openMealSheet}
        />

        <Select
          defaultValue="Loại món ăn"
          value={getLabelsFromValues(dishType, DATA.DISHES).join(", ")}
          onPress={openDishSheet}
        /> */}
      </VStack>

      <Card activeOpacity={1}>
        <VStack gap={12}>
          <VStack>
            <Text className="font-tmedium text-lg text-primary">
              Bạn muốn lưu món ăn này như thế nào?
            </Text>
            <Text className="font-tregular text-sm text-accent">
              Chọn "Công khai" để chia sẻ món ăn với cộng đồng hoặc "Cá nhân" để
              lưu trữ riêng tư cho bạn.
            </Text>
          </VStack>

          <HStack gap={12} className="justify-end">
            <Chip
              label="Cá nhân"
              selected={!isPublic}
              onPress={() => handleVisibilitySelect(false)}
            />

            <Chip
              label="Công khai"
              selected={isPublic}
              onPress={() => handleVisibilitySelect(true)}
            />
          </HStack>
        </VStack>
      </Card>
    </VStack>
  )
}

export default FoodInformation
