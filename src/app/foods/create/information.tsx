import React from "react"

import { Text } from "react-native"

import { Control, Controller, FieldValues } from "react-hook-form"

import {
  Card,
  CardHeader,
  Chip,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"

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
              label="Tên thức ăn"
              placeholder="VD: Cơm tấm sườn"
              onChangeText={onChange}
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
              label="Mô tả"
              placeholder="VD: Thức ăn ngon, dễ làm, phù hợp cho cả gia đình"
              onChangeText={onChange}
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
          defaultValue="Loại thức ăn"
          value={getLabelsFromValues(dishType, DATA.DISHES).join(", ")}
          onPress={openDishSheet}
        /> */}
      </VStack>

      <Card activeOpacity={1}>
        <VStack gap={12}>
          <VStack>
            <CardHeader label="Bạn muốn lưu thức ăn này như thế nào?" />

            <Text className="font-tregular text-sm text-accent">
              Chọn "Công khai" để chia sẻ thức ăn với cộng đồng hoặc "Cá nhân" để
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
